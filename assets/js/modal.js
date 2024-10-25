import { sidebarActiveNow } from "./admin.js";
import { routes, startPOSTFetch } from "./startFetch.js";
import { beginToast } from "./toast.js";

export const modalElement = document.querySelector(".modal");
export const overlayElement = modalElement.querySelector(".modal-overlay");
export const modalContainer = modalElement.querySelector(".modal-container");
export const addProductModal = modalContainer.querySelector(".modal__add.product");
export const addDiscountModal = modalContainer.querySelector(".modal__add.discount");
export const editProductModal = modalContainer.querySelector(".modal__edit.product");
export const editDiscountModal = modalContainer.querySelector(".modal__edit.discount");
export const removeProductModal = modalContainer.querySelector(".modal__remove.product");
export const removeDiscountModal = modalContainer.querySelector(".modal__remove.discount");

const confirmBTNs = Array.from(
  modalElement.querySelectorAll(".modal__confirm__btn")
);

// product
const addProductConfirmBTN = document.querySelector(".modal__add__btn.product");
const editProductConfirmBTN = document.querySelector(".modal__edit__btn.product");
const removeProductConfirmBTN = document.querySelector(".modal__remove__btn.product");
// discount
const addDiscountConfirmBTN = document.querySelector(".modal__add__btn.discount");
const editDiscountConfirmBTN = document.querySelector(".modal__edit__btn.discount");
const removeDiscountConfirmBTN = document.querySelector(".modal__remove__btn.discount");

let wrapperTableIndex = 0;

const closeAllForm = ()=>{
  const modals = Array.from(document.querySelectorAll(".modal__box"));
  modals.map(modal=>{
    modal.style.display = 'none'
  })
  modalElement.style.display = "none";
}

const activeNessesaryForm= ()=>{
  modalElement.style.display = "flex";
}

export const hideModal = () => {
  closeAllForm();
  sidebarActiveNow.click();
};

export const showProductAddModal = () => {
  closeAllForm();
  activeNessesaryForm();
  addProductModal.style.display = "flex";
};
export const showDiscountAddModal = () => {
  closeAllForm();
  activeNessesaryForm();
  addDiscountModal.style.display = "flex";
};

export const showEditProductModal = (
  id,
  product_name,
  category_id,
  price,
  stock_quantity,
  description,
  added_date
) => {
  closeAllForm();
  activeNessesaryForm();
  editProductModal.style.display = "flex";

  editProductModal.querySelector(".input-id").value = id;
  editProductModal.querySelector(".name").value = product_name;
  editProductModal.querySelector(".category").value = category_id;
  editProductModal.querySelector(".price").value = price;
  editProductModal.querySelector(".quantity").value = stock_quantity;
  editProductModal.querySelector(".description").value = description;
  // editProductModal.querySelector(".url").value = image_url;
  editProductModal.querySelector(".added_date").value = added_date;
};
export const showEditDiscountModal = (
  id,
  code,
  discount
) => {
  closeAllForm();
  activeNessesaryForm();
  editDiscountModal.style.display = "flex";

  editDiscountModal.querySelector(".input-id").value = id;
  editDiscountModal.querySelector(".code").value = code;
  editDiscountModal.querySelector(".discount").value = discount;
};
export const showRemoveProductModal = (id, product_name) => {
  closeAllForm();
  activeNessesaryForm();
  modalElement.style.display = "flex";
  removeProductModal.style.display = "flex";

  // insert value
  removeProductModal.querySelector(".input-id").value = id;
  removeProductModal.querySelector(".name").value = product_name;
};
export const showRemoveDiscountModal = (id, code) => {
  closeAllForm();
  activeNessesaryForm();
  modalElement.style.display = "flex";
  removeDiscountModal.style.display = "flex";

  // insert value
  removeDiscountModal.querySelector(".input-id").value = id;
  removeDiscountModal.querySelector(".code").value = code;
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

addProductConfirmBTN.addEventListener("click", (e) => {
  if (!cooldown) {
    console.log("đang hồi chiêu");
    return;
  }
  cooldown = false;

  wrapperTableIndex = 1;
  e.preventDefault();

  const form = addProductConfirmBTN.closest(".modal__box").querySelector("form");
  const formData = new FormData(form);

  formData.append("table", "products");

  startPOSTFetchF(routes[4], formData);

  setTimeout(() => {
    cooldown = true;
  }, 3000);
});

editProductConfirmBTN.addEventListener("click", (e) => {
  if (!cooldown) {
    console.log("đang hồi chiêu");
    return;
  }
  cooldown = false;

  wrapperTableIndex = 1;
  e.preventDefault();

  const form = editProductConfirmBTN.closest(".modal__box").querySelector("form");
  const formData = new FormData(form);

  formData.append("table", "products");

  console.log(formData)
  startPOSTFetchF(routes[6], formData);

  setTimeout(() => {
    cooldown = true;
  }, 3000);
});

removeProductConfirmBTN.addEventListener("click", (e) => {
  if (!cooldown) {
    console.log("đang hồi chiêu");
    return;
  }
  cooldown = false;

  wrapperTableIndex = 1;
  e.preventDefault();
  const form = removeProductConfirmBTN.closest(".modal__box").querySelector("form");
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


// discount

addDiscountConfirmBTN.addEventListener("click", (e) => {
  if (!cooldown) {
    console.log("đang hồi chiêu");
    return;
  }
  cooldown = false;
  
  wrapperTableIndex = 1;
  e.preventDefault();
  
  const form = addDiscountConfirmBTN.closest(".modal__box").querySelector("form");
  console.log(addDiscountConfirmBTN)
  const formData = new FormData(form);

  formData.append("table", "discounts");

  startPOSTFetchF(routes[16], formData);

  setTimeout(() => {
    cooldown = true;
  }, 3000);
})

editDiscountConfirmBTN.addEventListener("click", (e) => {
  if (!cooldown) {
    console.log("đang hồi chiêu");
    return;
  }
  cooldown = false;

  wrapperTableIndex = 1;
  e.preventDefault();

  const form = editDiscountConfirmBTN.closest(".modal__box").querySelector("form");
  const formData = new FormData(form);
  formData.append("table", "discounts");
  
  console.log("Form Data:");
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  
  console.log("Route:", routes[18]);
  startPOSTFetchF(routes[18], formData);

  setTimeout(() => {
    cooldown = true;
  }, 3000);
});

removeDiscountConfirmBTN.addEventListener("click", (e) => {
  if (!cooldown) {
    console.log("đang hồi chiêu");
    return;
  }
  cooldown = false;

  wrapperTableIndex = 1;
  e.preventDefault();
  const form = removeDiscountConfirmBTN.closest(".modal__box").querySelector("form");
  const formData = new FormData(form);

  formData.append("table", "discounts");

  startPOSTFetchF(routes[7], formData);

  setTimeout(() => {
    cooldown = true;
  }, 3000);
});
