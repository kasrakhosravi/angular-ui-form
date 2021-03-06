(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldEditor', uiFieldEditor);

    function uiFieldEditor(formFactory) {
        return formFactory.create({
            templateUrl: 'ui-form/field-editor/field-editor.html'
        });
    }

})(angular);
