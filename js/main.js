const newBookButton = document.querySelector('.button-add-book');
const dialog = document.querySelector('dialog');
const submitButton = document.querySelector('.button-submit')

const form = document.querySelector('form')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    new FormData(form)
})

const defaultData = new Book('The Catcher in the Rye', 'J. D. Salinger', false)
const myLibrary = [];


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
});


newBookButton.addEventListener('click', () => dialog.showModal());
submitButton.addEventListener('click', () => console.log(form))


// TODO как достать данные из формы?
// TODO возможно надо остановить отправку формы через
// субмитбаттон и открыть данные здесь


function Book(title, author, isRead) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;



    this.cast_isReadToBoolean = function () {
        this.isRead = this.isRead === 'on';
    }

}


function addBookToLibrary() {
//    ..
}