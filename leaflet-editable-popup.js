L.Popup.mergeOptions({
    editable: false,
});

let PopupMixin = {
    _setupEditable: function() {
        if (this.option.editable) {
            let prefix = 'leaflet-popup';

            let editButton = this._editButton = L.DomUtil.create('a', prefix + '-edit-button', this._wrapper);
            editButton.innerHTML = 'Edit';
            editButton.href = '#edit';

            L.DomEvent.on(editButton, 'click', this._onEdit, this);
        }
    },

    _onEdit: function() {
    },
};

L.Popup.include(PopupMixin);
L.Popup.addInitHook();
