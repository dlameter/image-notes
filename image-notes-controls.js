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
        }
    },

    onAdd: function(map) {
        let prefix = 'image-notes';
        let container = L.DomUtil.create('div', prefix + '-container');
        let clearButton = this._createButton('Clear', 'clear-button', prefix + '-clear-button', container, this._clearData);
        let saveButton = this._createButton('Save', 'save-button', prefix + '-save-button', container, this._saveData);

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

    _createInput: function() {
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
