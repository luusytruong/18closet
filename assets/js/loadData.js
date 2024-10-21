import { startGETFetch } from "./startFetch.js";

window.onload = function () {
  loadLostProduct();
};

const buyLostProductDisplay = document.querySelector(
  ".product-diplay.buy-lost"
);

const dressProductDisplay = document.querySelector(".product-diplay.dress");

const shirtProductDisplay = document.querySelector(".product-diplay.shirt");

function caculatorOldPrice(giaHienTai, phanTramGiam) {
  return giaHienTai / (1 - phanTramGiam);
}

function createMiniProductDisplay(value) {
  const miniDisplay = document.createElement("div");
  miniDisplay.classList.add("product__items");
  miniDisplay.innerHTML = `
        <img src="./assets/img_upload/${value.image_url}" alt="" class="product__items__img">
        <span class="product__items__name">${value.product_name}</span>
        <div class="product__items__price">
            <span class="product__items__price__cur__content">${
              value.price
            }</span>
            <div class="price-old-wrapp">
                <span class="product__items__price__old__content">${caculatorOldPrice(
                  parseInt(value.price),
                  25
                )}</span>
                <span class="product__items__price__discount">-25%</span>
            </div>
        </div>
    `;
  return miniDisplay;
}

function handleClickMiniDisplay(value) {
  console.log("clicked!");
  window.location.href = "./product-infor-temp.html";
  localStorage.setItem("id", value.id);
}

async function loadLostProduct() {
  const route =
    "http://localhost/fashion-store/controller/readData.php?table=products";
  const data = await startGETFetch("GET", route);
  let countLost = 0;
  let count1 = 0;
  let count2 = 0;
  data.map((value, index) => {
    console.log(value);
    const miniDisplay = createMiniProductDisplay(value);
    const clonedMiniDisplay = miniDisplay.cloneNode(true);

    miniDisplay.addEventListener("click", () => {
      handleClickMiniDisplay(value);
    });

    clonedMiniDisplay.addEventListener("click", () => {
      handleClickMiniDisplay(value);
    });

    //
    if (countLost < 5) {
      buyLostProductDisplay
        .querySelector(".product__list")
        .appendChild(clonedMiniDisplay);
      countLost++;
    }

    // dress
    if (value.category_id == 1) {
      if (count1 < 10) {
        dressProductDisplay
          .querySelector(".product__list")
          .appendChild(miniDisplay);
        count1++;
      }
    } else {
      if (count2 < 10) {
        shirtProductDisplay
          .querySelector(".product__list")
          .appendChild(miniDisplay);
        count2++;
      }
    }
  });
  console.log(buyLostProductDisplay);
}
