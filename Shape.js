const DEFAULT_APPEARANCE = {
    fillStyle: 'black',
    strokeStyle: 'black',
    lineWidth: 3,
};

class Shape {
    constructor(s) {
        this.appearance = s.appearance || DEFAULT_APPEARANCE;
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