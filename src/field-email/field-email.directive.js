(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldEmail', uiFieldEmail);

    function uiFieldEmail(formFactory) {
        return formFactory.create({
            templateUrl: 'forms/field-email/field-email.html'
        });
    }

})(angular);
