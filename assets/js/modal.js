import { sidebarActiveNow } from "./admin.js";
import { startPOSTFetch } from "./startFetch.js";

export const modalElement = document.querySelector(".modal");
export const overlayElement = modalElement.querySelector(".modal-overlay");
export const modalContainer = modalElement.querySelector(".modal-container");
export const addModal = modalContainer.querySelector(".modal__add");
export const editModal = modalContainer.querySelector(".modal__edit");
export const removeModal = modalContainer.querySelector(".modal__remove");

const confirmBTNs = Array.from(
  modalElement.querySelectorAll(".modal__confirm__btn")
);
const addConfirmBTN = document.querySelector(".modal__add__btn");
const editConfirmBTN = document.querySelector(".modal__edit__btn");
const removeConfirmBTN = document.querySelector(".modal__remove__btn");

export const hideModal = () => {
  removeModal.style.display = "none";
  editModal.style.display = "none";
  modalElement.style.display = "none";
  addModal.style.display = "none";

  sidebarActiveNow.click();
};

export const showAddModal = () => {
  removeModal.style.display = "none";
  editModal.style.display = "none";
  modalElement.style.display = "flex";
  addModal.style.display = "flex";
};

export const showEditModal = (
  id,
  product_name,
  category_id,
  price,
  stock_quantity,
  description,
  added_date
) => {
  removeModal.style.display = "none";
  addModal.style.display = "none";
  modalElement.style.display = "flex";
  editModal.style.display = "flex";

  editModal.querySelector(".input-id").value = id;
  editModal.querySelector(".name").value = product_name;
  editModal.querySelector(".category").value = category_id;
  editModal.querySelector(".price").value = price;
  editModal.querySelector(".quantity").value = stock_quantity;
  editModal.querySelector(".description").value = description;
  // editModal.querySelector(".url").value = image_url;
  editModal.querySelector(".added_date").value = added_date;
};
export const showRemoveModal = (id, product_name) => {
  addModal.style.display = "none";
  modalElement.style.display = "flex";
  editModal.style.display = "none";
  removeModal.style.display = "flex";

  // insert value
  removeModal.querySelector(".input-id").value = id;
  removeModal.querySelector(".name").value = product_name;
};

overlayElement.addEventListener("click", () => {
  hideModal();
});

const routePost = [
  "http://localhost/fashion-store/controller/createData.php?table=products",
  "http://localhost/fashion-store/controller/updateData.php?table=products",
  "http://localhost/fashion-store/controller/deleteData.php?table=products",
];

function startPOSTFetchF(url, formData) {
  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        // Xử lý lỗi
        console.log(data.error);
      } else {
        // Xử lý thành công
        console.log("Upload successful!");
        hideModal();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

addConfirmBTN.addEventListener("click", (e) => {
  e.preventDefault();

  const form = addConfirmBTN.closest(".modal__box").querySelector("form");
  const formData = new FormData(form);

  formData.append("table", "products");


  startPOSTFetchF(routePost[0], formData);
});

editConfirmBTN.addEventListener("click", (e) => {
  e.preventDefault();

  const form = editConfirmBTN.closest(".modal__box").querySelector("form");
  const formData = new FormData(form);

  formData.append("table", "products");


  startPOSTFetchF(routePost[1], formData);
});

removeConfirmBTN.addEventListener("click", (e) => {
  e.preventDefault();
  const form = removeConfirmBTN.closest(".modal__box").querySelector("form");
  const formData = new FormData(form);

  formData.append("table", "products");

  startPOSTFetchF(routePost[2], formData);
});

const inputFileElement = Array.from(document.querySelectorAll(".input-file"));

inputFileElement.map(inputt=>{
  inputt.addEventListener("change", (e) => {
    const files = e.target.files;
    const file = files[files.length - 1];
    const imgDisplay = inputt.closest(".col").querySelector(".col__image");
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        imgDisplay.src = event.target.result;
      };
  
      reader.readAsDataURL(file);
    }
    console.log('he', inputt);
    
  });
})
