document.addEventListener('DOMContentLoaded', () => {
    const navItems = Array.from(document.querySelectorAll('.nav-item'))
    let showSubMenu = false
    let timeoutId = null

    navItems.map(navItem => {
        navItem.addEventListener('mouseenter', () => {
            if (document.querySelector('.current-dropdown')) {
                document.querySelector('.current-dropdown').classList.remove('current-dropdown')
            }
            if (document.querySelector('.animation')) {
                document.querySelector('.animation').classList.remove('animation')
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
                        if (document.querySelector('.animation')) {
                            document.querySelector('.animation').classList.remove('animation')
                        }
                    }, 200);
                }
            }
        })
    })
    console.log('load');
    
})