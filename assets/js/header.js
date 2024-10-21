document.addEventListener('DOMContentLoaded', () => {
    const navItems = Array.from(document.querySelectorAll('.nav-item'))
    const subMenu = Array.from(document.querySelectorAll('.sub__menu'))
    let showSubMenu = false
    let timeoutId = null

    navItems.map((navItem, index) => {
        navItem.addEventListener('mouseenter', () => {
            if (document.querySelector('.sub__menu.shows')) {
                document.querySelector('.sub__menu.shows').classList.remove('shows')
            }

            if (subMenu[index]) {
                subMenu[index].classList.add('shows')

                subMenu[index].addEventListener('mouseenter', () => {
                    subMenu[index].classList.add('shows')

                    if (timeoutId) {
                        clearTimeout(timeoutId)
                    }
                })

                subMenu[index].addEventListener('mouseleave', () => {
                    timeoutId = setTimeout(() => {
                        subMenu[index].classList.remove('shows')
                    }, 300);
                })
            }

            showSubMenu = true

            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        })
        navItem.addEventListener('mouseleave', () => {
            if (document.querySelector('.sub__menu.shows')) {
                if (showSubMenu) {
                    timeoutId = setTimeout(() => {
                        if (document.querySelector('.sub__menu.shows')) {
                            document.querySelector('.sub__menu.shows').classList.remove('shows')
                            showSubMenu = false
                        }
                    }, 200);
                }
            }
        })
    })
    
    const formLogin = document.querySelector('.login')
    const btnShowLogin = document.getElementById('show-login')
    const hidenLogin = document.querySelector('.login .wrapper')

    btnShowLogin.addEventListener('click', ()=>{
        formLogin.classList.add('show')
    })
    hidenLogin.addEventListener('click', ()=>{
        // formLogin.classList.remove('show')
    })


})