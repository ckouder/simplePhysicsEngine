class Vector extends UniqueExistence {
    constructor(x, y) {
        super('vector');

        if (arguments.length === 1) {
            this.x = arguments[0].x;
            this.y = arguments[0].y;

        } else if (arguments.length === 2) {
            this.x = x;
            this.y = y;   

        } else {
            throw Error('invalid argument length');
        }
    }

    get x() {
        return this._x;
    }

    set x(x) {
        if (!(x instanceof Array)) {
            throw TypeError('Vector must be an Array');
        }

        this._x = x;
    }

    get y() {
        return this._y;
    }

    set y(y) {
        if (!(y instanceof Array)) {
            throw TypeError('Vector must be an Array');
        }

        this._y = y;
    }
}