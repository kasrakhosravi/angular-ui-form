var util = require('./util');
var FormPageObject = require('./form.po');

function ExamplePageObject(config) {
    if (typeof config === 'undefined') {
        config = {};
    }

    // Prepare form page-object
    this.formPageObject = new FormPageObject(
        config.formElement ? config.formElement : function () {
            return element(by.css('ui-form'));
        }
    );
}

ExamplePageObject.prototype.setFormData = function() {
    return this.formPageObject.setData.apply(this.formPageObject, arguments);
};

ExamplePageObject.prototype.getFormData = function() {
    return this.formPageObject.getData();
};

module.exports = new ExamplePageObject();
