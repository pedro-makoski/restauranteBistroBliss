const TEXTO_DE_SUMICO = '<p>Nothing to see here</p>'

function replace(string, key, value) {
    let before = string;
    let replaced = string.replace(key, value);

    while(replaced !== before) {
        before = replaced;
        replaced = replaced.replace(key, value); 
    }
     
    return replaced;
}


class JsonArrFunctions {
    constructor(json) {
        this.json = json;
    }

    filterPerKeyValue(key, value) {
        this.newjson = [];
        for(let i = 0; i < this.json.length; i++) {
            if(this.json[i][key] === value) {
                this.newjson.push(this.json[i]);
            }
        }

        return this.newjson;
    }

    searchIndex(valueApart, parametrospesquisaveis) {
        let idxs = [];
        if(typeof valueApart !== undefined) {
            for(let i = 0; i < this.json.length; i++) {
                let atualValues = [];
                for(let j = 0; j < parametrospesquisaveis.length; j++) {
                    let now = this.json[i][parametrospesquisaveis[j]];

                    if(typeof now === undefined) {
                        continue;
                    } else {
                        atualValues.push(now);
                    }
                }

                for(let j = 0; j < atualValues.length; j++) {
                    if(atualValues[j].toLowerCase().normalize("NFD").replace(/[\u0300-\u836f]/g, "").includes(valueApart.toLowerCase().normalize("NFD").replace(/[\u0300-\u836f]/g, ""))) {
                        idxs.push(i);
                        j = atualValues.length;
                    }
                }
            }
        } else {
            idxs = 0;
        }

        return idxs;
    }

    newJsonWithIndexes(indexes) {
        this.newjson = []

        if(indexes.length === 0) {
            return this.newjson;
        }

        for(let i = 0; i < indexes.length; i++) {
            this.newjson.push(this.json[indexes[i]])
        }

        return this.newjson;
    }

    categortyList(categoryname) {
        let list_output = [];

        for(let i = 0; i < this.json.length; i++) {
            let value = this.json[i][categoryname]
            if(typeof value !==" undefined") {
                if(!list_output.includes(value)){
                    list_output.push(value);
                }
            }
        }
        
        return list_output;
    }
}

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
            this.newcomponent = replace(this.newcomponent, `{${keys_object[i]}}`, values_object[i]);
            
        }

        return this.newcomponent;
    }

    createComponents() {
        this.res = '';

        if(this.json === 0) {
           this.res = TEXTO_DE_SUMICO;
        } else {
            for(let i = 0; i < this.json.length; i++) {
                this.res += this.substituir(this.json[i]);
            }
        }

        return this.res;
    }
}


function mudarLayout(path, textoDeSumico, inputElement, isFilter, FilterFunction, stringText, div_components) {
    fetch(path)
        .then(response => response.json())
        .then((json) => {
            let data = json;

            if(input.value !== '') {
                const jsonFuncs = new JsonArrFunctions(json);
                data = jsonFuncs.newJsonWithIndexes(jsonFuncs.searchIndex(inputElement.value, ['name']));
                if(data.length === 0) {
                    elements_place.innerHTML = textoDeSumico;
                    return;
                }
            }

            if(isFilter) {
                filter = FilterFunction();

                if(typeof filter !== "undefined" && typeof data === "object") {
                    const JsonFunctions = new JsonArrFunctions(data)
        
                    data = JsonFunctions.filterPerKeyValue(filter[0], filter[1]);
                    if(data.length === 0) {
                        elements_place.innerHTML = textoDeSumico;
                        return;
                    }
                } 
            }

            if(typeof data === "object") {
                const elementos = new Component(data, stringText);
                div_components.innerHTML = data.length !== 0 ? elementos.createComponents() : textoDeSumico;
            }
        })
        .catch((error) => {elements_place.innerHTML = textoDeSumico});
}