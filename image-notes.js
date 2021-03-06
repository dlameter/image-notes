var FileSaver = require('./node_modules/file-saver/dist/FileSaver.min.js');
var map;
var layerGroup;
var bgImg;
var leafletImage;

window.onload = (event) => {
    map = L.map("test-map", {
        crs: L.CRS.Simple,
        minZoom: -5,
        maxZoom: 4,
        zoomDelta: 0.5,
    });

    layerGroup = L.geoJSON();
    geomanSetupLayerGroup(map, layerGroup);

    L.control.imageNotes({ 
        postion: 'topright',
        mapToJSON: (map) => {
            return layerGroup.toGeoJSON();
        },
        saveJSON: saveJSONToFile,
        loadImageFile: loadImageFile,
        loadDataFile: loadJSONFile,
    }).addTo(map);

    map.pm.addControls({ position: 'topleft' });
}

function loadImageFile(files) {
    let file = files[0];

    fileToDateURL(file, (fileData) => {
        setBgImg(fileData, addImageOverlay)
    });
}

function loadJSONFile(files) {
    let file = files[0];

    fileToJSONObject(file, (jsonObject) => {
        newLayerGroup = L.geoJSON(jsonObject, {
            onEachFeature: handleLoadingFeatures,
        });
        swapLayerGroup(newLayerGroup);
    });
}

function saveJSONToFile(json, name) {
    var blob = new Blob([JSON.stringify(json)], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, name);
}

function geomanSetupLayerGroup(map, layerGroup){
    map.on('pm:create', e => {
        initLayerFeature(e.layer);
        bindConfiguredPopup(e.layer);
        layerGroup.addLayer(e.layer);
    });

    map.on('pm:cut', e => {
        layerGroup.removeLayer(e.originalLayer);
        layerGroup.addLayer(e.layer);
    });

    map.on('pm:remove', e => {
        layerGroup.removeLayer(e.layer);
    });

    layerGroup.addTo(map);
}

function fileToDateURL(file, callback) {
    let reader = new FileReader();

    reader.addEventListener("load", function () {
        callback(reader.result);
    });

    reader.readAsDataURL(file);
}

function swapLayerGroup(newLayerGroup) {
    map.removeLayer(layerGroup);
    layerGroup.clearLayers();
    layerGroup = newLayerGroup;
    geomanSetupLayerGroup(map, layerGroup);
}

function setBgImg(url, onload) {
    if (bgImg) {
        removeBgImg();
    }
    bgImg = createImg(url, onload);
}

function addImageOverlay() {
    var img = this;
    var bounds = createBounds(img);

    if (leafletImage) {
        leafletImage.remove();
    }

    leafletImage = L.imageOverlay(img.src, bounds);
    leafletImage.addTo(map);
    map.fitBounds(bounds);
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

function createBounds(img) {
    return [[0,0], [img.naturalHeight, img.naturalWidth]];
}

function handleClick(mouseEvent) {
    L.marker(mouseEvent.latlng).addTo(map);
}

function handleLoadingFeatures(feature, layer) {
    bindConfiguredPopup(layer);
}


function fileToJSONObject(file, callback) {
    let reader = new FileReader();

    reader.addEventListener("load", function () {
        callback(JSON.parse(reader.result));
    });

    reader.readAsText(file);
}

function bindConfiguredPopup(layer) {
    var popup = L.editablePopup()
        .on('save', (e) => handlePopupSave(e, layer));

    if (layer.feature.properties['popupText']) {
        popup.setContent(layer.feature.properties['popupText']);
    }

    layer.bindPopup(popup);
}

function handlePopupSave(e, layer) {
    setLayerProperty(layer, 'popupText', e.popup.getContent());
}

function initLayerFeature(layer) {
    let feature = layer.feature = layer.feature || {};
    feature.type = feature.type || "Feature";
    feature.properties = feature.properties || {};
}

function setLayerProperty(layer, property, value) {
    layer.feature.properties[property] = value;
}

function getLayerProperty(layer, property) {
    return layer.feature.properties[property];
}
