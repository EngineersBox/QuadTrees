let C_WIDTH;
let C_HEIGHT;
let POINT_COUNT;

let canvas;
let quad;

function initConst() {
    C_WIDTH = parseFloat(Utils.getElem("c_width").value);
    C_HEIGHT = parseFloat(Utils.getElem("c_height").value);
    POINT_COUNT = parseInt(Utils.getElem("point_count").value);
}

function setup() {
    initConst();
    canvas = createCanvas(C_WIDTH, C_HEIGHT);
    canvas.parent = "sketch_view";
    
    quad = new QuadTree(1, new AABB(createVector(C_WIDTH / 2, C_HEIGHT / 2), C_WIDTH / 2));

    for (let i = 0; i < POINT_COUNT; i++) {
        quad.insert(createVector(Math.random() * C_WIDTH, Math.random() * C_HEIGHT));
    }
}

function draw() {
    quad.show();
}