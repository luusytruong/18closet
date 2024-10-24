export const routes = [
  //0
  "http://localhost/fashion-store/controller/createData.php?table=users",
  //1
  "http://localhost/fashion-store/controller/readData.php?table=users",
  //2
  "http://localhost/fashion-store/controller/updateData.php?table=users",
  //3
  "http://localhost/fashion-store/controller/deleteData.php?table=users",
  
  //4
  "http://localhost/fashion-store/controller/createData.php?table=products",
  //5
  "http://localhost/fashion-store/controller/readData.php?table=products",
  //6
  "http://localhost/fashion-store/controller/updateData.php?table=products",
  //7
  "http://localhost/fashion-store/controller/deleteData.php?table=products",

  //8
  "http://localhost/fashion-store/controller/createData.php?table=categorys",
  //9
  "http://localhost/fashion-store/controller/readData.php?table=categorys",
  //10
  "http://localhost/fashion-store/controller/updateData.php?table=categorys",
  //11
  "http://localhost/fashion-store/controller/deleteData.php?table=categorys",

  //12
  "http://localhost/fashion-store/controller/createData.php?table=orders",
  //13
  "http://localhost/fashion-store/controller/readData.php?table=orders",
  //14
  "http://localhost/fashion-store/controller/updateData.php?table=orders",
  //15
  "http://localhost/fashion-store/controller/deleteData.php?table=orders",
];

function beginToast(type, title, message) {
  console.error(type, title, message);
}

export function startGETFetch(method, path) {
  return fetch(path, {
    method: method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // if (data.login === 'true') {
      //     isLogin = true;
      // }
      // if (data.status === 'success'){
      //     beginToast('success', data.title, data.content);
      //     if (data.redirect) {
      //         setTimeout(() => {
      //             window.location.href = data.redirect;
      //         }, 1500);
      //     }
      //     if (data.session_id) {
      //         console.log(data.session_id);
      //     }
      // } else if (data.status === 'error') {
      //     beginToast('error', data.title, data.content);
      // } else {
      //     beginToast('error', 'Đã xảy ra lỗi không rõ', 'vui lòng thử lại sau');
      // }
      return data;
    })
    .catch((error) => {
      console.error("error: ", error);
      beginToast(
        "error",
        "Đã xảy ra lỗi phía máy chủ",
        "vui lòng thử lại sau ít phút"
      );
    });
}

export function startPOSTFetch(path, data = {}){
    const params = new URLSearchParams(data);
    fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch((error) => {
      console.error("error: ", error);
      beginToast(
        "error",
        "Đã xảy ra lỗi phía máy chủ",
        "vui lòng thử lại sau ít phút"
      );
    });
}
