(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldRow', uiFieldRow);

    function uiFieldRow() {
        return {
            restrict: 'E',
            templateUrl: 'ui-form/field-row/field-row.html',
            transclude: true
        };
    }

})(angular);
