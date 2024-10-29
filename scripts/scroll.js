const [menuguide, scrollmenu, width, backstrong, backnotstrong] = ['.menu-guide', '.scroll_menu', window.innerWidth, '#000', '#fff'];

demonstrate_scroll(scrollmenu, width, menuguide, backstrong, backnotstrong)

const elemento = document.querySelector(scrollmenu);

elemento.addEventListener('scroll', () => {
    demonstrate_scroll(scrollmenu, width, menuguide, backstrong, backnotstrong)
})