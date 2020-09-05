let EditablePopup = L.Popup.extend({
    options: {
        editable: true,
    },

    _editablePopupCSSPrefix: 'leaflet-popup',

    _initLayout: function () {
        var prefix = 'leaflet-popup',
            container = this._container = L.DomUtil.create('div',
                prefix + ' ' + (this.options.className || '') +
                ' leaflet-zoom-animated');

        var wrapper = this._wrapper = L.DomUtil.create('div', prefix + '-content-wrapper', container);
        this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);

        L.DomEvent.disableClickPropagation(wrapper);
        L.DomEvent.disableScrollPropagation(this._contentNode);
        L.DomEvent.on(wrapper, 'contextmenu', L.DomEvent.stopPropagation);

        this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
        this._tip = L.DomUtil.create('div', prefix + '-tip', this._tipContainer);

        if (this.options.closeButton) {
            var closeButton = this._closeButton = L.DomUtil.create('a', prefix + '-close-button', container);
            closeButton.href = '#close';
            closeButton.innerHTML = '&#215;';

            L.DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);
        }
    //_setupEditable: function() {
        if (this.options.editable) {
            let actionButtons = this._userActionButtons = L.DomUtil.create('div', this._editablePopupCSSPrefix + '-useraction-buttons', this._wrapper);
            console.log()
            let editButton = this._editButton = L.DomUtil.create('a', this._editablePopupCSSPrefix + '-edit-button', this._userActionButtons);
            editButton.innerHTML = 'Edit';
            editButton.href = '#edit';

            L.DomEvent.on(editButton, 'click', this._onEdit, this);

            this.update();
            console.log('setup complete');
        }
    },

    _onEdit: function(event) {
        this._inputFieldWidth = this._container.offsetWidth - 2*19;

        this._hideContentNode();
        this._createEditWrapper();

        L.DomEvent.stop(event);
        console.log('onEdit complete');
    },

    _createEditWrapper: function() {
        // Create edit wrapper
        let editWrapper = this._editWrapper = L.DomUtil.create('div', this._editablePopupCSSPrefix + '-edit-wrapper', this._wrapper);

        // create input ruler
        this._inputRuler = L.DomUtil.create('div', this._editablePopupCSSPrefix + '-input-ruler', this._editWrapper);

        // create input box
        let inputField = this._inputField = L.DomUtil.create('div', this._editablePopupCSSPrefix + '-input-field', this._editWrapper);
        inputField.setAttribute('contenteditable', 'true');
        inputField.innerHTML = this.getContent();
        inputField.style.width = this._inputFieldWidth + 'px';
        inputField.addEventListener('keydown', this._keyDownHandler.bind(this), false);

        // create button wrapper
        this._createEditButtonWrapper();
    },

    _createEditButtonWrapper: function() {
        // create button wrapper
        let buttonWrapper = this._editButtonWrapper = L.DomUtil.create('div', this._editablePopupCSSPrefix + '-input-wrapper', this._editWrapper);

        // create cancel button
        let cancelButton = this._cancelButton = L.DomUtil.create('a', this._editablePopupCSSPrefix + '-input-cancel-button', this._editButtonWrapper);
        cancelButton.href = '#cancel';
        cancelButton.innerHTML = 'Cancel';
        L.DomEvent.on(cancelButton, 'click', this._onCancel, this);

        // create save button
        let saveButton = this._saveButton = L.DomUtil.create('a', this._editablePopupCSSPrefix + '-input-save-button', this._editButtonWrapper);
        saveButton.href = '#save';
        saveButton.innerHTML = 'Save';
        L.DomEvent.on(saveButton, 'click', this._onSave, this);
    },

    _onCancel: function(event) {
        L.DomUtil.remove(this._editWrapper);
        this._showContentNode();

        this.update();
        L.DomEvent.stop(event);
    },

    _onSave: function(event) {
        this.setContent(this._inputField.innerHTML);

        L.DomUtil.remove(this._editWrapper);
        this._showContentNode();

        this.update();
        L.DomEvent.stop(event);
    },

    _keyDownHandler: function(event) {
        if (this._container.offsetWidth < this.options.maxWidth + 38 &&
            this._inputFieldWidth + 5 < this._inputField.clientWidth) {
            this._inputRuler.innerHTML = this._inputField.innerHTML;

            if (this._inputRuler.offsetWidth + 20 > this._inputField.clientWidth) {
                this._inputField.style.width = ruler.offsetWidth + 10 + 'px';
                this.update();
            }
        }
    },

    _hideContentNode: function() {
        this._contentNode.style.display = 'none';
        this._userActionButtons.style.display = 'none';
    },

    _showContentNode: function() {
        this._contentNode.style.display = 'block';
        this._userActionButtons.style.display = 'flex';
    },
});

L.EditablePopup = EditablePopup;
L.editablePopup = function(id, options) {
    return new L.EditablePopup(id, options);
};
