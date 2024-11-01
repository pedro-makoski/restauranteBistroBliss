let [menuguide, scrollmenu, width, backstrong, backnotstrong, pos] = ['.menu-guide', '.scroll_menu', window.innerWidth, 'var(--cor-contraste)', 'var(--cor-contraste-do-contraste)', 0];

let before = demonstrate_scroll(scrollmenu, width, menuguide, backstrong, backnotstrong, pos);

const elemento = document.querySelector(scrollmenu);

let timer;

window.addEventListener('resize', () => {
    width = window.innerWidth;
    goToActualPos(scrollmenu, width, pos);
});

elemento.addEventListener('scroll', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        [before, pos] = demonstrate_scroll(scrollmenu, width, menuguide, backstrong, backnotstrong, before);
    }, 50)
});