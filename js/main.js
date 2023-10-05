const newBookButton = document.querySelector('.button-add-book');
const dialog = document.querySelector('dialog');
const submitButton = document.querySelector('.button-submit')
const cancelButton = document.querySelector('.button-cancel')
const form = document.querySelector('form')
const cardContainer = document.querySelector('.card-container')
const defaultData_1 = new Book('Lord of the Rings', 'J.R.R. Tolkien', true)
const defaultData_2 = new Book('The Catcher in the Rye', 'J. D. Salinger', false)
const myLibrary = [defaultData_1, defaultData_2];

window.onload = (e) => {
    renderLibrary()
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


    renderLibrary()
    form.reset()
    dialog.close()
});
// Cancel button functionality
cancelButton.addEventListener('click', (e) => {
    form.reset()
    dialog.close()
})
submitButton.addEventListener('click', () => console.log(form))
newBookButton.addEventListener('click', () => dialog.showModal());

const renderLibrary = () => {
    // removes all children
    cardContainer.replaceChildren()
    for (let book of myLibrary) {
        renderCard(book)
    }
}
const renderCard = (book) => {
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
    statusButton.addEventListener('click', (e) => changeStatus(e));
    statusButton_BoolCastToText(book, statusButton);

    card.append(statusButton);

    // add book index to class to make removal easier
    card.classList.add(myLibrary.indexOf(book))
    card.classList

    const removeButton = document.createElement('button');
    removeButton.classList.add('button-card');
    removeButton.classList.add('remove-card');
    removeButton.innerText = 'Remove';
    removeButton.addEventListener('click', (e) => removeCard(e));
    card.append(removeButton);

    cardTitle.innerText = book.title;
    cardAuthor.innerText = book.author;
}
// renders status properties based on Book.isRead
const statusButton_BoolCastToText = (book, statusButton) => {
    book.isRead === true ? statusButton.innerText = 'Read' : statusButton.innerText = 'Unread';
}

const changeStatus = (e) => {
    const button = e.target;
    const bookIndex = button.parentElement.classList[1];
    const book = myLibrary[Number(bookIndex)]

    book.isRead = !book.isRead;
    renderLibrary()

}

const removeCard = (e) => {
    let button = e.target;
    const card = button.parentElement;

    myLibrary.splice(card.classList[1], 1)
    card.remove()
    renderLibrary()
}

function Book(title, author, isRead) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;

    this.cast_isReadToBoolean = function () {
        this.isRead = this.isRead === 'on';
    }
}

