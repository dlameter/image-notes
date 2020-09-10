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

        let container = L.DomUtil.create('div', prefix + '-container');
        let clearButton = this._createButton('Clear', 'clear-button', prefix + '-clear-button', container, this._clearData);
        let saveButton = this._createButton('Save', 'save-button', prefix + '-save-button', container, this._saveData);
        let loadImage = this._createFileInput('Load Image', 'load-image', '.png, .jpeg, .jpg', container, this.options.loadImageFile);
        let loadData = this._createFileInput('Data Image', 'load-data', '.json, .geojson', container, this.options.loadDataFile);

        return container;
    },

    _createFileInput: function(text, name, accept, container, loadFiles) {
        let prefix = this.options.prefix;

        let fileDiv = L.DomUtil.create('div', prefix + '-input-wrapper', container);

        let fileInput = this._createFileInputElement(name, accept, prefix + '-input', fileDiv, (e) => {
            fileInput.value = '';
        }, (e) => {
            if (fileInput.value) {
                loadFiles(e.target.files);
            }
        });
        
        let fileButton = this._createButton(text, name + '-button', prefix + '-button', fileDiv, (e) => fileInput.click());
    },

    _createButton: function(html, title, className, container, func) {
        let button = L.DomUtil.create('a', className, container);
        button.innerHTML = html;
        button.href = '#';
        button.title = title;

        L.DomEvent.disableClickPropagation(button);
        L.DomEvent.on(button, 'click', L.DomEvent.stop);
        L.DomEvent.on(button, 'click', func, this);
        L.DomEvent.on(button, 'click', this._refocusOnMap, this);

        return button;
    },

    _createFileInputElement: function(name, accept, className, container, clickFunc, changeFunc) {
        let input = L.DomUtil.create('input', className, container);
        input.accept = accept;
        input.id = name;
        input.name = name;
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
