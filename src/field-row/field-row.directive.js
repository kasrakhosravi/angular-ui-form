(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldRow', uiFieldRow);

    function uiFieldRow() {
        return {
            restrict: 'E',
            templateUrl: 'forms/field-row/field-row.html',
            transclude: true
        };
    }

})(angular);
