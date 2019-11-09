class UniqueExistences {
    constructor(factoryClass, value) {
        this.name = factoryClass.name.toLowerCase() + 's';
        this.factoryClass = factoryClass;
        this[this.name] = value;
        this['get' + factoryClass.name + 'IndexById'] = this.getIndex.bind(this);
        this['get' + factoryClass.name + 'ById'] = this.get.bind(this);
    }

    get [name]() {
        return this[`_${this.name}`];
    }

    set [name](values) {
        for (let i = 0; i < values.length; i++) {
            values[i] = values[i] instanceof this.factoryClass
                ? values[i] : new this.factoryClass(values[i]);
        }
        this[`_${this.name}`] = values;
    }

    add(value) {
        let v = value instanceof this.factoryClass ? v : new this.factoryClass(value);
        this[name].push(v);

        return v.id;
    }

    remove(id) {
        let i = this['get' + this.factoryClass.name + 'IndexById'](id);
        if (i !== -1) {
            this[this.name].splice(i, 1);
            return true;
        }
        return false;
    }

    getIndex(id) {
        for (let v of this[this.name]) {
            if (v.is(id)) {
                return this[this.name].indexOf(v);
            }
        }

        return -1;
    }

    get(id) {
        for (let v of this[this.name]) {
            if (v.is(id)) {
                return v;
            }
        }

        return undefined;
    }
}