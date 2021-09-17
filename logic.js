const detailsBtn = document.querySelector(".btn-details");
const addBtn = document.querySelector(".btn-add");
const cancelBtn = document.querySelectorAll(".btn-cancel");
const imgBtn = document.querySelector(".img-add");
const submitBook = document.querySelector(".submit-book");
const editBook = document.querySelector(".edit-book");
const bookForm = document.querySelector(".form-book");
const editForm = document.querySelector(".form-book-edit");
const mainGrid = document.querySelector(".grid-layout");
const modalEdit = document.querySelector('.modal-edit');

function Book(title, author, pages, pagesRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pagesRead = pagesRead;
}

Book.prototype = {
    constructor: Book,

    bookHtmlElement: function (bookCount) {
        div = document.createElement('div');
        div.className = 'grid-child';
        div.setAttribute('data-book', bookCount );

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
        span2.className = "edit";

        text1 = document.createTextNode('Read: ');
        text2 = document.createTextNode('/');

        p2.append(text1, span2, text2, span1);

        up = document.createElement("div");
        up.className = "upper";
        mid = document.createElement('div');
        mid.className = "overlay"
        down = document.createElement("div");
        down.className = "lower";

        btnDelete = document.createElement('button');
        btnDelete.className= "delete";
        btnEdit = document.createElement('button');
        btnEdit.className = 'edit-detail';

        btnIncrease = document.createElement("button");
        btnIncrease.className = "up";
        btnDecrease = document.createElement("button");
        btnDecrease.className = "down";

        /*arrow1 = document.createElement("img");
        arrow2 = document.createElement("img");
        arrow1.setAttribute("src","/images/arrow.png");
        arrow2.setAttribute("src","/images/arrow.png");
        

        btnIncrease.append(arrow1);
        btnDecrease.append(arrow2);
        */

        up.append(h3, p1, p2);
        mid.append(btnDelete, btnEdit);
        down.append(btnIncrease, btnDecrease);

        div.append(up, mid,down);
        return div;
    },

    addToGrid: function(bookCount) {
        mainGrid.insertAdjacentElement('afterbegin', this.bookHtmlElement(bookCount));
    },

    addPage: function(elem) {
        console.log(this);
        if (parseInt(this.pagesRead) === parseInt(this.pages)) {
            return;
        }
        this.pagesRead++;
        elem.textContent = parseInt(elem.textContent) + 1;

    },

    minusPage: function(elem) {
        if (this.pagesRead === 0) {
            return;
        }
        this.pagesRead--;
        elem.textContent = parseInt(elem.textContent) - 1;
    },

    edit: function(a,b,c,d) {
        this.title = a;
        this.author = b;
        this.pages = c;
        this.pagesRead = d;
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

function cardBlur(num) {
    const upperSection = document.querySelector(`[data-book="${num}"] .upper`);
    upperSection.style.filter = 'blur(2.5px)';
}

function cardUnblur(num) {
    const upperSection = document.querySelector(`[data-book="${num}"] .upper`);
    upperSection.style.filter = 'none';
}

function showMissingInput(num) {
    const missingInput = document.querySelectorAll(`div[data-${num}]`);
    missingInput.forEach((e)=>{
        e.style.visibility = 'visible'; 
    })
}

function removeShowMissingInput(num) {
    const missingInput = document.querySelectorAll(`div[data-${num}]`);
    missingInput.forEach((e)=> {
        e.style.visibility = 'hidden';
    })
}

function formValidation(edit = false) {
    if (edit === true) {
        for (let i = 0; i <= editForm.length - 2 ; i++) {
            if (editForm[i].value === "") {
                setTimeout(() => {showMissingInput(i)}, 0);
                setTimeout(() => {removeShowMissingInput(i)}, 3000);
                return false;
            }

            if (parseInt(editForm[2].value) < parseInt(editForm[3].value)) {
                alert('Exceed total number of pages');
                return false;
            }
            return;
        }
    }
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

function createBook(bookCount) {
    const name = bookForm['name'].value;
    const author = bookForm['author'].value;
    const pages = bookForm['pages'].value;
    const pageRead = bookForm['pages-read'].value;

    let book = new Book(name, author, pages, pageRead);
    book.addToGrid(bookCount);
    return book;
}

function generateDetails(books) {
    const bookNumber = books.length;
    const totalPages = books.reduce((prev, curr)=> {
        return prev + parseInt(curr.pages);
    }, 0);
    const bookCompleted = books.filter((elem) => {
        return (parseInt(elem.pagesRead) === parseInt(elem.pages));
    }).length    

    return [bookNumber, bookCompleted, totalPages];
}

function updateDetails(arr) {
    const htmlDetails = document.querySelectorAll('.details__sub span');
    let temp = 0;
    htmlDetails.forEach( (elem) => {
        elem.textContent = arr[temp];
        temp++;
    });
    
}

function preEdit(book, bookNumber, gridDiv) {
    const name = document.querySelector('.modal-edit #name');
    const author = document.querySelector('.modal-edit #author');
    const pages = document.querySelector('.modal-edit #pages');
    const pagesRead = document.querySelector('.modal-edit #pages-read');
    name.setAttribute('value', book.title);
    author.setAttribute('value', book.author);
    pages.setAttribute('value', book.pages);
    pagesRead.setAttribute('value', book.pagesRead);

    editBook.addEventListener('click', (e) => {
        e.preventDefault();
        valid = formValidation(edit=true);
        if (valid === false) {
            return;
        }
        book.edit(name.value,author.value,pages.value,pagesRead.value);
        
        closeModal();
        const h3 = document.querySelector(`[data-book="${bookNumber}"] h3`);
        h3.textContent = book.title;
        const em = document.querySelector(`[data-book="${bookNumber}"] em`);
        em.textContent = book.author;
        const span1 = document.querySelector(`[data-book="${bookNumber}"] .edit + span`);
        span1.textContent = book.pages;
        const span2 = document.querySelector(`[data-book="${bookNumber}"] .edit`);
        span2.textContent = book.pagesRead;
        isCompleted(book, gridDiv);
    });
}

function reUpdateDataBook(bookNumber) {
    const allBooks = document.querySelectorAll('.grid-child');
    allBooks.forEach((elem) => {
        if (parseInt(elem.getAttribute('data-book')) > parseInt(bookNumber)) {
            console.log("hello");
            elem.setAttribute('data-book', (parseInt(elem.getAttribute('data-book')) - 1));
        }
    })
}

function isCompleted(book, gridDiv) {
    console.log(parseInt(book.pagesRead) === parseInt(book.pages))
    if (parseInt(book.pagesRead) === parseInt(book.pages)) {
        gridDiv.style.backgroundColor = 'rgb(114, 221, 240)';
        gridDiv.style.backgroundImage = 'none';
    } else {
        gridDiv.style.backgroundColor = 'none';
        gridDiv.style.backgroundImage = '-webkit-linear-gradient(90deg, rgb(248, 248, 248) 50%, rgb(114, 221, 240))';
    }
    
}

function logic() {
    let books = [];
    let bookCount = 0;

    detailsBtn.addEventListener('click', (e) => {
        const keyword = detailsBtn.textContent;
        closeModal()
        toggleModal(keyword);
        updateDetails(generateDetails(books));
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

        books.push(createBook(bookCount));
        bookCount++;

        bookForm.reset();
        closeModal(); 
    })


    mainGrid.addEventListener('click', (e) => {
        console.log(books);       
        if (e.target.className === 'img-add') {
            return;
        }
        let gridDiv = e.target.closest('.grid-child');
        if (gridDiv === null) return; 

        const bookNumber = gridDiv.getAttribute('data-book'); 
        const book = books[bookNumber];
        console.log(book);  
        console.log(bookNumber);
        let pageNumbersSpan = document.querySelector(`[data-book="${bookNumber}"] .edit`);

        if (e.target.className === "up") {
            book.addPage(pageNumbersSpan);
            isCompleted(book, gridDiv);
        }

        if (e.target.className === "down") {
            book.minusPage(pageNumbersSpan);
            isCompleted(book, gridDiv)
        }

        if (e.target.className === "delete") {
            gridDiv.remove();
            bookCount--;
            reUpdateDataBook(bookNumber);
            books.splice(bookNumber, 1);
            
        }

        if (e.target.className ==="edit-detail") {
            console.log(book)
            toggleModal('edit');
            preEdit(book, bookNumber, gridDiv);
            
        }
    });



    mainGrid.addEventListener('mouseover', (e) => {
        if (e.target.className === 'overlay' || e.target.className === 'delete' || e.target.className === 'edit-detail') {
            let gridDiv = e.target.closest('.grid-child');
            const bookNumber = gridDiv.getAttribute('data-book');
            cardBlur(bookNumber);
        }
    });

    mainGrid.addEventListener('mouseout', (e) => {
        if (e.target.className === 'overlay' || e.target.className === 'delete' || e.target.className === 'edit-detail') {
            let gridDiv = e.target.closest('.grid-child');
            const bookNumber = gridDiv.getAttribute('data-book');
            cardUnblur(bookNumber);
        }
    });


}

window.onload = logic();

