var FileSaver = require('./node_modules/file-saver/dist/FileSaver.min.js');
var map;
var bgImg;

function setBgImg(url, onload) {
    if (bgImg) {
        removeBgImg();
    }
    bgImg = createImg(url, onload);
}

function removeBgImg() {
    bgImg.parentNode.removeChild(bgImg);
    bgImg = undefined;
}

function createImg(url, onload) {
    var body = document.body;

    bgImg = new Image();
    bgImg.onload = onload;
    bgImg.src = url;
    bgImg.style.display = "none";

    body.appendChild(bgImg);
}

function fileToDateURL(file, callback) {
    let reader = new FileReader();

    reader.addEventListener("load", function () {
        callback(reader.result);
    });

    reader.readAsDataURL(file);
}

function fileChanged(event) {
    let file = event.target.files[0];

    fileToDateURL(file, (fileData) => {
        setBgImg(fileData, addImageOverlay)
    });
}

function addImageOverlay() {
    var img = this;
    var bounds = createBounds(img);

    L.imageOverlay(img.src, bounds).addTo(map);
    map.fitBounds(bounds);
}

function createBounds(img) {
    return [[0,0], [img.naturalHeight, img.naturalWidth]];
}

function handleClick(mouseEvent) {
    L.marker(mouseEvent.latlng).addTo(map);
}

function saveToJSONToFile(json, name) {
    var blob = new Blob([JSON.stringify(json)], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, name);
}

window.onload = (event) => {
    let fileIn = document.getElementById("file-in");
    fileIn.addEventListener('change', (event) => fileChanged(event));

    let downloadData = document.getElementById("download-data");

    map = L.map("test-map", {
        crs: L.CRS.Simple,
        minZoom: -5,
        maxZoom: 4,
        zoomDelta: 0.5,
    });

    map.pm.addControls({ position: 'topleft' });
}
