const detailsBtn = document.querySelector(".btn-details");
const addBtn = document.querySelector(".btn-add");
const cancelBtn = document.querySelectorAll(".btn-cancel");
const imgBtn = document.querySelector(".img-add");
const submitBook = document.querySelector(".submit-book");
const bookForm = document.querySelector(".form-book");
const mainGrid = document.querySelector(".grid-layout");

function Book(title, author, pages, pagesRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pagesRead = pagesRead;
}

Book.prototype = {
    constructor: Book,

    bookHtmlElement: function () {
        div = document.createElement('div');
        div.className = 'grid-child';

        h3 = document.createElement('h3');
        h3.textContent = this.title;

        p1 = document.createElement('p');
        p1.className = "author"
        em = document.createElement('em');
        em.textContent = this.author;
        by = document.createElement('span');
        by.style.fontSize = '0.5em';
        by.textContent = `Written by `;
        p1.append(by ,em);

        p2 = document.createElement('p');
        p2.className = 'read';
        
        span1 = document.createElement('span');
        span1.textContent = this.pages;
        span2 = document.createElement('span');
        span2.textContent = this.pagesRead;

        text1 = document.createTextNode('Read: ');
        text2 = document.createTextNode('/');

        p2.append(text1, span2, text2, span1);
        div.append(h3, p1, p2);
        return div;
    },

    addToGrid: function() {
        mainGrid.insertAdjacentElement('afterbegin', this.bookHtmlElement());
    }

}

function toggleModal(keyword) {
    const modal = document.querySelector(`.modal-${keyword}`);
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.querySelectorAll(`.modal`);
    modal.forEach(elem => {
        elem.style.display = 'none';
    })   
}

function showMissingInput(num) {
    const missingInput = document.querySelector(`div[data-${num}]`);
    missingInput.style.visibility = 'visible'; 
}

function removeShowMissingInput(num) {
    const missingInput = document.querySelector(`div[data-${num}]`);
    missingInput.style.visibility = 'hidden';
}

function formValidation() {
    for (let i = 0; i <= bookForm.length - 2 ; i++) {
        if (bookForm[i].value === "") {
            setTimeout(() => {showMissingInput(i)}, 0);
            setTimeout(() => {removeShowMissingInput(i)}, 3000);
            return false;
        }

        if (parseInt(bookForm[2].value) < parseInt(bookForm[3].value)) {
            alert('Exceed total number of pages');
            return false;
        }
    }
}

function createBook() {
    const name = bookForm['name'].value;
    const author = bookForm['author'].value;
    const pages = bookForm['pages'].value;
    const pageRead = bookForm['pages-read'].value;

    let book = new Book(name, author, pages, pageRead);
    book.addToGrid();
    return book;
}

function logic() {
    let books = [];
    let bookCount = 0;

    detailsBtn.addEventListener('click', (e) => {
        const keyword = detailsBtn.textContent;
        closeModal()
        toggleModal(keyword);
    });

    addBtn.addEventListener('click', (e) => {
        const keyword = addBtn.textContent;
        closeModal();
        toggleModal(keyword);
    });

    cancelBtn.forEach(elem => {
        elem.addEventListener('click', (e) => {
            closeModal();
        }) 
    });

    imgBtn.addEventListener('click', (e) => {
        const keyword = 'add';
        closeModal();
        toggleModal(keyword);
    });

    submitBook.addEventListener('click', (e) => {
        e.preventDefault();
        let valid = formValidation();
        if (valid === false) {
            return;
        }

        books.push(createBook());
        bookCount++;

        bookForm.reset();
        closeModal();
    })
}

window.onload = logic();    