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

const jsons = {};

function baixarJson(path, errorFunction) {
    return new Promise((resolve, reject) => {
        const keys = Object.keys(jsons);
        if(!keys.includes(path)) {
            fetch(path)
                .then(response => response.json())
                .then((json) => {
                    jsons[path] = json; 
                    resolve(jsons[path]);
                })
                .catch((error) => {
                    errorFunction();
                    reject(error);
                });
        } else {
            resolve(jsons[path]);
        }
    })
}

function takeOnlySomeElementsRandom(data, actualNotRepeat, actualNotRepeatWhere, quantSlice) {
    const id = data.indexOf(data.find(elemento => elemento[actualNotRepeatWhere] === actualNotRepeat));
    const randomPositons = [];
    let randomValue;

    for(let i = 0; i < quantSlice; i++) {
        try {
            function generateRandomValue() {
                let value = Math.floor(Math.random() * data.length);
                if(value === id || randomPositons.includes(value)) {
                    value = generateRandomValue();
                }
    
                return value;
            }
    
            randomValue = generateRandomValue();
        } catch(erro) {
            randomValue = Math.floor(Math.random() * data.length);
        }

        randomPositons.push(randomValue);
    }

    let res = [];
    for(let i = 0; i < randomPositons.length; i++) {
        res.push(data[randomPositons[i]]);
    }

    return res; 
}

async function mudarLayout(path, textoDeSumico, isInputable, inputElement, isFilter, FilterFunction, stringText, div_components, inputSearchItens, isSliced, quantSlice, prefixo, prefixoElement, actualNotRepeat, actualNotRepeatWhere) {
    let canDo = true;
    await baixarJson(path, () => {div_components.innerHTML = textoDeSumico; canDo = false});
    if(canDo) {
        let data = jsons[path];
        if(isSliced) {
            if(typeof actualNotRepeat === "undefined") {
                data = data.slice(0, quantSlice);
            } else {
                data = takeOnlySomeElementsRandom(data, actualNotRepeat, actualNotRepeatWhere, quantSlice)
            }
        }

        if(isInputable) {
            if(input.value !== '') {
                const jsonFuncs = new JsonArrFunctions(data);
                data = jsonFuncs.newJsonWithIndexes(jsonFuncs.searchIndex(inputElement.value, inputSearchItens));
                if(data.length === 0) {
                    div_components.innerHTML = textoDeSumico;
                    return;
                }
            }
        }
    
        if(isFilter) {
            let filter = FilterFunction();
    
            if(typeof filter !== "undefined" && typeof data === "object") {
                const JsonFunctions = new JsonArrFunctions(data)
    
                data = JsonFunctions.filterPerKeyValue(filter[0], filter[1]);
                if(data.length === 0) {
                    div_components.innerHTML = textoDeSumico;
                    return;
                }
            } 
        }
    
        if(typeof prefixo !== "undefined" && typeof prefixoElement !== "undefined") {
            for(let i = 0; i < data.length; i++) {
                for(let j = 0; j < prefixoElement.length; j++) {
                    if(typeof data[i][prefixoElement[j]] !== "undefined") {
                        data[i][prefixoElement[j]] = prefixo+data[i][prefixoElement[j]];
                    }
                }
            }
        }

        if(typeof data === "object") {
            const elementos = new Component(data, stringText);
            div_components.innerHTML = data.length !== 0 ? elementos.createComponents() : textoDeSumico;
        }
    }
}