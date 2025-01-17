import { getCookie } from "./cookie.js";
import { startFetch, startFetchAsync, startGETAsync } from "./formActions.js";
import { routes, startGETFetch } from "./startFetch.js";
import { beginToast } from "./toast.js";

document.addEventListener("DOMContentLoaded", async () => {
  //func xoá loading
  function removeLoading() {
    document.querySelector(".wait-loading").classList.add("ok");
    setTimeout(() => {
      document.querySelector(".wait-loading").remove();
      document.querySelector(".container").style.display = "unset";
    }, 500);
  }
  function listenerBtnLogout() {
    //khai báto btn logout
    const btnLogout = document.querySelector(".account-logout");
    //khai báo biến ngăn spam
    let cooldown = true;
    //nghe sự kiện click btn đăng xuất
    btnLogout.addEventListener("click", async () => {
      //
      if (!cooldown) {
        console.log("dang hoi chieu");
        return;
      }
      //
      cooldown = false;
      //
      const letHimCook = getCookie();
      if (letHimCook === null) {
        beginToast("error", "Đã xảy ra lỗi", "Khách hàng không đăng nhập");
      } else {
        try {
          const path =
            "http://localhost/fashion-store/controller/userActions.php";
          const data = { action: "logout" };
          const result = await startFetchAsync(path, data);
          console.log(result);

          if (result.status === "success") {
            beginToast(result.status, result.title, result.content);
            setTimeout(() => {
              window.location.href = "./";
            }, 3000);
          }
        } catch (error) {
          console.error("Lỗi xảy ra trong quá trình fetch:", error);
          beginToast("error", "Đã xảy ra lỗi", "Không thể đăng xuất");
        }
      }
      setTimeout(() => {
        cooldown = true;
      }, 3000);
    });
  }
  //fuc xử lý ngày tháng
  function formattedDate(string, type) {
    const date = new Date(string);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    let formattedDate = null;

    if (type === "date") {
      formattedDate = `${day}/${month}/${year}`;
    } else if (type === "datetime") {
      formattedDate = `ngày ${day} tháng ${month} năm ${year} lúc ${hours} giờ ${minutes} phút ${seconds} giây`;
    }
    return formattedDate;
  }
  //fuc format tiền
  function formattedVND(amount) {
    if (amount === undefined || amount === null) {
      return NaN;
    }
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
  //fuc tạo order
  function createOrderEle(id, time, amount, address) {
    const child = `
        <div class="img-show">
            <img src="./assets/img/icons/up-arrow.png" alt="">
        </div>
        <div class="order-information">
            <p class="order-name">
                Đơn hàng số <strong>
                    #
                    <span class="order-id">
                        ${id}
                    </span>
                </strong>
                , 
                <span class="order-date">
                    ${formattedDate(time, "datetime")}
                </span>
            </p>
            <p class="order-amount">
                ${formattedVND(amount)}
            </p>
            <div class="order-address">
                <i class="fa-solid fa-location-dot"></i>
                <p>
                    ${address}
                </p>
            </div>
        </div>
        <div class="order-status">
            <p>
                Chuẩn bị Hàng
            </p>
        </div>
    `;
    const order = document.createElement("div");
    order.classList.add("order", `order${id}`);
    order.innerHTML = child;
    return order;
  }

  //lấy user_id
  let user_id = null;
  let route = "http://localhost/fashion-store/controller/checkLogin.php";
  let dataFetch = { case: "users" };
  let result = await startFetchAsync(route, dataFetch);
  console.log(result);
  if (result.user_id) {
    user_id = parseInt(result.user_id);
  }
  //lấy user
  route = "http://localhost/fashion-store/controller/readData.php";
  dataFetch = { table: "users" };
  result = await startGETAsync(route, dataFetch);
  console.log(result);
  result.forEach((data) => {
    if (parseInt(data.id) === user_id) {
      console.log(data);
      document.querySelector(".account-name p").textContent = data.full_name;
      document.querySelector(".account-phone p").textContent =
        data.phone_number;
      document.querySelector(".account-create p span").textContent =
        formattedDate(data.created_at, "date");
      document.querySelector(".account-address p").textContent =
        "Chưa có địa chỉ mặc định";
    }
  });
  //xử lý kéo data
  route = "http://localhost/fashion-store/controller/readData.php";
  dataFetch = { table: "orders" };
  result = await startGETAsync(route, dataFetch);
  if (result.length !== 0) {
    const orderList = document.querySelector(".order-list");
    orderList.textContent = "";
    console.log(result);
    result.forEach((data) => {
      if (parseInt(data.customer_id) === user_id) {
        let newOrder = createOrderEle(
          data.id,
          data.order_date,
          data.total_amount,
          data.shipping_adress
        );
        orderList.appendChild(newOrder);
      }
    });
  }

  //call fc
  removeLoading();
  listenerBtnLogout();

  //create item order
  function createItem(link, name, price, quantity) {
    const product = document.createElement("div");
    product.classList.add("product");
    product.innerHTML = `
    
    <div class="product-img">
        <img src="./assets/img_upload/${link}" alt="">
    </div>
    <div class="product-info">
        <div class="product-name">
            ${name}
        </div>
        <div class="product-price">
            ${formattedVND(price)}
        </div>
    </div>
    <div class="product-quantity">
        <p>
            ${quantity}
        </p>
    </div>
    <div class="product-total">
        <p>
            ${formattedVND(quantity * price)}
        </p>
    </div>
    `;
    return product;
  }

  const viewOrder = document.querySelector(".view-order");
  const orderList = viewOrder.querySelector(".list-product");
  const orderTitle = document.querySelector(".order-title");

  //fuc lấy id đơn
  async function readOrderId() {
    const orders = Array.from(document.querySelectorAll(".order"));
    orders.map((order, orderIndex) => {
      order.addEventListener("click", async () => {
        const orderId = parseInt(order.className.slice(11));
        const localS = JSON.parse(localStorage.getItem("product-pay"));
        console.log(orderId);

        const dataProduct = await startGETFetch("GET", routes[5]);
        const dataOrderDetail = await startGETFetch("GET", routes[21]);
        console.log(dataOrderDetail);
        const products_id = dataOrderDetail
          .filter((value) => orderId === value.order_id)

        const objectProduct = {
          ids: products_id.map((value) => value.product_id),
          quantity: products_id.map((value) => value.product_amount),
        }
          

        console.log(objectProduct)
        if (products_id.length) {
          viewOrder.classList.add("active");
          orderList.innerHTML = "";
          orderTitle.querySelector("span").innerText = orderId;
        }
        
        dataProduct.map((product) => {
          if (objectProduct.ids.includes(product.id)) {
            var index = objectProduct.ids.indexOf(product.id);
            const productItem = createItem(product.image_url, product.product_name, product.price, objectProduct.quantity[index]);
            orderList.appendChild(productItem);
          }
        });
        orderTitle.addEventListener("click", ()=>{
          viewOrder.classList.remove("active");
          
        })
      });
    });
  }
  readOrderId();
});
