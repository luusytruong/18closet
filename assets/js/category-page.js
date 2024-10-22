import {
  createMiniProductDisplay,
  handleClickMiniDisplay,
} from "./loadData.js";
import { startGETFetch } from "./startFetch.js";

window.onload = function () {
  loadLostProduct();
};

function calculateOldValue(currentValue) {
  const oldValue = currentValue / 0.75;
  return Math.ceil(oldValue);
}

const dressProductDisplay = document.querySelector(".product-diplay.dress");
const shirtProductDisplay = document.querySelector(".product-diplay.shirt");

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
    const localStorageValue = localStorage.getItem("category")
    console.log(localStorageValue)
    // dress
    if (localStorageValue == 2) {
      dressProductDisplay
        .querySelector(".product__list")
        .appendChild(miniDisplay);
        shirtProductDisplay.style.display = 'none'
      } else {
        shirtProductDisplay
        .querySelector(".product__list")
        .appendChild(miniDisplay);
        dressProductDisplay.style.display = 'none'
    }
  });
  // console.log(buyLostProductDisplay);
}
