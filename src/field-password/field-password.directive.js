(function(angular) {
    'use strict';

    /**
     * @desc: password directive that can be used across your app to crete password fields.
     * Instead of multiple fields (password and confirm password); we have implemented a single field with the option to mask/unmask password.
     * @example: <ui-field-password label="Password" property="password"></ui-field-password>
     */
    angular
        .module('ui.form')
        .directive('uiFieldPassword', uiFieldPassword);

    function uiFieldPassword(formFactory) {
        return formFactory.create({
            link: FieldPasswordLink,
            templateUrl: 'ui-form/field-password/field-password.html'
        });

        function FieldPasswordLink ($scope, $element, $attrs) {
            var vm = $scope.vm;

            vm.mode = 'password';
            vm.toggleMode = toggleMode;

            function toggleMode () {
                if (vm.mode === 'password') {
                    vm.mode = 'text';
                } else {
                    vm.mode = 'password';
                }
            }
        }
    }

})(angular);
