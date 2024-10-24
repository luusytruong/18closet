import { startPOSTFetch } from "./startFetch.js";

const productList = document.querySelector(".container__pay__infor__products");

function createItem(value) {
  const box = document.createElement("div");
  box.className = "container__pay__infor__items";
  box.innerHTML = `
        <img src="${value.image_url}" alt="">
        <div class="container__pay__infor__items__in4">
            <span class="container__pay__infor__items__in4__title">${
              value.product_name
            }</span>
            <div class="container__pay__infor__items__row">
                <span>Màu sắc:</span>
            </div>
            <div class="container__pay__infor__items__row">
                <span>Kích thước:</span>
                <span>M</span>
            </div>
            <div class="container__pay__infor__items__row">
                <span>Số lượng:</span>
                <span>${value.count}</span>
            </div>
            <div class="container__pay__infor__items__row">
                <span>Giá:</span>
                <div class="container__pay__infor__items__row__price">
                    <span><span class="cur-price">${value.price.toLocaleString(
                      "vi-VN",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}</span></span>
                    <span><span class="old-price">${value.oldPrice.toLocaleString(
                      "vi-VN",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}</span></span>
                </div>
            </div>
            <div class="container__pay__infor__items__row">
                <span>Thành tiền:</span>
                <div class="container__pay__infor__items__row__price">
                    <span><span class="cur-price">${value.price.toLocaleString(
                      "vi-VN",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}</span></span>
                </div>
            </div>
        </div>
    `;

  return box;
}

const totalElement = document.querySelector(
  ".container__cart__confirm__row__total"
);
let totalInssert = 0;
function updateCart() {
  const localValue = JSON.parse(localStorage.getItem("product-pay"));
  if (localValue) {
    let total = 0;
    localValue.data.map((value) => {
      productList.appendChild(createItem(value));
      total += parseInt(value.price);
    });
    totalElement.innerText = total.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    totalInssert = total;
  }
}
window.onload = () => {
  updateCart();
};

const payBTN = document.querySelector(".container__pay__confirm__order-btn");
const inputAddress = document.querySelector(".input-address");

payBTN.addEventListener("click", () => {
  const data = {
    customer_id: "1",
    total_amount: totalInssert,
    shipping_adress: inputAddress.value,
    payment_status: "Chưa thanh toán",
  };
  console.log(data)

  startPOSTFetch('http://localhost/fashion-store/controller/createData.php?table=orders', data);
  localStorage.setItem(
    "product-cart",
    JSON.stringify({ data: [] })
  );
  alert("Nhân viên 18 CLOSET sẽ sớm liên hệ với bạn");
});
