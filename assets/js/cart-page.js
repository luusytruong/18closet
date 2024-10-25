const minusElements = Array.from(document.querySelectorAll(".minus"));
const plusElements = Array.from(document.querySelectorAll(".plus"));

minusElements.map((btn) => {
  btn.addEventListener("click", () => {
    const inputControl = btn
      .closest(".container__cart__table__col__input")
      .querySelector("input");

    const value = parseInt(inputControl.value);
    if (value && value > 1) {
      inputControl.value = value - 1;
    }
  });
});
plusElements.map((btn) =>
  btn.addEventListener("click", () => {
    const inputControl = btn
      .closest(".container__cart__table__col__input")
      .querySelector("input");

    const value = parseInt(inputControl.value);
    if (value) {
      inputControl.value = value + 1;
    } else {
      value = 1;
    }
  })
);

const value = {
  id: 14,
  count: "3",
  image_url: "./assets/img_upload/shirt4.png",
  product_name: "Áo Dài Cách Tân Nữ Tay Lỡ Voan Tơ Thều Hoa Nhí ADTC3",
  price: 1200000,
  oldPrice: 1600000,
};
function createRowCart(value) {
  const trElement = document.createElement("tr");
  trElement.innerHTML = `
  <td class="container__cart__table__col">
      <img src="${value.image_url}" alt="">
  </td>
  <td class="container__cart__table__col start">
      <div class="col">
          <div class="container__cart__table__col__name ">${
            value.product_name
          }</div>
          <span class="container__cart__table__col__text">
              Màu sắc:
          </span>
          <span class="container__cart__table__col__text">
              Kích thước:
              <span>M</span>
          </span>
      </div>
  </td>
  <td class="container__cart__table__col">
      <span class="container__cart__table__col__price">${value.price.toLocaleString(
        "vi-VN",
        {
          style: "currency",
          currency: "VND",
        }
      )}</span>
  </td>
  <td class="container__cart__table__col">
      <div class="container__cart__table__col__input">
          <input type="text" value="${value.count}" >
      </div>
  </td>
  <td class="container__cart__table__col">
      <div class="price">
          <span><span class="container__cart__table__col__total">${value.oldPrice.toLocaleString(
            "vi-VN",
            {
              style: "currency",
              currency: "VND",
            }
          )}</span></span>
          <i class="fa-solid fa-trash"></i>
      </div>
  </td>
  `;

  const trashIcon = trElement.querySelector(".fa-solid.fa-trash");
  trashIcon.addEventListener("click", () => {
    const results = removeById(value.id);
    localStorage.setItem(
      "product-cart",
      JSON.stringify({ data: results })
    );
    tbodyCart.innerHTML = ""
    updateCart()
  });
  return trElement;
}
function removeById(idToRemove) {
  const localValue = JSON.parse(localStorage.getItem("product-cart"));
  return localValue.data.filter(item => item.id !== idToRemove);
}

const tableCart = document.querySelector(".container__cart__table");
const tbodyCart = tableCart.querySelector("tbody");
const totalElement = document.querySelector(
  ".container__cart__confirm__row__total"
);

function updateCart() {
  const localValue = JSON.parse(localStorage.getItem("product-cart"));
  console.log("lcao value: ", localValue)
  if (localValue) {
    console.log(localValue)
    let total = 0;
    localValue.data.map((value) => {
      tbodyCart.appendChild(createRowCart(value));
      total += parseInt(value.price);
    });
    totalElement.innerText = total.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    buyNowBTN.addEventListener("click", ()=>{
      localStorage.setItem("product-pay", JSON.stringify(localValue));
      window.location.href = "./payment-page.html";
    })
  }
}



window.onload = () => {
  updateCart();
};


const buyNowBTN = document.querySelector(".container__cart__confirm__btn");
