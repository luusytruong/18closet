import { getCookie } from "./cookie.js";
import { readDataForm } from "./formActions.js";

const passwordFieldRegister = document.querySelector(
  'input[name = "password-register"]'
);
const passwordFieldLogin = document.querySelector(
  'input[name = "password-login"]'
);

//function xử lý nút con mắt cho 2 form
function showOrHide(element) {
  const eye = element.nextElementSibling;
  if (element.value !== "") {
    if (eye.classList.contains("active")) {
      return;
    }
    eye.classList.add("active");
    eye.addEventListener("click", () => {
      const type = element.getAttribute("type");
      if (type === "password") {
        element.setAttribute("type", "text");
        eye.className = "fa-solid fa-eye-slash active";
      } else {
        element.setAttribute("type", "password");
        eye.className = "fa-solid fa-eye active";
      }
    });
  } else {
    eye.classList.remove("active");
  }
}

//lắng nghe sự kiện và gán fuction
passwordFieldLogin.addEventListener("input", function () {
  showOrHide(this);
});

passwordFieldRegister.addEventListener("input", function () {
  showOrHide(this);
});

//khai btn
const btnShowRegister = document.querySelector(".btn-show-register");
const btnShowLogin = document.querySelector(".btn-show-login");

//fuction xử lý chuyển hướng
export const toTargetForm = (target) => {
  //khai báo form
  const forms = document.querySelectorAll(".form");

  if (target === "register") {
    forms[0].classList.remove("active");
    forms[1].classList.add("active");
    forms[1].querySelector('input[name="fullname"]').value = "";
    forms[1].querySelector('input[name="tel-register"]').value = "";
    forms[1].querySelector(".box-input.password input").value = "";
  } else {
    forms[1].classList.remove("active");
    forms[0].classList.add("active");
    forms[0].querySelector('input[name="tel-login"]').value = "";
    forms[0].querySelector(".box-input.password input").value = "";
  }
  readDataForm();
};
//gán thao tác hiển thị form đăng nhập hoặc đăng ký
btnShowRegister.addEventListener("click", (e) => {
  e.preventDefault();
  toTargetForm("register");
});

btnShowLogin.addEventListener("click", (e) => {
  e.preventDefault();
  toTargetForm("");
});

//gọi fuction lắng nghe submit
readDataForm();

//function ẩn form
export const hideForm = () => {
  const formShow = document.querySelector(".login.show");
  if (formShow) {
    formLogin.classList.add("wait")
    setTimeout(() => {
      document.querySelector(".login.show").classList.remove("show");
      document.querySelector(".login.wait").classList.remove("wait");
    }, 500);
    console.log("debug");
  }
};

//lắng nghe click từ form-overlay
document.querySelector(".form-overlay").addEventListener("click", () => {
  hideForm();
});
//function show form
export const showForm = ()=>{
  const firstForm = document.querySelector('.login')
  firstForm.classList.add('show')
}
//click show form
const formLogin = document.querySelector(".login");
const btnShowForm = document.getElementById("show-login");

btnShowForm.addEventListener("click", () => {
  const letHimCook = getCookie();
  if (letHimCook !== null) {
    return;
  }
  formLogin.classList.add("show");
});

//xử lý cart, phải khai báo thêm 2 var khi gọi function
let timeoutId = null;
let timeout = 300;
export const actionMiniCart = (option) => {
  const btnShowMiniCart = document.getElementById("show-cart");
  if (option === "hide") {
    timeoutId = setTimeout(() => {
      btnShowMiniCart.classList.remove("show");
    }, timeout);
  } else if (option === "show") {
    clearTimeout(timeoutId);
    btnShowMiniCart.classList.add("show");
  } else if (option === "init") {
    const parent = document.querySelector(".mini-cart .list-item");
    const btnDeleteItems = parent.querySelectorAll(".item .item-right");
    btnDeleteItems.forEach((btn) => {
      btn.addEventListener("click", () => {
        const parent = btn.closest(".item");
        parent.classList.add("delete");
        setTimeout(() => {
          parent.remove();
        }, 500);
      });
    });
  }
};
