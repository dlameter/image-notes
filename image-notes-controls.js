L.Control.ImageNotes = L.Control.extend({
    options: {
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
        let prefix = 'image-notes';
        let container = L.DomUtil.create('div', prefix + '-container');
        let clearButton = this._createButton('Clear', 'clear-button', prefix + '-clear-button', container, this._clearData);
        let saveButton = this._createButton('Save', 'save-button', prefix + '-save-button', container, this._saveData);

        let loadImage = L.DomUtil.create('div', prefix + '-input-wrapper', container);
        let loadImageInput = this._createFileInput('load-image', '.png, .jpeg, .jpg', prefix + '-load', loadImage);
        loadImageInput.style.display = 'none';
        L.DomEvent.on(loadImageInput, 'click', (e) => {
            loadImageInput.value = '';
        }, this);
        L.DomEvent.on(loadImageInput, 'change', (e) => {
            if (loadImageInput.value) {
                this.options.loadImageFile(e.target.files);
            }
        }, this);
        let loadImageButton = this._createButton('Load Image', 'load-image-button', prefix + '-load-button', loadImage, (e) => loadImageInput.click());

        let loadData = L.DomUtil.create('div', prefix + '-input-wrapper', container);
        let loadDataInput = this._createFileInput('load-data', '.json, .geojson', prefix + '-load', loadData);
        loadDataInput.style.display = 'none';
        L.DomEvent.on(loadDataInput, 'click', (e) => {
            loadDataInput.value = '';
        }, this);
        L.DomEvent.on(loadDataInput, 'change', (e) => {
            if (loadDataInput.value) {
                this.options.loadDataFile(e.target.files);
            }
        }, this);
        let loadDataButton = this._createButton('Load Data', 'load-data-button', prefix + '-load-button', loadData, (e) => loadDataInput.click());

        return container;
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

    _createFileInput: function(name, accept, className, container, func) {
        let input = L.DomUtil.create('input', className, container);
        input.accept = accept;
        input.id = name;
        input.name = name;
        input.type = 'file';

        //L.DomEvent.on(input, 'click', func, this);

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
