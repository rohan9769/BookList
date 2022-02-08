class Book {
    constructor(title,author,isbn){
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

class UI{
    addBookToList(book){
        const list = document.getElementById('book-list')

        //Creating a tr element
        const row = document.createElement('tr')

        // Inserting Columns
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X<a></td>
        `;

        list.appendChild(row)
    }

    showAlert(message,className){
        // Creating a div
        const div = document.createElement('div')

        //Adding class
        div.className = `alert ${className}`

        //Adding Text
        div.appendChild(document.createTextNode(message))

        // Get Parent
        const container = document.querySelector('.container')

        const form = document.querySelector('#book-form')

        // Inserting Alert
        container.insertBefore(div,form)

        // Setting a Timeout
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000)
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Adding Local Storage
class Store{

    static getBooks(){
        // This function will fetch books from Local Storage
        let books;
        if(localStorage.getItem('books') === null){
             books = []
        }
        else{
            books = JSON.parse(localStorage.getItem('books'))
            
        }
        return books
    }


    static displayBooks(){
        const books = Store.getBooks()
        books.forEach(function(book){
            const ui = new UI

            // Adding Book to UI
            ui.addBookToList(book)
        })
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book)
        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks()

        books.forEach(function(book){
            if(book.isbn === isbn){
                books.splice(index,1)
            }
        })
        localStorage.setItem('books',JSON.stringify(books))
    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded',Store.displayBooks)

// Event Listeners
document.getElementById('book-form').addEventListener('submit',
function(e){
    // Getting form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value
    
    // Instantiating a Book
    const book = new Book(title,author,isbn)
    console.log(book)

    // Instantiating UI
    const ui = new UI()

    // Validations
    if(title === '' || author === '' || isbn === ''){
        // Error Alert
        ui.showAlert('Please Enter all fields','error')
    }
    else{
        // Adding Book to List
        ui.addBookToList(book)

        // Adding Book to Localstorage
        Store.addBook(book)

        // Showing Success
        ui.showAlert('Book Added','success')

        // Clear fields
        ui.clearFields()

    }

    console.log(title,author,isbn)
    e.preventDefault()
})

// Adding event listener for delete button
document.getElementById('book-list').addEventListener('click',
    function(e){
        const ui = new UI()

        // deleting a book
        ui.deleteBook(e.target)

        // Removing Book from localt storage
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

        // Show a message
        ui.showAlert('Book Removed','success')

        e.preventDefault()
    }
)