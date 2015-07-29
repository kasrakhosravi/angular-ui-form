(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiForm', uiForm);

    function uiForm(formFactory) {
        return formFactory.createTranscludable('ui-form/form/form.html');
    }

})(angular);
