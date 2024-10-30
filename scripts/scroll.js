const [menuguide, scrollmenu, width, backstrong, backnotstrong] = ['.menu-guide', '.scroll_menu', window.innerWidth, 'var(--cor-contraste)', 'var(--cor-contraste-do-contraste)'];

demonstrate_scroll(scrollmenu, width, menuguide, backstrong, backnotstrong)

const elemento = document.querySelector(scrollmenu);

elemento.addEventListener('scroll', () => {
    demonstrate_scroll(scrollmenu, width, menuguide, backstrong, backnotstrong)
})