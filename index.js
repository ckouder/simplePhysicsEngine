const canvas = document.getElementById("playground");
const playground = canvas.getContext('2d');

function draw(ctx, matter, t) {
    ctx.beginPath();

    ctx.fillStyle = matter.shape.appearance.fillStyle;
    ctx.strokeStyle = matter.shape.appearance.strokeStyle;
    ctx.lineWidth = matter.shape.appearance.lineWidth;
    
    switch (matter.shape.type) {

        case 'circle':
            ctx.arc(
                matter.interactions.getEffect(t).x, 
                matter.interactions.getEffect(t).y,
                matter.shape.radius, 
                0, Math.PI * 2);
            break;

        case 'rect':
            ctx.rect(
                matter.interactions.getEffect(t).x, 
                matter.interactions.getEffect(t).y, 
                matter.shape.width, 
                matter.shape.height);
            break;
    }
    ctx.fill();
    ctx.stroke();

    ctx.closePath();
}

let t = 0;

function render(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let matter of matters) {
        draw(ctx, matter, t / 100);
    }
    t += 1;
}

const matters = [
    new Matter(10, Shape.create({
        type: 'circle',
        radius: 10,
    }), [
        {
            x: [100, 0, 0],
            y: [100, 0, 0],
        },
    ]),
    new Matter(10, Shape.create({
        type: 'circle',
        radius: 10,
    }), [
        {
            x: [500, 0, 0],
            y: [100, 0, 0],
        },
    ]),
];

setInterval(() => {
    render(playground);
}, 1);