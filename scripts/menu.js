const hubs = document.querySelector('.hub-menus .options')
let STANDARD_POSITION_NAME = '';

let hubs_of_menus_label = Array.from(document.querySelectorAll('input[name="menu-option"] + label'));
let hubs_of_menus_input = Array.from(document.querySelectorAll('input[name="menu-option"]'));
const STANDARD_POSITION = 0;

const elements_place = document.querySelector('#menu .components');
const NAME_PARAMETER = 'menu-option'
let filter;

makeHubs(NAME_PARAMETER, "menu-option-appear", '<div><input type="radio" id="{menu-option}" name="menu-option"><label for="{menu-option}">{menu-option-appear}</label></div>', hubs, 'All', 'all', 'input[name="menu-option"] + label', 'input[name="menu-option"]');

mudarLayout('./scripts/menu-itens.json', TEXTO_DE_SUMICO, true, input, true, obterFiltro,  '<article><img src="{img}"><div><p><strong>{price}</strong></p><h3>{name}</h3><p>{description}</p></div></article>', elements_place, ["name"]);

function searchForID(lista, id) {
    for(let i = 0; i < lista.length; i++) {
        if(lista[i].id === id) {
            return i;
        }
    } 

    return STANDARD_POSITION;
}

function obterFiltro() {
    let filtro;
    let url = new URL(window.location.href)
    let option = url.searchParams.get(NAME_PARAMETER);
    let id = searchForID(hubs_of_menus_input, option);
    if(option == null || typeof option === "undefined" || id === STANDARD_POSITION) {
        option = STANDARD_POSITION_NAME;
        url.searchParams.set(NAME_PARAMETER, STANDARD_POSITION_NAME);
        window.history.replaceState({}, '', url); 
    }
    
    hubs_of_menus_input[id].checked = true;
    filtro = option === STANDARD_POSITION_NAME ? [] : [NAME_PARAMETER, option];
    return filtro;
}

function ArrayToIndexArrays(object) {
    const values = Object.values(object)    
    const keys = Object.keys(object)    
    let res = [];
    for(let i = 0; i < values[0].length; i++) {
        let objeto = {};
        for(let j = 0; j < values.length; j++) {
            objeto[keys[j]] = values[j][i];
        }

        
        res.push(objeto)
    }
    
    return res;
}

function makeHubs(campo, campoappear, string, place, standart, standart2, label_place, input_place) {
    fetch('./scripts/menu-itens.json')
        .then(response => response.json())
        .then((json) => {
            const JSON = new JsonArrFunctions(json);
            
            let text_apply = {
                "menu-option": JSON.categortyList(campo),
                "menu-option-appear":JSON.categortyList(campoappear)    
            }

            text_apply = ArrayToIndexArrays(text_apply)

            const component = new Component(text_apply, string);
            const AllDesciption = {
                "menu-option": standart2,
                "menu-option-appear": standart,
            }
            const componentAll = new Component(AllDesciption, string)

            place.innerHTML += componentAll.substituir(AllDesciption);
            place.innerHTML += component.createComponents();  

            hubs_of_menus_label = Array.from(document.querySelectorAll(label_place));
            console.log(hubs_of_menus_label)
            hubs_of_menus_input = Array.from(document.querySelectorAll(input_place));
            STANDARD_POSITION_NAME = hubs_of_menus_input[STANDARD_POSITION].id;
            checkControl()

            return json;
        })
       .catch((error) => console.log(error));
}   

input.addEventListener('input', () => {
    mudarLayout('./scripts/menu-itens.json', TEXTO_DE_SUMICO, true, input, true, obterFiltro,  '<article><img src="{img}"><div><p><strong>{price}</strong></p><h3>{name}</h3><p>{description}</p></div></article>', elements_place, ["name"]);
})