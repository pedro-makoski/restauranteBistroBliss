const [menuguide, scrollmenu, width, backstrong, backnotstrong] = ['.menu-guide', '.scroll_menu', window.innerWidth, 'var(--cor-contraste)', 'var(--cor-contraste-do-contraste)'];

let before = demonstrate_scroll(scrollmenu, width, menuguide, backstrong, backnotstrong, 0);

const elemento = document.querySelector(scrollmenu);

let timer;

elemento.addEventListener('scroll', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        before = demonstrate_scroll(scrollmenu, width, menuguide, backstrong, backnotstrong, before);
    }, 50)
})