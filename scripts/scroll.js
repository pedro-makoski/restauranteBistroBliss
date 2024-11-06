let [menuguide, scrollmenu, backstrong, backnotstrong, pos] = ['.menu-guide', '.scroll_menu', 'var(--cor-contraste)', 'var(--cor-contraste-do-contraste)', 1];
const elemento = document.querySelector(scrollmenu);

let width = elemento.getBoundingClientRect().width;

let before; 

const button_left = document.querySelector('.button-move-scroll .toleft');
const button_right = document.querySelector('.button-move-scroll .toright');

[before, pos] = demonstrate_scroll(scrollmenu, width, menuguide, backstrong, backnotstrong, pos);

let timer;

window.addEventListener('resize', () => {
    width = elemento.getBoundingClientRect().width;
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