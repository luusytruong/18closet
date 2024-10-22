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

window.onload = () => {
  const localValue = localStorage.getItem("product-cart");
  console.log(localValue);
};
