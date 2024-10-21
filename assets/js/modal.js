export const modalElement = document.querySelector(".modal")
export const overlayElement = modalElement.querySelector(".modal-overlay")
export const modalContainer = modalElement.querySelector(".modal-container")

overlayElement.addEventListener("click", ()=>{
    modalElement.style.display = 'none';
})