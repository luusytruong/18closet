const toast = document.getElementById('toast');
const toastIcon = toast.querySelector('.toast-icon');
const toastTitle = toast.querySelector('.toast-title');
const toastContent = toast.querySelector('.toast-content');

export function beginToast(status, title, content) {
    if (status === 'success') {
        toast.classList.add('successful');
        toastIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
        toastTitle.textContent = title;
        toastContent.textContent = content;
    } else if (status === 'error') {
        toast.classList.add('error');
        toastIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
        toastTitle.textContent = title;
        toastContent.textContent = content;
    }
    const timeoutId = setTimeout(() => {
        toast.classList.remove('successful');
        toast.classList.remove('error');
    }, 3000);
}

// export default toast;