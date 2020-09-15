L.Control.ImageNotes = L.Control.extend({
    options: {
        prefix: 'image-notes',
        filename: 'data.geojson',
        mapToJSON: function (map) {
            let layerGroup = L.geoJSON();

            map.eachLayer((feature, layer) => {
                layer.addTo(layerGroup);
            });

            return layerGroup.toGeoJSON();
        },
        saveJSON: function(json, filename) {
            console.log('Set saveJSON in ImageNotes options to a non default function.');
        },
        loadImageFile: function(files) {
            console.log('Set loadImageFile in ImageNotes options to a non default function.');
        },
        loadDataFile: function(files) {
            console.log('Set loadDataFile in ImageNotes options to a non default function.');
        },
    },

    onAdd: function(map) {
        let prefix = this.options.prefix;

        let container = L.DomUtil.create('div', 'leaflet-bar leaflet-control ' + prefix + '-container');

        let loadImage = this._createFileInput('Load Image', '.png, .jpeg, .jpg', prefix + '-upload-image-icon', container, this.options.loadImageFile);
        let loadData = this._createFileInput('Load Data', '.json, .geojson', prefix + '-upload-json-icon', container, this.options.loadDataFile);
        let saveButton = this._createButton('Save', prefix + '-save-button', prefix + '-save-icon', container, this._saveData);
        let clearButton = this._createButton('Clear', prefix + '-clear-button', prefix + '-clear-icon', container, this._clearData);

        return container;
    },

    _createFileInput: function(text, accept, iconClass, container, loadFiles) {
        let prefix = this.options.prefix;

        let fileDiv = L.DomUtil.create('div', prefix + '-button-wrapper', container);

        let fileInput = this._createFileInputElement(text, accept, prefix + '-input', fileDiv, (e) => {
            fileInput.value = '';
        }, (e) => {
            if (fileInput.value) {
                loadFiles(e.target.files);
            }
        });
        
        let fileButton = this._createButtonElement(text, prefix + '-button', iconClass, fileDiv, (e) => fileInput.click());
    },

    _createButton: function(title, className, iconClass, container, func) {
        let buttonContainer = L.DomUtil.create('div', 'image-notes-button-wrapper', container);

        let button = this._createButtonElement(title, className, iconClass, buttonContainer, func);

        return buttonContainer;
    },

    _createButtonElement: function(title, className, iconClass, container, func) {
        let button = L.DomUtil.create('a', 'image-notes-icon-wrapper ' + className, container);
        button.href = '#';
        button.title = title;

        L.DomEvent.disableClickPropagation(button);
        L.DomEvent.on(button, 'click', L.DomEvent.stop);
        L.DomEvent.on(button, 'click', func, this);
        L.DomEvent.on(button, 'click', this._refocusOnMap, this);

        let icon = L.DomUtil.create('div', 'image-notes-icon control-icon ' + iconClass, button);

        return button;
    },

    _createFileInputElement: function(text, accept, className, container, clickFunc, changeFunc) {
        let input = L.DomUtil.create('input', className, container);
        input.accept = accept;
        input.name = text;
        input.style.display = 'none';
        input.type = 'file';

        L.DomEvent.on(input, 'click', clickFunc, this);
        L.DomEvent.on(input, 'change', changeFunc, this);

        return input;
    },

    _clearData: function(e) {
        this._map.eachLayer(this._removeLayerFromMap.bind(this));
    },

    _removeLayerFromMap: function(layer) {
        this._map.removeLayer(layer);
    },

    _saveData: function(e) {
        let json = this.options.mapToJSON(this._map);
        let filename = this.options.filename;

        this.options.saveJSON(json, filename);
    },

    onRemove: function(map) {
    },
});

L.control.imageNotes = function(opts) {
    return new L.Control.ImageNotes(opts);
};
