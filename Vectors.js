class Vectors {
    constructor(vectors) {
        this.vectors = vectors;
    }

    get vectors() {
        return this._vectors;
    }

    set vectors(vectors) {
        for (let i = 0; i < vectors.length; i++) {
            vectors[i] = vectors[i] instanceof Vector 
                ? vectors[i] : new Vector(vectors[i]);
        }
        this._vectors = vectors;
    }

    get net() {
        let x = [];
        let y = [];
        for (let vector of this.vectors) {
            x = this.combine(x, vector.x);
            y = this.combine(y, vector.y);
        }
        return {x, y};
    }

    getVectorById(id) {
        for (let vector of this.vectors) {
            if (vector.is(id)) {
                return vector;
            }
        }

        return undefined;
    }

    getEffect(t) {
        return {
            x: this.integrate(this.net.x, t),
            y: this.integrate(this.net.y, t),
        };
    }

    combine(arrary1, array2) {
        let a = [...arrary1];
        for (let i = 0; i < array2.length; i++) {
            
            if (a[i] === undefined) {
                a[i] = array2[i];

            } else {
                a[i] += array2[i];
            }
        }

        return a;
    }

    integrate(array, t) {
        let r = 0;

        for (let i = 0; i < array.length; i++) {
            if (i == 0) {
                r += array[i];

            }else {
                r += array[i] * (1/i) * t ** i;
            }
        }
        return r;
    }
}