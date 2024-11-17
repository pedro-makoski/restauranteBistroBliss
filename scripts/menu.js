const hubs = document.querySelector('.hub-menus .options')
let STANDARD_POSITION_NAME = '';

let hubs_of_menus_label = Array.from(document.querySelectorAll('input[name="menu-option"] + label'));
let hubs_of_menus_input = Array.from(document.querySelectorAll('input[name="menu-option"]'));
const STANDARD_POSITION = 0;

const elements_place = document.querySelector('#menu .components');
const NAME_PARAMETER = 'menu-option'
let filter;

makeHubs(NAME_PARAMETER, '<div><input type="radio" id="{menu-option}" name="menu-option"><label for="{menu-option}">{menu-option-appear}</label></div>', hubs, NAME_PARAMETER, 'All', 'input[name="menu-option"] + label', 'input[name="menu-option"]');

mudarLayout('./scripts/menu-itens.json', TEXTO_DE_SUMICO, input, true, obterFiltro,  '<article><img src="{img}"><div><p><strong>{price}</strong></p><h3>{name}</h3><p>{description}</p></div></article>', elements_place);

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

function replace(string, key, value) {
    let before = string;
    let replaced = string.replace(key, value);

    while(replaced !== before) {
        before = replaced;
        replaced = replaced.replace(key, value); 
    }
     
    return replaced;
}

function criarHubs(data, hubname, string, hubs_div, substituir_values, standart) {
    const JSON = new JsonArrFunctions(data);
    let text_apply = {
        "hubs_name": JSON.categortyList(hubname),
        "hubs_name_appear":JSON.categortyList("menu-option-appear")    
    }

    const text_apply_values = Object.values(text_apply)
    const text_apply_keys = Object.keys(text_apply)

    let res = '';

    let value = string;
    for(let j = 0; j < substituir_values.length; j++) {
        value = replace(value, `{${substituir_values[j]}}`, `${standart}`);
    }
    res += value;

    console.log(text_apply["hubs_name"])
    for(let i = 0; i < text_apply["hubs_name"].length; i++) {
        value = string;
        for(let j = 0; j < substituir_values.length; j++) {
            value = replace(value, `{${substituir_values[j]}}`, `${text_apply[text_apply_keys[j]][i]}`);
        }

        res += value;
    }


    hubs_div.innerHTML += res; 
}

function makeHubs(namepameter, string, place, searchOnListFor, standart, label_place, input_place) {
    fetch('./scripts/menu-itens.json')
        .then(response => response.json())
        .then((json) => {
            criarHubs(json, namepameter, string, place, [searchOnListFor, "menu-option-appear"], standart);
            

            hubs_of_menus_label = Array.from(document.querySelectorAll(label_place));
            hubs_of_menus_input = Array.from(document.querySelectorAll(input_place));
            STANDARD_POSITION_NAME = hubs_of_menus_input[STANDARD_POSITION].id;
            checkControl()

            return json;
        })
       // .catch((error) => console.log(error));
}   

input.addEventListener('input', () => {
    mudarLayout('./scripts/menu-itens.json', TEXTO_DE_SUMICO, input, true, obterFiltro,  '<article><img src="{img}"><div><p><strong>{price}</strong></p><h3>{name}</h3><p>{description}</p></div></article>', elements_place);
})