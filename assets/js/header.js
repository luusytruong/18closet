import { actionMiniCart } from "./userActions.js";

document.addEventListener("DOMContentLoaded", () => {
  const navItems = Array.from(document.querySelectorAll(".nav-item"));
  const subMenu = Array.from(document.querySelectorAll(".sub__menu"));
  let showSubMenu = false;
  let timeoutId = null;
  let timeout = 300;
  //xử lý cart
  const btnShowMiniCart = document.getElementById("show-cart");

  navItems.map((navItem, index) => {
    navItem.addEventListener("mouseenter", () => {
      if (document.querySelector(".sub__menu.shows")) {
        document.querySelector(".sub__menu.shows").classList.remove("shows");
      }

      if (subMenu[index]) {
        subMenu[index].classList.add("shows");

        subMenu[index].addEventListener("mouseenter", () => {
          subMenu[index].classList.add("shows");

          if (timeoutId) {
            clearTimeout(timeoutId);
          }
        });

        subMenu[index].addEventListener("mouseleave", () => {
          timeoutId = setTimeout(() => {
            subMenu[index].classList.remove("shows");
          }, 300);
        });
      }

      if (navItem.id === btnShowMiniCart.id) {
        console.log("hover");
        actionMiniCart("show");
        actionMiniCart("init");
        // clearTimeout(timeoutId)
        // navItem.classList.add('show')
      }

      showSubMenu = true;

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      console.log(navItem);
    });
    navItem.addEventListener("mouseleave", () => {
      if (document.querySelector(".sub__menu.shows")) {
        if (showSubMenu) {
          timeoutId = setTimeout(() => {
            if (document.querySelector(".sub__menu.shows")) {
              document
                .querySelector(".sub__menu.shows")
                .classList.remove("shows");
              showSubMenu = false;
            }
          }, 200);
        }
      }
      if (navItem.id === btnShowMiniCart.id) {
        actionMiniCart("hide");
        // timeoutId = setTimeout(() => {
        //   navItem.classList.remove('show')
        // }, 300);
        console.log("nothover");
      }
    });
  });

  subMenu.map((menu, index) => {
    const aE = Array.from(menu.querySelectorAll(".col__menu-link"));
    aE.map((a) => {
      a.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.setItem("category", index + 1);
        window.location.href = this.href;
      });
    });
  });
});

// Hàm để kiểm tra vị trí cuộn
const headerRelative = document.querySelector(".header");
const headerFixed = document.querySelector(".header-fixed");
const headerChild = document.querySelector(".header__wrapper");

const checkScrollPosition = () => {
  // Vị trí cuộn hiện tại
  const scrollPosition = window.scrollY; 

  if (scrollPosition > 93) {
    if (headerFixed.classList.contains('show')) {
      return
    }
    headerFixed.appendChild(headerChild);
    headerFixed.classList.add("show");

  } else {
    headerFixed.classList.remove("show");
    headerRelative.appendChild(headerChild);
  }
};

window.addEventListener("scroll", () => {
  console.log("cc");
  checkScrollPosition();
});
checkScrollPosition();

// khong thay cái nào
// allLink.map(link=>{
//     console.log(link)
//     link.addEventListener("click", (event)=>{
//         event.preventDefault();
//         const subMenuu = this.closest(".sub__menu");
//         if (subMenuu.className.include("shirt")){
//             console.log(1)
//         }
//         const hrefValue = this.href;
//         if(hrefValue == "./category-page.html"){
//             localStorage.setItem("category", 1);
//         }else{
//             localStorage.setItem("category", 2);
//         }
//         // window.location.href = hrefValue
//     })
// })
