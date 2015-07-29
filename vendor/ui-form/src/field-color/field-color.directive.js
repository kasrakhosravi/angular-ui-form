(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldColor', uiFieldColor);

    function uiFieldColor(formFactory) {
        return formFactory.create({
            templateUrl: 'ui-form/field-color/field-color.html'
        });
    }

})(angular);
