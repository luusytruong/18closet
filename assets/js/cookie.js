export function getCookie(){
    const cookie = document.cookie;
    const session_id = cookie.slice(10);
    if (session_id) {
        return session_id;
    } else {
        return null;
    }
}