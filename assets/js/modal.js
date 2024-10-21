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
  "http://localhost/fashion-store/controller/createData.php?table=users",
  "http://localhost/fashion-store/controller/createData.php?table=products",
  "http://localhost/fashion-store/controller/createData.php?table=categorys",
  "http://localhost/fashion-store/controller/createData.php?table=orders"
]

function startPOSTFetchF(url, formData) {
  fetch(url, {
    method: 'POST',
    body: formData, 
  })
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    if (data.error) {
      // Xử lý lỗi
      console.log(data.error);
    } else {
      // Xử lý thành công
      console.log('Upload successful!');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

confirmBTNs.map(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const form = btn.closest(".modal__box").querySelector("form");
    const formData = new FormData(form); // Sử dụng FormData

    // Thêm thông tin vào FormData
    formData.append('table', 'products'); // Thêm trường 'table'

    console.log([...formData]); // In ra các giá trị trong FormData

    // Gọi hàm gửi dữ liệu
    startPOSTFetchF(routePost[1], formData); // Gửi formData
  });
});


const inputFileElement = document.getElementById("input-file");
const imgDisplay = document.querySelector(".col__image");

inputFileElement.addEventListener("change", (e) => {
  const files = e.target.files; // Lấy danh sách các tệp
  const file = files[files.length - 1]; // Lấy tệp cuối cùng

  if (file) {
    const reader = new FileReader();

    reader.onload = (event) => {
      imgDisplay.src = event.target.result; // Đặt src của imgDisplay thành đường dẫn dữ liệu (data URL)
    };

    reader.readAsDataURL(file); // Đọc tệp hình ảnh và trả về dữ liệu ở dạng URL
  }
});
