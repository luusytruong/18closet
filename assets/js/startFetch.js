
export const routes = [
    "http://localhost/fashion-store/controller/readData.php?table=users",
    "http://localhost/fashion-store/controller/readData.php?table=products",
    "http://localhost/fashion-store/controller/readData.php?table=categorys",
    "http://localhost/fashion-store/controller/readData.php?table=orders"
]

function beginToast(type, title, message){
    console.error(type, title, message);
}

export function startGETFetch(method, path){

    return fetch(path, {
        method: method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response =>response.json())
    .then(data => {
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
    .catch(error => {
        console.error('error: ', error);
        beginToast('error', 'Đã xảy ra lỗi phía máy chủ', 'vui lòng thử lại sau ít phút');
    });
};

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
    .catch(error => {
        console.error('error: ', error);
        beginToast('error', 'Đã xảy ra lỗi phía máy chủ', 'vui lòng thử lại sau ít phút');
    });
};
