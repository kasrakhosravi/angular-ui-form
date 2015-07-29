(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldNumber', uiFieldNumber);

    function uiFieldNumber(formFactory) {
        return formFactory.create({
            templateUrl: 'ui-form/field-number/field-number.html',
            scope: {
                append: '&?',
                prepend: '&?'
            }
        });
    }

})(angular);

