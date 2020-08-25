const s = ( p ) => {

    p.setup = function() {
        p.createCanvas(400, 400);
    };

    p.draw = function() {
        p.background(220);
    };
};

let myp5 = new p5(s);
