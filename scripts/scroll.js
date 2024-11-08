let [menuguidelocal, scrolls, backstrong, backnotstrong] = ['.guide-balls', '.scroll', 'var(--cor-contraste)', 'var(--cor-contraste-do-contraste)'];

const configs = []

const elementos = Array.from(document.querySelectorAll(scrolls));

for(let i = 0; i < elementos.length; i++) {
    if(typeof configs[i] != undefined) {   
        configs[i] = {
            "width":elementos[i].getBoundingClientRect().width,
            "before": 0,
            "pos": 1
        };
    }

    const pai = elementos[i].parentElement;
    let menuguide = pai.querySelector(menuguidelocal);
    let change;

    configs[i]["width"] = elementos[i].getBoundingClientRect().width;

    const button_left = pai.querySelector('.button-move-scroll .toleft');
    const button_right = pai.querySelector('.button-move-scroll .toright');

    [configs[i]["before"], configs[i]["pos"], change] = demonstrate_scroll(elementos[i], configs[i]["width"], menuguide, backstrong, backnotstrong, configs[i]["pos"]);

    let timer;

    window.addEventListener('resize', () => {
        configs[i]["width"] = elementos[i].getBoundingClientRect().width;
        if(window.innerWidth > MAX_WIDTH_WITH_HAMBURGUER) {
            change = goToActualPos(elementos[i], configs[i]["width"], 0);
        } else {
            change = goToActualPos(elementos[i], configs[i]["width"], configs[i]["pos"]);
        }

        if(change === -1) {
            button_left.style.display = 'none';
        } else if(change === 1) {
            button_right.style.display = 'none';
        } else {
            button_right.style.display = 'block';
            button_left.style.display = 'block';
        }
    });

    elementos[i].addEventListener('scroll', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            [configs[i]["before"], configs[i]["pos"]] = demonstrate_scroll(elementos[i], configs[i]["width"], menuguide, backstrong, backnotstrong, configs[i]["pos"]);
        }, 50)
        
        change = see_arrows(elementos[i], configs[i]["width"]);
        
        if(change === -1) {
            button_left.style.display = 'none';
        } else if(change === 1) {
            button_right.style.display = 'none';
        } else {
            button_right.style.display = 'block';
            button_left.style.display = 'block';
        }
    });

    button_left.style.display = 'none';

    button_right.addEventListener('click', () => {
        change = goToActualPos(elementos[i], configs[i]["width"], configs[i]["pos"]+1);
        if(change === 1) {
            button_right.style.display = 'none';
        } else {
            button_right.style.display = 'block';
            button_left.style.display = 'block';
        }
    });

    button_left.addEventListener('click', () => {
        change = goToActualPos(elementos[i], configs[i]["width"], configs[i]["pos"]-1);
        if(change === -1) {
            button_left.style.display = 'none';
        } else {
            button_left.style.display = 'block';
            button_right.style.display = 'block';
        }
    });
}