(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldUnitValue', uiFieldUnitValue);

    function uiFieldUnitValue(formFactory, localStorageService) {

        return formFactory.create({
            templateUrl: 'ui-form/field-unit-value/field-unit-value.html',
            scope: {
                units: '=',
                alias: '@'
            },
            link: uiFieldUnitValueLink
        });

        function uiFieldUnitValueLink($scope) {
            var vm = $scope.vm;

            // Default Binding
            vm.selectedUnit = getDefaultUnit();
            vm.selectUnit = selectUnit;

            // Watch masked data and and change real data accordingly
            $scope.$watch('vm.maskedData', transform);

            // Watch real data and change masked data accordingly
            $scope.$watch('vm.data', reverse);

            // Watch selected unit and change the masked data based on the type of selected unit
            $scope.$watch('vm.selectedUnit', function () {
                reverse(vm.data);
            });

            /**
             * Selects a unit.
             *
             * @param {object} unit
             */
            function selectUnit(unit) {
                vm.selectedUnit = unit;
                setDefaultUnit(unit);
            }

            /**
             * Calculates real data based on current masked data and selected unit,
             * and changes real data to calculated value.
             *
             * @param {object} maskedData
             */
            function transform(maskedData) {
                if (typeof maskedData !== 'undefined') {
                    vm.data = vm.maskedData * vm.selectedUnit.division;
                }
            }

            /**
             * Calculates masked data based on current real data and selected unit,
             * and changes masked data to calculated value.
             *
             * @param {object} data
             */
            function reverse(data) {
                if (typeof data !== 'undefined') {
                    vm.maskedData = data / vm.selectedUnit.division;
                }
            }

            /**
             * Returns default unit based on last selected unit by the user,
             * or first unit if it's the first time that this directive is being rendered.
             *
             * @returns {object}
             */
            function getDefaultUnit() {
                var storedUnitDivision, i, c;

                storedUnitDivision = localStorageService.get(
                    'field-unit-value-' + vm.alias + '-division'
                );

                if (typeof storedUnitDivision === 'number') {
                    for (i = 0, c = vm.units.length; i < c; i++) {
                        if (vm.units[i].division === storedUnitDivision) {
                            return vm.units[i];
                        }
                    }
                }

                return vm.units[0];
            }

            /**
             * Saves a unit into local storage for future reference.
             *
             * @see getDefaultUnit
             * @param {object} unit
             */
            function setDefaultUnit(unit) {
                localStorageService.set(
                    'field-unit-value-' + vm.alias + '-division', unit.division
                );
            }
        }
    }

})(angular);
