function KnNumberSelector(options) {

    this.options = options;

    this.baseElement = options.element;
    this.input = options.element.find('input');

    this.init();
}

KnNumberSelector.prototype.init = function() {

    this.baseElement.find('.plus').on('click', this.increment.bind(this));
    this.baseElement.find('.minus').on('click', this.decrement.bind(this));

    this.input.on('input', this.onInput.bind(this));
};

KnNumberSelector.prototype.increment = function() {
    this.val(this.val() + 1);
};

KnNumberSelector.prototype.decrement = function() {
    this.val(this.val() - 1);
};

KnNumberSelector.prototype.val = function(val) {
    if (val === undefined) {
        if (this.input.val() === '-') {
            return 0;
        }
        return parseInt(this.input.val());
    }
    else {
        if (val === '-') {
            this.input.val(val);
            return;
        }
        var result = parseInt(val),
            minValue = this.options.minValue;
        if (minValue !== undefined) {
            result = Math.max(minValue, result);
        }
        this.input.val(result);
    }
};

KnNumberSelector.prototype.onInput = function() {
    var str = this.input.val(),
        negative = str[0] === '-';

    if (negative) {
        str = str.substring(1);
    }

    var value = (negative ? '-' : '') + str.replace(/[^0-9]/g, '').replace(/^0+/, '');
    this.val(!value ? 0 : value);
};

