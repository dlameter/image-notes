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

    p.setup = function() {
        p.createCanvas(400, 400);
    };

    p.draw = function() {
        p.background(220);
        objects.forEach((object) => {object.render(p)});
    };

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

