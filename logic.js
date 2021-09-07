const detailsBtn = document.querySelector(".btn-details");
const addBtn = document.querySelector(".btn-add");
const cancelBtn = document.querySelectorAll(".btn-cancel");
const imgBtn = document.querySelector(".img-add");
const submitBook = document.querySelector(".submit-book");
const bookForm = document.querySelector(".form-book");

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

Book.prototype = {
    constructor: Book,


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

function logic() {
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
        for (let i = 0; i <= bookForm.length - 2 ; i++) {
            if (bookForm[i].value === "") {
                setTimeout(() => {showMissingInput(i)}, 0);
                setTimeout(() => {removeShowMissingInput(i)}, 3000);
                return;
            }

            if (parseInt(bookForm[2].value) < parseInt(bookForm[3].value)) {
                alert('Exceed total number of pages');
                return;
            }

        }
        

        
        bookForm.reset();
        closeModal();
    })
}

//  console.log(document.querySelector("input[data-hello]"))

window.onload = logic();