const myLibrary = [
    
    {
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
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`
    }
};

// Loop through Library Array and add cards
function arrayLoop() {
    // Reset DOM
    let mainContent = document.getElementById("main-content");
    mainContent.textContent = ``;

    for (let i = 0; i < myLibrary.length; i++) {
        // Get and create elements        
        let cardDiv = document.createElement("div");
        let titlePara = document.createElement("p");
        let authorPara = document.createElement("p");
        let pagesPara = document.createElement("p");
        let readButton = document.createElement("button");
        let removeButton = document.createElement("button");

        // Create card
        cardDiv.classList.add("card");

        // Add values to p elements
        titlePara.textContent = `"` + myLibrary[i].title + `"`;
        authorPara.textContent = myLibrary[i].author;
        pagesPara.textContent = myLibrary[i].pages + " pages";

        // Add values to buttons
        if (myLibrary[i].read === 'false') {
            readButton.classList.add("not-read-button")
            readButton.textContent = "Not read"
        } else if (myLibrary[i].read === 'true') {
            readButton.classList.add("read-button")
            readButton.textContent = "Read"
        }

        removeButton.classList.add("remove-button");
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
        if(newRead.checked) {
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
    } else if (newTitle.value === "" || newAuthor.value === "" || newPages.value === ""){
            // error message
            document.getElementById("errorMessage").textContent = "Please fill out all required (*) fields";
    }
}
