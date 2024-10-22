import { createMiniProductDisplay, handleClickMiniDisplay } from "./loadData.js";
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

async function loadProductItem() {
  const route =
    "http://localhost/fashion-store/controller/readData.php?table=products";
  const data = await startGETFetch("GET", route);
  data.map((value, index) => {
    var idLocal = localStorage.getItem("id");
    if (idLocal == value.id) {
      console.log(value);
      console.log(value);
      productNameElement.innerText = value.product_name;
      currentPriceElement.innerText = value.price.toLocaleString('vi-VN',{ style: 'currency', currency: 'VND' });
      oldPriceElement.innerText = calculateOldValue(value.price).toLocaleString('vi-VN',{ style: 'currency', currency: 'VND' });
      const spane = document.createElement('span');
      spane.innerText = value.description;
      detailProduct.appendChild(spane);
      imgBig.src = "./assets/img_upload/" + value.image_url;
      imgColor.src = "./assets/img_upload/" + value.image_url;

      document.title = `18CLOSET - ${value.product_name}`
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
  if (value && value > 0) {
    inputControl.value = value - 1;
  } else {
    value = 1;
  }
});
plus.addEventListener("click", () => {
  const value = parseInt(inputControl.value);
  console.log(value);
  if (value) {
    inputControl.value = value + 1;
  } else {
    value = 1;
  }
});

// const price = 255000
// //
// const currentPriceItems = Array.from(document.querySelectorAll(".product__items__price__cur__content"));
// currentPriceItems.map(elemnent=>{
//   elemnent.textContent = price.toLocaleString('vi-VN',{ style: 'currency', currency: 'VND' });
//   console.log(elemnent.textContent  )
// })


const forYouProductDisplay = document.querySelector(".product-diplay.foryou")
const seenProductDisplay = document.querySelector(".product-diplay.seen")


async function loadLostProduct() {
  const route =
    "http://localhost/fashion-store/controller/readData.php?table=products";
  const data = await startGETFetch("GET", route);
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
