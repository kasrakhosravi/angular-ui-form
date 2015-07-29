(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldDatepicker', uiFieldDatepicker);

    function uiFieldDatepicker(formFactory) {
        return formFactory.create({
            templateUrl: 'forms/field-datepicker/field-datepicker.html',
            scope: {
                minDate: '&?',
                calendar: '&?'
            }
        });
    }

})(angular);
