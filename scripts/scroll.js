let [menuguide, scrollmenu, width, backstrong, backnotstrong, pos] = ['.menu-guide', '.scroll_menu', window.innerWidth, 'var(--cor-contraste)', 'var(--cor-contraste-do-contraste)', 1];

const button_left = document.querySelector('.button-move-scroll .toleft');
const button_right = document.querySelector('.button-move-scroll .toright');

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

button_left.style.display = 'none';

let change;

button_right.addEventListener('click', () => {
    change = goToActualPos(scrollmenu, width, pos+1);
    if(change === 1) {
        button_right.style.display = 'none';
    } else {
        button_right.style.display = 'block';
        button_left.style.display = 'block';
    }
});

button_left.addEventListener('click', () => {
    change = goToActualPos(scrollmenu, width, pos-1);
    if(change === -1) {
        button_left.style.display = 'none';
    } else {
        button_left.style.display = 'block';
        button_right.style.display = 'block';
    }
});