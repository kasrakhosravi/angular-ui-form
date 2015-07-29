(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldColor', uiFieldColor);

    function uiFieldColor(formFactory) {
        return formFactory.create({
            templateUrl: 'forms/field-color/field-color.html'
        });
    }

})(angular);
