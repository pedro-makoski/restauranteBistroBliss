const hubs_of_menus_label = Array.from(document.querySelectorAll('input[name="menu-option"] + label'));
const hubs_of_menus_input = Array.from(document.querySelectorAll('input[name="menu-option"]'));
const STANDARD_POSITION = 0;
const STANDARD_POSITION_NAME = hubs_of_menus_input[STANDARD_POSITION].id;

const elements_place = document.querySelector('#menu .components');
const NAME_PARAMETER = 'menu-option'
let filter;

mudarLayout();

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
        option = 'all';
        url.searchParams.set(NAME_PARAMETER, 'all');
        window.history.replaceState({}, '', url); 
    }
    
    hubs_of_menus_input[id].checked = true;
    filtro = option === STANDARD_POSITION_NAME ? [] : [NAME_PARAMETER, option];
    return filtro;
}

function mudarLayout() {
    fetch('./scripts/menu-itens.json')
        .then(response => response.json())
        .then((json) => {
            let data = json;
            if(input.value !== '') {
                const jsonFuncs = new JsonArrFunctions(json);
                data = jsonFuncs.newJsonWithIndexes(jsonFuncs.searchIndex(input.value, ['name']));
                if(data.length === 0) {
                    elements_place.innerHTML = TEXTO_DE_SUMICO;
                    return;
                }
            }

            filter = obterFiltro();

            if(typeof filter !== "undefined" && typeof data === "object") {
                const JsonFunctions = new JsonArrFunctions(data)
                data = JsonFunctions.filterPerKeyValue(filter[0], filter[1]);
                if(data.length === 0) {
                    elements_place.innerHTML = TEXTO_DE_SUMICO;
                    return;
                }
            } 

            if(typeof data === "object") {
                const elementos = new Component(data, '<article><img src="{img}"><div><p><strong>{price}</strong></p><h3>{name}</h3><p>{description}</p></div></article>');
                elements_place.innerHTML = data.length !== 0 ? elementos.createComponents() : TEXTO_DE_SUMICO;
            }
        })
        .catch((error) => {elements_place.innerHTML = TEXTO_DE_SUMICO});
}

input.addEventListener('input', () => {
    mudarLayout();
})