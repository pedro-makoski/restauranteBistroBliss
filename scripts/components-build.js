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

        if(indexes.length === 0) {
            return this.newjson;
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