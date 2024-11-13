const TEXTO_DE_SUMICO = '<p>Nothing to see here</p>'

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

        if(this.newjson.length === 0) {
            return 0;
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
                    if(atualValues[j].toLowerCase().includes(valueApart.toLowerCase())) {
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
        console.log(indexes)

        if(indexes === 0) {
            return 0;
        }

        for(let i = 0; i < indexes.length; i++) {
            this.newjson.push(this.json[indexes[i]])
        }

        return this.newjson;
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
            this.newcomponent = this.newcomponent.replace(`{${keys_object[i]}}`, values_object[i]);
            
        }

        return this.newcomponent;
    }

    createComponents(filter) {
        this.res = '';

        if(this.json === 0) {

           res = TEXTO_DE_SUMICO;
        } else {
            if(typeof filter !== "undefined") {
                const JsonFunctions = new JsonArrFunctions(this.json)
                this.jsonFiltered = JsonFunctions.filterPerKeyValue(filter[0], filter[1]);
                if(this.jsonFiltered === 0) {
                    res = TEXTO_DE_SUMICO;
                }
            } else {
                this.jsonFiltered = this.json;
            }
    
            for(let i = 0; i < this.jsonFiltered.length; i++) {
                this.res += this.substituir(this.jsonFiltered[i]);
            }
        }

        return this.res;
    }
}