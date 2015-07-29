(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldPassword', uiFieldPassword);

    function uiFieldPassword(formFactory) {
        return formFactory.create({
            templateUrl: 'forms/field-password/field-password.html',
            scope: {
                confirmLabel: '@'
            },
            link: function($scope) {
                var vm = $scope.vm;

                vm.confirmValue = '';

                $scope.$watch('vm.data', checkValues);
                $scope.$watch('vm.confirmValue', checkValues);

                function checkValues() {
                    if (vm.confirmValue !== vm.data) {
                        vm.raiseError('ui.field.password.mismatch');
                    } else {
                        vm.resetErrors();
                    }
                }
            }
        });
    }

})(angular);
