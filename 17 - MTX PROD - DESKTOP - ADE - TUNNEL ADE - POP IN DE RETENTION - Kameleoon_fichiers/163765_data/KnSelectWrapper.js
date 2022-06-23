function KnSelectorWrapper(knOptions) {

    this.options = knOptions;
    this.selector = this.options.select;
    this.templateElement = $(this.selector).clone();
    this.isFirstTime = true;

    this.replaceOptions();

}

KnSelectorWrapper.prototype.prepareBaseElement = function() {
    var element;
    if (this.isFirstTime) {
        element = $(this.selector).eq(0);
        this.isFirstTime = false;
        this.baseItems = element.find('option').toArray().map(function(item) {
            return { key: item.value, value: item.innerText }
        });
    }
    else {
        element = this.templateElement.clone();
        $(this.selector).parent().replaceWith(element);
    }

    return element;
};
KnSelectorWrapper.prototype.on = function(name, callback) {
    $(this).on(name, callback);
};
KnSelectorWrapper.prototype.val = function(value) {
    var input = $(this.selector);
    if (value === undefined) {
        return input.attr('data-value');
    }
    else {
        var found = this.items.filter(function(item) {
            return item.key == value;
        })[0];
        if (found) {
            input.attr('data-value', found.key);
            input.val(found.value);
            this.updateCurrentValue(found.key);
        }
    }
};

/**
 *
 * @param array example [{key:'1',value:'1'},...]
 */
KnSelectorWrapper.prototype.replaceOptions = function(array) {
    var i, item, selectElement = this.prepareBaseElement();

    selectElement.append(this.createOption());

    this.items = !!array ? array : [];
    for (i = 0; i < this.items.length; ++i) {
        item = this.items[i];
        selectElement.append(this.createOption(item.key, item.value));
    }

    this.items = this.items.concat(this.baseItems);

    this.options.elements = selectElement;
    knSelect.settings(this.options);

    $(this.selector).on('change', function(event, dataValue) {
        this.updateCurrentValue(dataValue);
    }.bind(this));
};

KnSelectorWrapper.prototype.updateCurrentValue = function(value) {
    if (this.value == value) {
        return;
    }
    this.value = value;
    $(this).trigger('change', value)

};

KnSelectorWrapper.prototype.createOption = function(key, value) {
    return $('<option value="' + (key === undefined ? '' : key) + '">' + (value === undefined ? '' : value) + '</option>');
};

KnSelectorWrapper.prototype.markInvalid = function() {
    $(this.selector).addClass('wt-invalid-field');
};

KnSelectorWrapper.prototype.removeMarkInvalid = function() {
    $(this.selector).removeClass('wt-invalid-field');
};
