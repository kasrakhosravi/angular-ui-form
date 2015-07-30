var DefaultHelper = require('./default');

module.exports = {

    setData: function(pageObject, data) {
        var bool = typeof data === 'string' ? (data !== "0") : (!!data),
            formElement = pageObject.getElement().element(by.css('input[type=checkbox]'));

        return formElement.isSelected().then(function(selected) {
            if ((bool && !selected) || (!bool && selected)) {
                return formElement.click();
            }
        });
    },

    getData: function(pageObject) {
        return pageObject.getElement().element(by.css('input[type=checkbox]')).then(function (selected) {
            return selected ? '1' : '0';
        });
    },

    clearData: function(pageObject) {
        return this.setData(pageObject, '0');
    },

    getErrors: DefaultHelper.getErrors
};