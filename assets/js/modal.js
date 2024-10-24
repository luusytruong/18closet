import { sidebarActiveNow } from "./admin.js";
import { routes, startPOSTFetch } from "./startFetch.js";
import { beginToast } from "./toast.js";

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

let wrapperTableIndex = 0;

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

export const scrollToBottom = (index) => {
  setTimeout(() => {
    const wrapperTables = document.querySelectorAll(".table__wrapper");
    const wrapper = wrapperTables[index];
    wrapper.scrollTo({
      top: wrapper.scrollHeight,
      behavior: "smooth",
    });
  }, 300);
};

function startPOSTFetchF(url, formData) {
  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "error") {
        // Xử lý lỗi
        console.log(data);
        beginToast(data.status, data.title, data.content);
      } else {
        // Xử lý thành công
        console.log(data);
        beginToast(data.status, data.title, data.content);
        hideModal();
        scrollToBottom(wrapperTableIndex);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

let cooldown = true;

addConfirmBTN.addEventListener("click", (e) => {
  if (!cooldown) {
    console.log("đang hồi chiêu");
    return;
  }
  cooldown = false;

  wrapperTableIndex = 1;
  e.preventDefault();

  const form = addConfirmBTN.closest(".modal__box").querySelector("form");
  const formData = new FormData(form);

  formData.append("table", "products");

  startPOSTFetchF(routes[4], formData);

  setTimeout(() => {
    cooldown = true;
  }, 3000);
});

editConfirmBTN.addEventListener("click", (e) => {
  if (!cooldown) {
    console.log("đang hồi chiêu");
    return;
  }
  cooldown = false;

  wrapperTableIndex = 1;
  e.preventDefault();

  const form = editConfirmBTN.closest(".modal__box").querySelector("form");
  const formData = new FormData(form);

  formData.append("table", "products");

  startPOSTFetchF(routes[6], formData);

  setTimeout(() => {
    cooldown = true;
  }, 3000);
});

removeConfirmBTN.addEventListener("click", (e) => {
  if (!cooldown) {
    console.log("đang hồi chiêu");
    return;
  }
  cooldown = false;

  wrapperTableIndex = 1;
  e.preventDefault();
  const form = removeConfirmBTN.closest(".modal__box").querySelector("form");
  const formData = new FormData(form);

  formData.append("table", "products");

  startPOSTFetchF(routes[7], formData);

  setTimeout(() => {
    cooldown = true;
  }, 3000);
});

const inputFileElement = Array.from(document.querySelectorAll(".input-file"));
inputFileElement.map((inputt) => {
  inputt.addEventListener("change", (e) => {
    const files = e.target.files;
    const file = files[files.length - 1];
    const imgDisplay = inputt.closest(".col").querySelector(".col__image");
    const imgName = inputt.closest(".col").querySelector(".col label span");

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        imgDisplay.src = event.target.result;
        imgName.textContent = file.name;
        console.log("he", file.name);
      };

      reader.readAsDataURL(file);
    }
  });
});
