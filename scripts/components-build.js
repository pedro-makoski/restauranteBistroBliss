class Component {
    constructor(json, componentstring) {
        this.componentstring = componentstring;
        this.json = json;
    }

    substituir(values) {
        this.newcomponent = this.componentstring
        const keys_object = Object.keys(values);
        const values_object = Object.values(values);

        for(let i = 0; i < keys_object.length; i++) {
            this.newcomponent = this.newcomponent.replace(`{${keys_object[i]}}`, values_object[i]);
            
        }

        return this.newcomponent;
    }

    createComponent() {
        this.res = '';

        for(let i = 0; i < this.json.length; i++) {
            this.res += this.substituir(this.json[i]);
        }

        return this.res;
    }
}

const json = [
    {
        "name": "Fried Eggs",
        "price": "R$ 9.99",
        "description": "Made with eggs, lettuce, salt, oil and other ingredients.",
        "type": "breakfast",
        "img": "imgs/menuimgs/friedeggs.png"
    },
    {
        "name": "Hawaiian Pizza",
        "price": "R$ 15.99",
        "description": "Made with eggs, lettuce, salt, oil and other ingredients.",
        "type": "main-dishes",
        "img": "imgs/menuimgs/pizza.png"
    },
    {
        "name": "Martinez Cocktail",
        "price": "R$ 7.25",
        "description": "Made with eggs, lettuce, salt, oil and other ingredients.",
        "type": "drinks",
        "img": "imgs/menuimgs/cocktail.png"
    },
    {
        "name": "Butterscotch Cake",
        "price": "R$ 20.99",
        "description": "Made with eggs, lettuce, salt, oil and other ingredients.",
        "type": "desserts",
        "img": "imgs/menuimgs/cake.png"
    },
    {
        "name": "Mint Lemonade",
        "price": "R$ 5.89",
        "description": "Made with eggs, lettuce, salt, oil and other ingredients.",
        "type": "drinks",
        "img": "imgs/menuimgs/mint.png"
    },
    {
        "name": "Chocolate Icecream",
        "price": "R$ 18.05",
        "description": "Made with eggs, lettuce, salt, oil and other ingredients.",
        "type": "desserts",
        "img": "imgs/menuimgs/chocolate.png"
    },
    {
        "name": "Cheese Burguer",
        "price": "R$ 12.55",
        "description": "Made with eggs, lettuce, salt, oil and other ingredients.",
        "type": "main-dishes",
        "img": "imgs/menuimgs/hamburguer.png"
    },
    {
        "name": "Classic Wuffles",
        "price": "R$ 12.99",
        "description": "Made with eggs, lettuce, salt, oil and other ingredients.",
        "type": "breakfast",
        "img": "imgs/menuimgs/wuffles.png"
    }
];

const elementos = new Component(json, '<article><img src="{img}"><div><p><strong>{price}</strong></p><h3>{name}</h3><p>{description}</p></div></article>');
const elements_place = document.querySelector('#menu .components');
elements_place.innerHTML = elementos.createComponent()