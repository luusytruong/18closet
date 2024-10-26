// import { loadAdmin, sidebarActiveNow } from "./admin.js";

import "./toast.js";
import { beginToast } from "./toast.js";
import { hideForm, showForm, toTargetForm } from "./userActions.js";

let cooldown = true;
//fuction đọc data từ form đang active
export async function readDataForm() {
  const path = "http://localhost/fashion-store/controller/userActions.php";
  //lắng nghe sự kiện submit từ form đang active
  document
    .querySelector(".form.active")
    .addEventListener("submit", async function (e) {
      //ngăn submit form
      e.preventDefault();
      console.log("he");

      //kiểm tra cooldown ngăn spam
      if (!cooldown) {
        console.log("đang hồi chiêu");
        return;
      }

      //đặt giá trị thành sai
      cooldown = false;

      //lấy data từ form
      const data = new FormData(this);

      //kiểm tra là data của login hay register
      if (data.get("fullname")) {
        //khởi tạo data từ form
        const dataForm = {
          action: "register",
          full_name: data.get("fullname"),
          phone_number: data.get("tel-register"),
          password: data.get("password-register"),
        };

        //bắt đầu gửi yêu cầu đến endpoint
        startFetch(path, dataForm);

        //sau 3s mới cho click tiếp
        setTimeout(() => {
          cooldown = true;
        }, 3000);

        console.log(dataForm);
      } else if (data.get("email-login")) {
        const dataForm = {
          action: "admin",
          email: data.get("email-login"),
          password: data.get("password-login"),
        };

        //bắt đầu gửi yêu cầu đến endpoint
        const result = await startFetchAsync(path, dataForm);
        if (result.status === "success") {
          hideForm();
          setTimeout(() => {
            window.location.href = "./admin.html";
          }, 350);
        }
        //sau 3s mới cho click tiếp
        setTimeout(() => {
          cooldown = true;
        }, 3000);

        console.log(dataForm);
      } else {
        const dataForm = {
          action: "login",
          phone_number: data.get("tel-login"),
          password: data.get("password-login"),
        };

        //bắt đầu gửi yêu cầu đến endpoint
        startFetch(path, dataForm);

        //sau 3s mới cho click tiếp
        setTimeout(() => {
          cooldown = true;
        }, 3000);

        console.log(dataForm);
      }
    });
}

export function startFetch(path, data) {
  const params = new URLSearchParams(data);
  fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("96", data);
      if (data.status === "success") {
        beginToast(data.status, data.title, data.content);
        if (data.admin_login) {
          if (data.login === true) {
            hideForm();
          }
        }
        if (data.user_login) {
          if (data.login === true) {
            hideForm();
          }
        }
        if (data.register) {
          setTimeout(() => {
            toTargetForm("");
          }, 500);
        }
        if (data.order) {
          setTimeout(() => {
            window.location.href = "./";
          }, 3000);
        }
        if (data.session_id) {
          setTimeout(() => {
            console.log(data.session_id);
            toTargetForm("");
            hideForm();
          }, 1500);
        }
      } else if (data.status === "error") {
        beginToast(data.status, data.title, data.content);

        if (data.admin_login) {
          if (data.login === false) {
            showForm();
          }
        }
        if (data.user_login) {
          if (data.login === false) {
            showForm();
          }
        }
      } else {
        beginToast("error", "Đã xảy ra lỗi", "Vui lòng thử lại sau");
        console.log(data);
      }
    })
    .catch((error) => {
      console.error("error: ", error);
      beginToast("error", "Đã xảy ra lỗi phía máy chủ", error);
    });
}

export async function startFetchAsync(path, data) {
  const params = new URLSearchParams(data);
  try {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error: ", error);
    beginToast("error", "Đã xảy ra lỗi phía máy chủ", error);
    return null;
  }
}
