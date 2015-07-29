(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFormLoading', uiFormLoading);

    function uiFormLoading() {
        return {
            restrict: 'AE',
            templateUrl: 'forms/loading/loading.html'
        };
    }

})(angular);
