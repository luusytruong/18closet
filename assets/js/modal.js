export const modalElement = document.querySelector(".modal");
export const overlayElement = modalElement.querySelector(".modal-overlay");
export const modalContainer = modalElement.querySelector(".modal-container");
export const addModal = modalContainer.querySelector(".modal__add");
export const editModal = modalContainer.querySelector(".modal__edit");
export const removeModal = modalContainer.querySelector(".modal__remove");

const confirmBTNs = Array.from(
  modalElement.querySelectorAll(".modal__confirm__btn")
);

export const hideModal = () => {
  removeModal.style.display = "none";
  editModal.style.display = "none";
  modalElement.style.display = "none";
  addModal.style.display = "none";
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
  image_url,
  added_date
) => {
  removeModal.style.display = "none";
  addModal.style.display = "none";
  modalElement.style.display = "flex";
  editModal.style.display = "flex";

  // insert value
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

]

confirmBTNs.map((btn, index) => {
  btn.addEventListener("click", () => {
    // console.log("hello")
    const form = btn.closest(".modal__box").querySelector("form");
    const formData = new FormData(form);
    const dataObj = {};

    // Iterate over the form data and populate the object
    formData.forEach((value, key) => {
      dataObj[key] = value;
    });
    console.log(dataObj)
    // hideModal();

    startPOSTFetch('POST', routePost[index], dataObj);
  });
});
