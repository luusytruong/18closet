// banner
let switchValue = 1;
const bannerElement = document.querySelector(".banner__list");
const img1 = bannerElement.querySelector(".banner__list__img.img1");
const img2 = bannerElement.querySelector(".banner__list__img.img2");
let interval;
let timeOut;

function switchClick() {
    console.log("!run")
  
  if (switchValue) {
    img1.style.transition = "left 0.5s ease"; 
    img2.style.transition = "left 0.5s ease";
    img1.style.left = "-100%"; 
    img2.style.left = "0"; 
    img2.style.zIndex = 1; 
    timeOut = setTimeout(() => {
      img1.style.zIndex = 0;
      img1.style.left = "100%"; 
    }, 500); 
    switchValue = 0;
  } else {
    img1.style.transition = "left 0.5s ease";
    img2.style.transition = "left 0.5s ease";
    
    img2.style.left = "-100%"; 
    img1.style.left = "0"; 
    img1.style.zIndex = 1; 
    timeOut = setTimeout(() => {
      img2.style.zIndex = 0;
      img2.style.left = "100%"; 
    }, 500);
    switchValue = 1;
  }
}


function startSlideInterval() {
  interval = setInterval(() => {
    switchClick();
  }, 10000); 
}


function removeActive() {
  const outlines = Array.from(
    document.querySelectorAll(".banner__control__outline")
  );
  outlines.forEach((outline) => {
    outline.classList.remove("active");
  });
}


function activeImg1(btn) {
  if (switchValue === 1) return; 

  removeActive();
  btn.classList.add("active");
  clearInterval(interval);
  clearTimeout(timeOut);

  img1.style.transition = "left 0.5s ease";
  img2.style.transition = "left 0.5s ease";

  img1.style.left = "0"; 
  img2.style.left = "100%"; 
  img1.style.zIndex = 1; 

  timeOut = setTimeout(() => {
    img2.style.zIndex = 0;
  }, 500);

  switchValue = 1;
}


function activeImg2(btn) {
  if (switchValue === 0) return; 

  removeActive();
  btn.classList.add("active");
  clearInterval(interval);
  clearTimeout(timeOut);

  img1.style.transition = "left 0.5s ease";
  img2.style.transition = "left 0.5s ease";

  img1.style.left = "-100%"; 
  img2.style.left = "0"; 
  img2.style.zIndex = 1; 

  timeOut = setTimeout(() => {
    img1.style.zIndex = 0;
  }, 500);

  switchValue = 0;
}


startSlideInterval();

// const price = 255000
// //
// const currentPriceItems = Array.from(document.querySelectorAll(".product__items__price__cur__content"));
// currentPriceItems.map(elemnent=>{
//   elemnent.textContent = price.toLocaleString('vi-VN',{ style: 'currency', currency: 'VND' });
//   console.log(elemnent.textContent  )
// })

