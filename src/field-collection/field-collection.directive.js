(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldCollection', uiFieldCollection);

    function uiFieldCollection(formFactory, formUtil) {

        return formFactory.createTranscludable(
            'ui-form/field-collection/field-collection.html', FieldCollectionPostLink, {
                scope: {
                    initialValue: '&?'
                }
            }
        );

        function FieldCollectionPostLink($scope) {
            var vm = $scope.vm;

            // Bindings
            vm.addItem = addItem;
            vm.removeItem = removeItem;

            // Default Variables
            setDefaults();

            /**
             * Default scope variables
             */
            function setDefaults() {
                if (!vm.data) {
                    vm.data = [];
                } else {
                    if (!angular.isArray(vm.data)) {
                        // Make sure we have an array with numeric indices.
                        vm.data = formUtil.objectValues(vm.data);
                    }
                }
            }

            /**
             * Adds a new item to the collection.
             */
            function addItem() {
                vm.data.push(vm.initialValue ? angular.copy(vm.initialValue()) : null);
            }

            /**
             * Removes an item from collection by index.
             *
             * @param {integer} index
             */
            function removeItem(index) {
                vm.data.splice(index, 1);
            }
        }
    }

})(angular);
