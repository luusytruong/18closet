import {
  createMiniProductDisplay,
  handleClickMiniDisplay,
} from "./loadData.js";
import { startGETFetch } from "./startFetch.js";

const productNameElement = document.querySelector(".product__infor__name");
const currentPriceElement = document.querySelector(
  ".product__items__price__cur__content"
);
const oldPriceElement = document.querySelector(
  ".product__items__price__old__content"
);
const detailProduct = document.querySelector(".product__infor__detail__item");
const imgBig = document.getElementById("img-main");
const imgColor = document.querySelector(".img-color");

const productElements = Array.from(
  document.querySelectorAll(".product__items")
);
productElements.map((product) => {
  product.addEventListener("click", () => {
    console.log("hel");
    window.location.href = "./product-infor-temp.html";
  });
});

window.onload = function () {
  loadProductItem();
  loadLostProduct();
};

function calculateOldValue(currentValue) {
  const oldValue = currentValue / 0.75;
  return Math.ceil(oldValue);
}

const addCartBTN = document.querySelector(
  ".product__infor__col__list__btn--add"
);
function mergeByIdWithCount(array) {
  const merged = {};

  array.forEach((item) => {
    if (!merged[item.id]) {
      merged[item.id] = { ...item }; // Nếu id chưa tồn tại, thêm mới
    } else {
      // Nếu id đã tồn tại, gộp thuộc tính count
      merged[item.id].count =
        parseInt(merged[item.id].count) + parseInt(item.count);

      // Cập nhật các thuộc tính khác nếu cần (không ghi đè nếu không cần)
      merged[item.id].image_url = item.image_url || merged[item.id].image_url;
      merged[item.id].product_name =
        item.product_name || merged[item.id].product_name;
      merged[item.id].price = item.price || merged[item.id].price;
      merged[item.id].oldPrice = item.oldPrice || merged[item.id].oldPrice;
    }
  });

  return Object.values(merged);
}

async function loadProductItem() {
  const route =
    "http://localhost/fashion-store/controller/readData.php?table=products";
  const data = await startGETFetch("GET", route);
  data.map((value, index) => {
    var idLocal = localStorage.getItem("id");
    if (idLocal == value.id) {
      productNameElement.innerText = value.product_name;
      currentPriceElement.innerText = value.price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      oldPriceElement.innerText = calculateOldValue(value.price).toLocaleString(
        "vi-VN",
        { style: "currency", currency: "VND" }
      );
      const spane = document.createElement("span");
      spane.innerText = value.description;
      detailProduct.appendChild(spane);
      imgBig.src = "./assets/img_upload/" + value.image_url;
      imgColor.src = "./assets/img_upload/" + value.image_url;

      document.title = `18CLOSET - ${value.product_name}`;

      const inputCouter = document.querySelector(".input-counter");

      addCartBTN.addEventListener("click", () => {
        const localValue = JSON.parse(localStorage.getItem("product-cart"));
        const dataAdd = {
          id: value.id,
          count: inputCouter.value,
          image_url: "./assets/img_upload/" + value.image_url,
          product_name: value.product_name,
          price: value.price,
          oldPrice: calculateOldValue(value.price),
        };

        console.log("hello");
        if (!localValue) {
          localStorage.setItem(
            "product-cart",
            JSON.stringify({ data: [dataAdd] })
          );
        } else {
          const arrayValue = [...localValue.data, dataAdd];
          console.log(mergeByIdWithCount(arrayValue));
          localStorage.setItem(
            "product-cart",
            JSON.stringify({
              data: mergeByIdWithCount(arrayValue),
            })
          );
        }
      });
      buyNowBTN.addEventListener("click", () => {
        localStorage.setItem(
          "product-pay",
          JSON.stringify({
            data: [
              {
                id: value.id,
                count: inputCouter.value,
                image_url: "./assets/img_upload/" + value.image_url,
                product_name: value.product_name,
                price: value.price,
                oldPrice: calculateOldValue(value.price),
              },
            ],
          })
        );
        window.location.href = "./payment-page.html";
      });
    }
  });
}

// input up down
const controls = document.querySelector(".product__infor__col__list__input");
const mitus = controls.querySelector(".down");
const plus = controls.querySelector(".up");
const inputControl = controls.querySelector("input");

mitus.addEventListener("click", () => {
  const value = parseInt(inputControl.value);
  if (value && value > 1) {
    inputControl.value = value - 1;
  }
});
plus.addEventListener("click", () => {
  const value = parseInt(inputControl.value);
  if (value) {
    inputControl.value = value + 1;
  }
});

// const price = 255000
// //
// const currentPriceItems = Array.from(document.querySelectorAll(".product__items__price__cur__content"));
// currentPriceItems.map(elemnent=>{
//   elemnent.textContent = price.toLocaleString('vi-VN',{ style: 'currency', currency: 'VND' });
//   console.log(elemnent.textContent  )
// })

const forYouProductDisplay = document.querySelector(".product-diplay.foryou");
const seenProductDisplay = document.querySelector(".product-diplay.seen");

async function loadLostProduct() {
  const data = await startGETFetch("GET", routes[5]);
  let countLost = 0;
  let count1 = 0;
  let count2 = 0;
  data.map((value, index) => {
    const miniDisplay = createMiniProductDisplay(value);
    const clonedMiniDisplay = miniDisplay.cloneNode(true);

    miniDisplay.addEventListener("click", () => {
      handleClickMiniDisplay(value);
    });

    clonedMiniDisplay.addEventListener("click", () => {
      handleClickMiniDisplay(value);
    });

    //
    // if (countLost < 5) {
    //   forYouProductDisplay
    //     .querySelector(".product__list")
    //     .appendChild(clonedMiniDisplay);
    //   countLost++;
    // }

    // dress
    if (value.category_id == 1) {
      if (count1 < 10) {
        forYouProductDisplay
          .querySelector(".product__list")
          .appendChild(miniDisplay);
        count1++;
      }
    } else {
      if (count2 < 10) {
        seenProductDisplay
          .querySelector(".product__list")
          .appendChild(miniDisplay);
        count2++;
      }
    }
  });
  // console.log(buyLostProductDisplay);
}

const buyNowBTN = document.querySelector(
  ".product__infor__col__list__btn--buy"
);
