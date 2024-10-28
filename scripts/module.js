const MAX_WIDTH_WITH_HAMBURGUER = 1268;

class HamburguerButton {
    constructor(menu) {
        this.menu = document.querySelector(menu)
    }

    open() {
        if(this.menu.style.display != 'flex') {
            this.menu.style.display = 'flex';  
        }
    }

    close() {
        if(this.menu.style.display != 'none') {
            this.menu.style.display = 'none';
        }
    }
}

function openIdentify(hamburguer) {
    const hamburguer_button = document.querySelector(hamburguer);
    const hamburgerButton = new HamburguerButton('nav ul');

    hamburguer_button.addEventListener('click', (e) => {
        if(window.innerWidth < MAX_WIDTH_WITH_HAMBURGUER) hamburgerButton.open();
    })

    window.addEventListener('resize', () => {
        if(window.innerWidth >= 1164) {
            hamburgerButton.open();
        } else {
            hamburgerButton.close();
        }
    })
}

function closeIdentify(closeButton) {
    const hamburguer_button = document.querySelector('.hamburguer');
    const close_button = document.querySelector(closeButton);
    const hamburgerButton = new HamburguerButton('nav ul');
    const menu = document.querySelector('nav ul')

    close_button.addEventListener('click', () => {
        if(window.innerWidth < MAX_WIDTH_WITH_HAMBURGUER) hamburgerButton.close();
    })

    document.addEventListener('click', (e) => {
        if(e.target != menu && !hamburguer_button.contains(e.target)) {
            if(window.innerWidth < MAX_WIDTH_WITH_HAMBURGUER) hamburgerButton.close();
        }
    })
} 