let total_not_checked = 0;

for(let i = 0; i < hubs_of_menus_input.length; i++) {
    if(hubs_of_menus_input[i].checked) {
        let url = new URL(window.location.href)
        url.searchParams.set(NAME_PARAMETER, hubs_of_menus_input[i].id);
        window.history.replaceState({}, '', url); 
        mudarLayout();
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
            mudarLayout();
        } 
    }

    hubs_of_menus_label[i].addEventListener('click', () => {
        let url = new URL(window.location.href)
        url.searchParams.set(NAME_PARAMETER, hubs_of_menus_input[i].id);

        window.history.replaceState({}, '', url);
        mudarLayout();
    })
}

