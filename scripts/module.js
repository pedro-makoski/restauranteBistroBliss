const MAX_WIDTH_WITH_HAMBURGUER = 1040;

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

function openIdentify(hamburguer, local) {
    const hamburguer_button = document.querySelector(hamburguer, local);
    const hamburgerButton = new HamburguerButton(local);

    hamburguer_button.addEventListener('click', (e) => {
        if(window.innerWidth < MAX_WIDTH_WITH_HAMBURGUER) hamburgerButton.open();
    })

    window.addEventListener('resize', () => {
        if(window.innerWidth >= MAX_WIDTH_WITH_HAMBURGUER) {
            hamburgerButton.open();
        } else {
            hamburgerButton.close();
        }
    })
}

function closeIdentify(closeButton, button, local) {
    const hamburguer_button = document.querySelector(button);
    const close_button = document.querySelector(closeButton);
    const hamburgerButton = new HamburguerButton(local);
    const menu = document.querySelector(local)

    close_button.addEventListener('click', () => {
        if(window.innerWidth < MAX_WIDTH_WITH_HAMBURGUER) hamburgerButton.close();
    })

    document.addEventListener('click', (e) => {
        if(e.target != menu && !hamburguer_button.contains(e.target)) {
            if(window.innerWidth < MAX_WIDTH_WITH_HAMBURGUER) hamburgerButton.close();
        }
    })
} 

class ScrollFunctions {
    constructor(scroll_container, scroll_width) {
        this.scroll_container = document.querySelector(scroll_container);
        this.scroll_width = scroll_width;
        this.length = this.scroll_container.children.length
        this.scroll_size = this.length*this.scroll_width
    }

    scroll_left() {
        this.scroll_container.scrollBy(this.scroll_width, 0);
    }

    show_status() {
        return Math.round(((this.scroll_container.scrollLeft+this.scroll_width)/this.scroll_width)); 
    }

    demonstrate_status(place, color, noncolor) {
        let pos = this.show_status()-1;
        this.place_satus = document.querySelector(place);
        this.place_satus_childrens = this.place_satus.children; 
        this.place_satus_childrens[pos].style.backgroundColor = color;

        for(let i = 0; i < this.place_satus_childrens.length; i++) {
            if(i != pos) {
                this.place_satus_childrens[i].style.backgroundColor = noncolor;
            }
        } 
    }

    goTo(pos) {
        this.scroll_container.scrollTo(
            {
                left: (pos-1)*this.scroll_width,
                behavior: "smooth"
            }
        ) 
    }

    goToNew(before_scroll) {
        if(this.scroll_container.scrollLeft != before_scroll) {
            this.goTo(this.show_status())
        } 
    }
}

function demonstrate_scroll(element, width, guide, maincolor, othercolor, before) {
    const scrollFunctions = new ScrollFunctions(element, width);
    scrollFunctions.demonstrate_status(guide, maincolor, othercolor);
    scrollFunctions.goToNew(before);
    return [scrollFunctions.scroll_container.scrollLeft, scrollFunctions.show_status()];
}

function goToActualPos(element, width, pos) {
    const scrollFunctions = new ScrollFunctions(element, width);
    scrollFunctions.goTo(pos)
    if(pos == 1) {
        return -1;
    } else if(pos > scrollFunctions.length-1) {
        return 1;
    } else {
        return 0; 
    }
}