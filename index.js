const canvas = document.getElementById("playground");
const playground = canvas.getContext('2d');

class Shape {
    constructor(s) {
        this.appearance = s.appearance;
        this.type = s.type;
    }

    static get shapeList() {
        return {
            'circle': Circle,
            'rect': Rect,
        }
    }
    
    static create(s) {
        return new Shape.shapeList[s.type](s);
    }
}

class Circle extends Shape {
    constructor(s) {
        super(s);
        this.radius = s.radius;
    }
}

class Rect extends Shape {
    constructor(s) {
        super(s);
        this.height = s.height;
        this.width = s.width;
    }
}

class Matter {
    constructor(w, s, i = {
        x: [[0, 0, 0]],
        y: [[0, 0, 0]]
    }) {
        this.weight = w;
        this.shape = s instanceof Shape ? s : new Shape(s);
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

    get interactions() {
        return this._interactions;
    }

    set interactions(i) {
        if (!i.hasOwnProperty('x') || !i.hasOwnProperty('y')
            || !(i.x instanceof Array) || !(i.y instanceof Array)) {
            throw TypeError('Interactions must have [x: Array<number>] and [y: Array<number>] property');
        }
        this._interactions = combine(i);
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

function draw(ctx, type, data, t) {
    ctx.beginPath();

    ctx.fillStyle = data.shape.appearance.fillStyle;
    ctx.strokeStyle = data.shape.appearance.strokeStyle;
    ctx.lineWidth = data.shape.appearance.lineWidth;

    let x = displacement(data.interactions.x, t);
    let y = displacement(data.interactions.y, t);

    switch (type) {

        case 'circle':
            ctx.arc(x, y, data.shape.radius, 0, Math.PI * 2);
            // console.log(`render circle at ${x}, ${y}`);
            break;

        case 'rect':
            ctx.rect(x, y, data.shape.width, data.shape.height);
            // console.log(`render rect at ${x}, ${y}`);
            break;
    }
    ctx.fill();
    ctx.stroke();

    ctx.closePath();
}

function combine(d) {
    if (!(d instanceof Array) || !(d[0] instanceof Array)) {
        return d;
    }
    return d.reduce((a, c) => {
        for (let i = 0; i < c.length; i++) {
            if (a[i] === undefined) {
                a[i] = c[i];
            } else {
                a[i] += c[i];
            }
        }
        return a;
    });
}

function displacement(interaction, t) {
    if (interaction instanceof Array && typeof(interaction[0]) === 'number') {
        var r = 0;
        for (let i = 0; i < interaction.length; i++) {
            if (i === 0) {
                r += interaction[i];
            } else {
                // console.log(r);
                r += interaction[i] * (1/i) * t ** i;
            }
        }
        return r;
    }

    var k = 0;
    for (let e of interaction) {
        k += displacement(e, t);
    }
    return k;
}

let t = 0;

function render(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let matter of matters) {
        draw(ctx, matter.shape.type, matter, t / 100);
    }
    t += 1;
}

const matters = [
    new Matter(10, Shape.create({
        type: 'circle',
        radius: 10,
        appearance: {
            strokeStyle: 'black',
            fillStyle: 'black',
            lineWidth: 3,
        }
    }), {
        x: [[500, 0, 0]],
        y: [[300, 0, 0]],
    }),
];

setInterval(() => {
    render(playground);
}, 1);