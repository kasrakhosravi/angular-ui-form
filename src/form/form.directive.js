(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiForm', uiForm);

    function uiForm(formFactory) {
        return formFactory.createTranscludable('forms/form/form.html');
    }

})(angular);
