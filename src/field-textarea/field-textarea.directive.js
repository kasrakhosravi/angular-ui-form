(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldTextarea', uiFieldTextarea);

    function uiFieldTextarea($timeout, formUtil, formFactory) {
        return formFactory.create({
            templateUrl: 'forms/field-textarea/field-textarea.html',
            scope: {
                placeholder: '@?',
                required: '&?',
                pattern: '&?'
            },
            link: uiFieldTextareaLink
        });

        function uiFieldTextareaLink($scope, $element) {
            // We need timeout to let transclusion of ui-field-row to happen before looking for a child element.
            $timeout(function () {
                formUtil.bindValidityErrors($scope, $element.find('textarea'));
            });
        }
    }

})(angular);
