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
}

function obterFiltro() {
    let filtro;
    let url = new URL(window.location.href)
    let option = url.searchParams.get(NAME_PARAMETER);
    if(option == null) {
        option = 'all';
        url.searchParams.set(NAME_PARAMETER, 'all');
        window.history.replaceState({}, '', url); 
    }

    hubs_of_menus_input[searchForID(hubs_of_menus_input, option)].checked = true;
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
                console.log(data)
                if(data === 0) {
                    data = TEXTO_DE_SUMICO;
                }
            }
            
            filter = obterFiltro();
            const elementos = new Component(data, '<article><img src="{img}"><div><p><strong>{price}</strong></p><h3>{name}</h3><p>{description}</p></div></article>');
            elements_place.innerHTML = json.length !== 0 ? elementos.createComponents(filter) : TEXTO_DE_SUMICO;
        })
        .catch((error) => {elements_place.innerHTML = TEXTO_DE_SUMICO});

}

input.addEventListener('input', () => {
    mudarLayout();
})