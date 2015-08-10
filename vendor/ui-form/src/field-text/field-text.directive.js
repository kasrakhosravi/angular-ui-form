(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldText', uiFieldText);

    function uiFieldText($timeout, formUtil, formFactory) {

        return formFactory.create({
            templateUrl: 'ui-form/field-text/field-text.html',
            scope: {
                required: '&?',
                readonly: '&?',
                placeholder: '@?',
                pattern: '&?'
            },
            link: uiFieldTextLink
        });

        function uiFieldTextLink($scope, $element) {
            // We need timeout to let transclusion of ui-field-row to happen before looking for a child element.
            $timeout(function () {
                formUtil.bindValidityErrors($scope, $element.find('input'));
            });
        }
    }

})(angular);
