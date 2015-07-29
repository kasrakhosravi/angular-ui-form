(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldCheckbox', uiFieldCheckbox);

    function uiFieldCheckbox(formFactory) {
        return formFactory.create({
            templateUrl: 'forms/field-checkbox/field-checkbox.html'
        });
    }

})(angular);
