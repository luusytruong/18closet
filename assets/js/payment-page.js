import { startFetch, startFetchAsync } from "./formActions.js";

import { routes, startGETFetch, startPOSTFetch } from "./startFetch.js";

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
                    <span><span class="cur-price">${(
                      value.price * value.count
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}</span></span>
                </div>
            </div>
        </div>
    `;

  return box;
}

const totalElement = document.querySelector(
  ".container__cart__confirm__row__total.cur"
);

let totalInssert = 0;
let totalValue = 0;
function updateCart() {
  const localValue = JSON.parse(localStorage.getItem("product-pay"));
  if (localValue) {
    let total = 0;
    localValue.data.map((value) => {
      productList.appendChild(createItem(value));
      total += parseInt(value.price) * parseInt(value.count);
    });
    totalValue = total;
    console.log("total: ", total)
    totalElement.innerText = total.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });    
    totalAllDisplay.innerText = total.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    totalInssert = total;
  }
}

const inputName = document.querySelector(".input-name");
const inputPhone = document.querySelector(".input-phone");
let user_id = null
async function updateInfor() {
  try {
    const data = await startGETFetch("GET", routes[1]); // Wait for the data
    console.log(data);
    const datafetch = {
      case: "users",
    };
    const path = "http://localhost/fashion-store/controller/checkLogin.php";
    const result = await startFetchAsync(path, datafetch);
    if (result.user_id) {
      user_id = result.user_id

      data.map(usdt=>{
        if (usdt.id = user_id) {
          inputName.value = usdt.full_name;
          inputPhone.value = usdt.phone_number;
        }
      })
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

window.onload = () => {
  updateCart();
  updateInfor();
};

const payBTN = document.querySelector(".container__pay__confirm__order-btn");
const inputAddress = document.querySelector(".input-address");

payBTN.addEventListener("click", async () => {
  

  if (user_id) {
    const data = {
      table: "orders",
      customer_id: user_id,
      total_amount: totalInssert,
      shipping_adress: inputAddress.value,
    };
    console.log(data)

    startFetch(
      "http://localhost/fashion-store/controller/createData.php",
      data
    );
    localStorage.setItem("product-cart", JSON.stringify({ data: [] }));
  } else {
    alert('ddax xay ra loiix')
  }
});

const discountBTN = document.querySelector(
  ".container__pay__confirm__discount__btn"
);
const inputADiscount = document.querySelector(".input-discount");
const discountDisplay = document.querySelector(
  ".container__cart__confirm__row__total.discount"
);
const totalAllDisplay = document.querySelector(
  ".container__cart__confirm__row__total.pay"
);

let discountValue = 0;
let totalValueAll = 0;

discountBTN.addEventListener("click", async () => {
  console.log("hel");
  const data = await startGETFetch("GET", routes[17]);
  const valueDiscount = inputADiscount.value.trim();

  data.map((value) => {
    if (valueDiscount == value.code) {
      discountValue = value.discount;
      discountDisplay.innerText = discountValue.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    }
  });
  totalValueAll = totalValue - discountValue;
  totalAllDisplay.innerText = totalValueAll.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
});
