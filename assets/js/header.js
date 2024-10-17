document.addEventListener('DOMContentLoaded', () => {
    const navItems = Array.from(document.querySelectorAll('.nav-item'))
    let showSubMenu = false
    let timeoutId = null

    navItems.map(navItem => {
        navItem.addEventListener('mouseenter', () => {
            if (document.querySelector('.current-dropdown')) {
                document.querySelector('.current-dropdown').classList.remove('current-dropdown')
            }
            if (document.querySelector('.sub__menu__dropdown')) {
                document.querySelector('.sub__menu__dropdown').classList.remove('animation')
            }
            if (navItem.querySelector('.sub__menu__dropdown')) {
                navItem.querySelector('.sub__menu__dropdown').classList.add('animation')
            }
            navItem.classList.add('current-dropdown')
            showSubMenu = true

            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        })
        navItem.addEventListener('mouseleave', () => {
            if (document.querySelector('.current-dropdown')) {
                if (showSubMenu) {
                    timeoutId = setTimeout(() => {
                        if (document.querySelector('.current-dropdown')) {
                            document.querySelector('.current-dropdown').classList.remove('current-dropdown')
                            showSubMenu = false
                        }
                    }, 200);
                }
            }
            if (document.querySelector('.sub__menu__dropdown')) {
                timeoutId = setTimeout(() => {
                    document.querySelector('.sub__menu__dropdown').classList.remove('animation')
                }, 200);
            }
        })
    })
})