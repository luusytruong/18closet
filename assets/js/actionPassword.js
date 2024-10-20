const passwordField = document.getElementById('password');
const passwordReapetField = document.getElementById('repeat-password');
var revealButton = passwordField.nextElementSibling;

passwordField.addEventListener('input', function () {
    if (this.value !== "") {
        revealButton.classList.add('active');
    } else {
        revealButton.classList.remove('active');
    }
    // if (revealButton && revealButton.tagName === 'I'){
        //     revealButton.style.display = 'none';
        // }
        
    })
revealButton.addEventListener('click', function () {
        const typePasswordField = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        const showOrHide = this.getAttribute('class') === 'fa-solid fa-eye active' ? 'fa-solid fa-eye-slash active' : 'fa-solid fa-eye active';
        
        this.setAttribute('class', showOrHide);
        passwordField.setAttribute('type', typePasswordField);
        if(passwordReapetField){
            passwordReapetField.setAttribute('type', typePasswordField);
        }
})

