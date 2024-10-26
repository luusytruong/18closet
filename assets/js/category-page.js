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
  console.log(data);
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
    if (value.category_id === 2) {
      shirtProductDisplay
        .querySelector(".product__list")
        .appendChild(miniDisplay);
    } else {
      dressProductDisplay
        .querySelector(".product__list")
        .appendChild(miniDisplay);
    }
  });
  const localStorageValue = parseInt(localStorage.getItem("category"));
  console.log(localStorageValue);

  if (localStorageValue === 1) {
    dressProductDisplay.style.display = "none";
  } else {
    shirtProductDisplay.style.display = "none";
  }
  // console.log(buyLostProductDisplay);
}
