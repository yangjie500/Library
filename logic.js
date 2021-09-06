const detailsBtn = document.querySelector(".btn-details");
const addBtn = document.querySelector(".btn-add");
const cancelBtn = document.querySelectorAll(".btn-cancel");
const imgBtn = document.querySelector(".img-add");

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
    })
}

window.onload = logic();