const newBookButton = document.querySelector('.button-add-book');
const dialog = document.querySelector('dialog');
const submitButton = document.querySelector('.button-submit')
const cancelButton = document.querySelector('.button-cancel')
const form = document.querySelector('form')

const defaultData = new Book('The Catcher in the Rye', 'J. D. Salinger', false)
const myLibrary = [defaultData];


form.addEventListener('submit', (e) => {
    e.preventDefault()
    new FormData(form) // preventDefault() prevented form data construction

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
    form.reset()
    dialog.close()
});
// Cancel button functionality
cancelButton.addEventListener('click', e => {
    form.reset()
    dialog.close()
})
submitButton.addEventListener('click', () => console.log(form))
newBookButton.addEventListener('click', () => dialog.showModal());


const cardContainerConstructor = () => {
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

    statusButton = renderStatus(book, statusButton);
    card.append(statusButton);


    const removeButton = document.createElement('button');
    removeButton.classList.add('button-card');
    removeButton.classList.add('remove-card');
    removeButton.innerText = 'Remove';
    card.append(removeButton);

    cardTitle.innerText = book.title;
    cardAuthor.innerText = book.author;
}


// TODO
// changes status properties based on Book.isRead
const renderStatus = (book, statusButton) => {

}

function Book(title, author, isRead) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;

    this.cast_isReadToBoolean = function () {
        this.isRead = this.isRead === 'on';
    }
}

