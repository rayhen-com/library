const myLibrary = [{
        title: 'The ONE Thing',
        author: 'Gary Keller',
        pages: '240',
        read: 'true'
    },
    {
        title: 'Atomic Habits',
        author: 'James Clear',
        pages: '320',
        read: 'true'
    },
    {
        title: 'Principles',
        author: 'Ray Dalio',
        pages: '592',
        read: 'true'
    },
    {
        title: 'When',
        author: 'Daniel H. Pink',
        pages: '288',
        read: 'true'
    },
    {
        title: 'The 48 Laws of Power',
        author: 'Robert Greene',
        pages: '452',
        read: 'false'
    }
];

// Book Object Constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${read}`
    }
};

// Loop through Library Array and add cards
function arrayLoop() {
    // Reset DOM
    let mainContent = document.getElementById("main-content");
    mainContent.textContent = '';

    for (let i = 0; i < myLibrary.length; i++) {
        // Get and create elements        
        let cardDiv = document.createElement("div");
        let titlePara = document.createElement("p");
        let authorPara = document.createElement("p");
        let pagesPara = document.createElement("p");
        let readButton = document.createElement("button");
        let removeButton = document.createElement("button");

        // Create card
        cardDiv.className = 'card';
        cardDiv.id = 'book-' + [i];

        // Add values to p elements
        titlePara.textContent = `"` + myLibrary[i].title + `"`;
        authorPara.textContent = myLibrary[i].author;
        pagesPara.textContent = myLibrary[i].pages + " pages";

        // Add values to buttons
        if (myLibrary[i].read === 'false') {
            readButton.className = `book-` + [i] + ' read-button not-read'
            readButton.textContent = "Not read"
        } else if (myLibrary[i].read === 'true') {
            readButton.className = `book-` + [i] + ' read-button read'
            readButton.textContent = "Read"
        }

        removeButton.className = `remove-button book-` + [i];
        removeButton.textContent = "Remove";

        // Add variables to card
        cardDiv.appendChild(titlePara);
        cardDiv.appendChild(authorPara);
        cardDiv.appendChild(pagesPara);
        cardDiv.appendChild(readButton);
        cardDiv.appendChild(removeButton);

        // Add card to library list
        mainContent.appendChild(cardDiv);
    }
}

// Run the arrayLoop function to display all books
arrayLoop();

// Get form elements
const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const newTitle = favDialog.querySelector("#title");
const newAuthor = favDialog.querySelector("#author");
const newPages = favDialog.querySelector("#pages");
const newRead = favDialog.querySelector("#read");
const submitBtn = favDialog.querySelector("#submitBtn");

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
    favDialog.showModal();
});

// Submit new book
submitBtn.addEventListener("click", (event) => {
    // Prevent submission to server
    event.preventDefault();

    // Validate form
    formValidation();
});

function formValidation() {
    if (document.getElementById("dialogForm").checkValidity()) {
        // Modify checkbox values
        if (newRead.checked) {
            newRead.value = true;
        } else {
            newRead.value = false;
        }

        // Create new book object
        let newBook = new Book(newTitle.value, newAuthor.value, newPages.value, newRead.value);

        // Add the new object to the Library array
        myLibrary.push(newBook);

        // Loop through library array to refresh the display
        arrayLoop();

        // Reset form
        document.getElementById("dialogForm").reset();

        // Close dialog
        favDialog.close(); // Have to send the select box value here.

        // Reattach removeEventListener
        attachRemoveEventListeners();

        // Reattach readEventListener
        attachReadEventListeners();
    } else if (newTitle.value === "" || newAuthor.value === "" || newPages.value === "") {
        // error message
        document.getElementById("errorMessage").textContent = "Please fill out all required (*) fields";
    }
}

function attachRemoveEventListeners() {
    document.querySelectorAll(".remove-button").forEach(function (e) {
        e.addEventListener("click", function () {
            // Get the index of the book from the class name
            const index = parseInt(e.classList[1].split('-')[1]);

            // Remove book from library array
            myLibrary.splice(index, 1);

            // Refresh library display
            arrayLoop();

            // Reattach the remove event listener
            attachRemoveEventListeners();

            // Reattach readEventListener
            attachReadEventListeners();
        });
    });
}

// Initial attachment of remove event listener
attachRemoveEventListeners();

function attachReadEventListeners() {
    document.querySelectorAll(".read-button").forEach(function (e) {
        e.addEventListener("click", function () {
            // Get the index of the book from the class name
            const index = parseInt(e.classList[0].split('-')[1]);

            // Switch read status
            if (myLibrary[index].read === 'true') {
                myLibrary[index].read = 'false'
            } else {
                myLibrary[index].read = 'true'
            }

            // Refresh library display
            arrayLoop();

            // Reattach the remove event listener
            attachRemoveEventListeners();

            // Reattach the read event listener
            attachReadEventListeners();
        });
    });
}

// Initial attachment of remove event listener
attachReadEventListeners();