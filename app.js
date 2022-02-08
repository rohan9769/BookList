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

ui.prototype.clearFields = function(){
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

    // Adding Book to List
    ui.addBookToList(book)

    // Clear fields
    ui.clearFields()


    console.log(title,author,isbn)
    e.preventDefault()
})