L.Control.ImageNotes = L.Control.extend({
    onAdd: function(map) {
        let prefix = 'image-notes';
        let container = L.DomUtil.create('div', prefix + '-container');
        let clearButton = this._createButton('Clear', 'clear-button', prefix + '-clear-button', container, this._clearData);

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
        console.log(this);
    },

    onRemove: function(map) {
    },
});

L.control.imageNotes = function(opts) {
    return new L.Control.ImageNotes(opts);
};
