const myLibrary = [
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        pages: '255',
        read: false
    }
];

// Book Object Constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`
    }
};

// Add Book to Library Function
function addBookToLibrary() {
    
    let title = prompt(`What's the book's title?`);
    let author = prompt(`Who's the author`);
    let pages = prompt('How many pages does the book have?');
    let read = prompt('Have you read the book?');
    let newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);

    // Resed all variables
    // title = ''
    // author = ''
    // pages = ''
    // read = ''

}

