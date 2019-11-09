class UniqueExistence {
    constructor(name) {
        this._id = name + Math.random();
    }

    get id() {
        return this._id;
    }

    set id(id) {
        throw Error('You are not allowed to set id to a' + this.name);
    }

    is(id) {
        return this._id === id;
    }
}