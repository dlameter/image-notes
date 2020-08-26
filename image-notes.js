class SceneImage {
    constructor(image, x, y) {
        this.img = image;
        this.x = x;
        this.y = y;
    }

    setImg(image) {
        if (this.img) {
            this.img.remove();
        }

        this.img = image;
    }

    render(p) {
        if (this.img) {
            p.image(this.img, this.x, this.y);
        }
    }
}

const s = ( p ) => {
    let objects = [];
    let x;
    let y;
    let scale;

    p.setup = function() {
        p.createCanvas(400, 400);
        x = 0;
        y = 0;
        scale = 1;
    };

    p.draw = function() {
        p.background(220);
        p.translate(x, y);
        p.scale(scale);
        objects.forEach((object) => {object.render(p)});
    };

    p.keyPressed = function() {
        if (p.keyCode === p.LEFT_ARROW) {
            x -= 10;
        }
        if (p.keyCode === p.RIGHT_ARROW) {
            x += 10;
        }
        if (p.keyCode === p.UP_ARROW) {
            y -= 10;
        }
        if (p.keyCode === p.DOWN_ARROW) {
            y += 10;
        }
    }

    p.mouseWheel = function(event) {
        p.print(event.delta);
        if (event.delta > 0) {
            scale *= 2;
        }
        else {
            scale /= 2;
        }
    }

    p.add = function(object) {
        objects.push(object);
    };
};

let myp5 = new p5(s);

var bgImage = new SceneImage(null, 0, 0);
myp5.add(bgImage);

function fileToDateURL(p, file, callback) {
    let reader = new FileReader();

    reader.addEventListener("load", function () {
        callback(reader.result);
    });

    reader.readAsDataURL(file);
}

function fileChanged(event) {
    let file = event.target.files[0];
    fileToDateURL(myp5, file, (fileData) => {
        bgImage.setImg(myp5.createImg(fileData, ''));
        bgImage.img.hide();
    });
}

window.onload = (event) => {
    let fileIn = document.getElementById("file-in");
    fileIn.addEventListener('change', (event) => fileChanged(event));
}

