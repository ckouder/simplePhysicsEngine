class Matter {
    constructor(w, s, i) {
        this.weight = w;
        this.shape = s;
        this.interactions = i;
    }
    
    static get G() {
        return 667;
    }

    get weight() {
        return this._weight;
    }

    set weight(w) {
        if (typeof(w) !== "number") {
            throw TypeError('Expected [number] found' + typeof(w));

        } else if (w < 0) {
            throw RangeError('Weight must be >= 0');
        }
        this._weight = w;
    }

    get shape() {
        return this._shape;
    }

    set shape(s) {
        this._shape = s instanceof Shape ? s : new Shape(s);
    }

    get interactions() {
        return this._interactions;
    }

    set interactions(i) {
        this._interactions = i instanceof Vectors ? i : new Vectors(i);
    }

    get gFieldFrom() {
        return function(x, y) {
            return {
                x: [0, 0, Matter.G * this.weight / (x ** 2)],
                y: [0, 0, Matter.G * this.weight / (y ** 2)],
            }
        }
    }
}