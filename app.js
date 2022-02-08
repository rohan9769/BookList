// Book Constructor - Book Constructor will handle creation of the book object
function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI(){
}
UI.prototype.addBookToList = function(book){
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

// Showing Alerts
UI.prototype.showAlert = function(message,className){
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

// Prototype for deleting a book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// Clearing Fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

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

        // Show a message
        ui.showAlert('Book Removed','success')

        e.preventDefault()
    }
)