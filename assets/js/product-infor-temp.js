import { startGETFetch } from "./startFetch.js";

const productNameElement = document.querySelector(".product__infor__name");
const currentPriceElement = document.querySelector(
  ".product__items__price__cur__content"
);
const oldPriceElement = document.querySelector(
  ".product__items__price__old__content"
);
const detailProduct = document.querySelector(".product__infor__detail__item");

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
  loadLostProduct();
};

async function loadLostProduct() {
  const route =
    "http://localhost/fashion-store/controller/readData.php?table=products";
  const data = await startGETFetch("GET", route);
  data.map((value, index) => {
    var idLocal = localStorage.getItem("id");
    if (idLocal == value.id) {
      console.log(value)
      productNameElement.innerText = value.product_name
      currentPriceElement.innerText = value.price;
      oldPriceElement.innerText = value.price;
      detailProduct.innerText = value.description;
    }
  });
}
