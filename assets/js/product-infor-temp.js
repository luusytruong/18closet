const productElements = Array.from(document.querySelectorAll(".product__items"));
productElements.map(product=>{
  product.addEventListener("click", ()=>{
    console.log("hel")
    window.location.href = './product-infor-temp.html'
  })
})