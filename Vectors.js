class Vectors extends UniqueExistences {
    constructor(vectors) {
        super(Vector, vectors);
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