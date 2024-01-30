const newBookButton = document.querySelector('.button-add-book');
const dialog = document.querySelector('dialog');
const submitButton = document.querySelector('.button-submit')
const cancelButton = document.querySelector('.button-cancel')
const form = document.querySelector('form')
const cardContainer = document.querySelector('.card-container')
const defaultData_1 = new Book('Lord of the Rings', 'J.R.R. Tolkien', true)
const defaultData_2 = new Book('The Catcher in the Rye', 'J. D. Salinger', false)
const myLibrary = [defaultData_1, defaultData_2];


class Controller {
    constructor() {
    }

    static renderLibrary = () => {
        // removes all children
        cardContainer.replaceChildren()
        for (let book of myLibrary) {
            this.renderCard(book)
        }
    }

    static statusButton_BoolCastToText = (book, statusButton) => {
        book.isRead === true ? statusButton.innerText = 'Read' : statusButton.innerText = 'Unread';
    }

    static renderCard = (book) => {
        const cardContainer = document.querySelector('.card-container');
        const card = document.createElement('div');
        card.classList.add('card');
        cardContainer.append(card);

        const cardTitle = document.createElement('div');
        cardTitle.classList.add('card-title');
        card.append(cardTitle);

        const cardAuthor = document.createElement('div');
        cardAuthor.classList.add('card-author');
        card.append(cardAuthor);

        let statusButton = document.createElement('button');
        statusButton.classList.add('button-card');
        statusButton.classList.add('status-toggle');
        statusButton.addEventListener('click', (e) => this.changeStatus(e));
        this.statusButton_BoolCastToText(book, statusButton);

        card.append(statusButton);

        // add book index to class to make removal easier
        card.classList.add(myLibrary.indexOf(book))
        card.classList

        const removeButton = document.createElement('button');
        removeButton.classList.add('button-card');
        removeButton.classList.add('remove-card');
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click', (e) => this.removeCard(e));
        card.append(removeButton);

        cardTitle.innerText = book.title;
        cardAuthor.innerText = book.author;
    }
    static changeStatus = (e) => {
        const button = e.target;
        const bookIndex = button.parentElement.classList[1];
        const book = myLibrary[Number(bookIndex)]

        book.isRead = !book.isRead;
        this.renderLibrary()

    }

    static removeCard = (e) => {
        let button = e.target;
        const card = button.parentElement;

        myLibrary.splice(card.classList[1], 1)
        card.remove()
        this.renderLibrary()
    }
}


window.onload = () => {
    Controller.renderLibrary()
}

// preventDefault() prevented form data construction}
form.addEventListener('submit', (e) => {
    e.preventDefault()
    new FormData(form)
})
// Create new book object, fill it with data and add it to the library
form.addEventListener('formdata', (e) => {
    let data = e.formData.entries();
    let book = new Book()
    for (let item of data) {
        book[item[0]] = item[1];
    }
    if (typeof book.isRead !== 'boolean') {
        book.cast_isReadToBoolean()
    }
    myLibrary.push(book)

    Controller.renderLibrary()
    form.reset()
    dialog.close()
});

// Cancel button functionality
cancelButton.addEventListener('click', () => {
    form.reset()
    dialog.close()
})
submitButton.addEventListener('click', () => console.log(form))
newBookButton.addEventListener('click', () => dialog.showModal());


function Book(title, author, isRead) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;

    this.cast_isReadToBoolean = function () {
        this.isRead = this.isRead === 'on';
    }
}

