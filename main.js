const myLibrary = [
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        pages: '255',
        read: false
    },
    {
        title: 'Harry Potter',
        author: 'JK',
        pages: '500',
        read: true
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

// Loop through Library Array and add cards
function arrayLoop() {
    for (let i = 0; i < myLibrary.length; i++) {
        // Get and create elements
        let mainContent = document.getElementById("main-content");
        let cardDiv = document.createElement("div");
        let titlePara = document.createElement("p");
        let authorPara = document.createElement("p");
        let pagesPara = document.createElement("p");
        let readButton = document.createElement("button");
        let removeButton = document.createElement("button");

        // Create card
        cardDiv.classList.add("card");

        // Add values to p elements
        titlePara.textContent = myLibrary[i].title;
        authorPara.textContent = myLibrary[i].author;
        pagesPara.textContent = myLibrary[i].pages + " pages";

        // Add values to buttons
        if (myLibrary[i].read === false) {
            readButton.classList.add("not-read-button")
            readButton.textContent = "Not read"
        } else if (myLibrary[i].read === true) {
            readButton.classList.add("read-button")
            readButton.textContent = "Read"
        }

        removeButton.classList.add("remove-button")
        removeButton.textContent = "Remove"

        // Add variables to card
        cardDiv.appendChild(titlePara);
        cardDiv.appendChild(authorPara);
        cardDiv.appendChild(pagesPara);
        cardDiv.appendChild(readButton)
        cardDiv.appendChild(removeButton)

        // Add card to library list
        mainContent.appendChild(cardDiv);
      }
}


arrayLoop()