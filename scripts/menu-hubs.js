function checkControl() {
    let total_not_checked = 0;

    for(let i = 0; i < hubs_of_menus_input.length; i++) {
        if(hubs_of_menus_input[i].checked) {
            let url = new URL(window.location.href)
            url.searchParams.set(NAME_PARAMETER, hubs_of_menus_input[i].id);
            window.history.replaceState({}, '', url); 
            mudarLayout('./scripts/menu-itens.json', TEXTO_DE_SUMICO, input, true, obterFiltro,  '<article><img src="{img}"><div><p><strong>{price}</strong></p><h3>{name}</h3><p>{description}</p></div></article>', elements_place);
        } else {
            total_not_checked++;
            if(total_not_checked === hubs_of_menus_label.length) {
                let url = new URL(window.location.href)
                let parametro = url.searchParams.get(NAME_PARAMETER);
                if(typeof parametro === "undefined") {
                    url.searchParams.set(NAME_PARAMETER, hubs_of_menus_input[STANDARD_POSITION].id);
                    hubs_of_menus_input[STANDARD_POSITION].checked = true;

                    window.history.replaceState({}, '', url); 
                } 
                mudarLayout('./scripts/menu-itens.json', TEXTO_DE_SUMICO, input, true, obterFiltro,  '<article><img src="{img}"><div><p><strong>{price}</strong></p><h3>{name}</h3><p>{description}</p></div></article>', elements_place);
            } 
        }

        hubs_of_menus_label[i].addEventListener('click', () => {
            let url = new URL(window.location.href)
            url.searchParams.set(NAME_PARAMETER, hubs_of_menus_input[i].id);

            window.history.replaceState({}, '', url);
            mudarLayout('./scripts/menu-itens.json', TEXTO_DE_SUMICO, input, true, obterFiltro,  '<article><img src="{img}"><div><p><strong>{price}</strong></p><h3>{name}</h3><p>{description}</p></div></article>', elements_place);
        })
    }
}
