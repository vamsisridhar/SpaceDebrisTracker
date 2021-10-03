const 3_lines = document.querySelector('#mobile-menu')
const nav_men = document.querySelector('.navbar__menu')

//Display Mobile Menu
const mobileDisplay = ()=>{
    menubar.classList.toggle('is-active')
    menuLinks.classList.toggle('active')
}

menubar.addEventListener('click', mobileDisplay);