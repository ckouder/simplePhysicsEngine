/*
 * Vector has two components, x and y. Each is an array
 * of numbers. 
 * 
 * x = [o1, o2, o3, ...]
 * y = [o1, o2, o3, ...]
 * 
 * The order of each number gets bigger.
 */
class Vector {
    constructor(x, y) {
        this._id = 'v' + Math.random();

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

    get id() {
        return this._id;
    }

    set id(id) {
        throw Error('You are not allowed to set id to a vector');
    }

    is(id) {
        return this._id === id;
    }
}