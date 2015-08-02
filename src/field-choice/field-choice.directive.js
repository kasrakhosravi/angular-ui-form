(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldChoice', uiFieldChoice);

    function uiFieldChoice(formFactory, formUtil, formApi) {
        return formFactory.create({
            link: FieldChoiceLink,
            templateUrl: 'ui-form/field-choice/field-choice.html',
            scope: {
                inlineOptions: '=?',
                remoteUrl: '@?',
                remoteParams: '&?',
                optionsRoot: '@?',
                valueProperty: '@?',
                labelProperty: '@?',
                selected: '=?',
                multiple: '&?',
                expanded: '&?'
            }
        });

        function FieldChoiceLink($scope) {
            var vm = $scope.vm;

            // Defaults
            setDefaults();

            // Watch for changes in inline-options.
            $scope.$watch(
                'vm.inlineOptions',
                function (inlineOptions) {
                    if (vm.optionsRoot) {
                        inlineOptions = formUtil.deepGet(inlineOptions, vm.optionsRoot);
                    }

                    vm.options = normalizeOptions(inlineOptions);

                    if (typeof vm.data === 'undefined' && vm.options.length > 0) {
                        if (!vm.multiple()) {
                            vm.data = vm.options[0][vm.valueProperty].toString();
                        }
                    }
                }
            );

            // Watch for changes in parameters when remote route is set.
            if (vm.remoteUrl) {
                $scope.$watch(
                    function () {
                        return vm.remoteParams();
                    },
                    updateChoiceWidget
                );
            }

            // Set selected option when data is changed
            $scope.$watch('vm.data', updateSelectedOption);

            /**
             * Default scope variables
             */
            function setDefaults() {
                if (typeof vm.valueProperty === 'undefined') {
                    vm.valueProperty = 'value';
                }

                if (typeof vm.labelProperty === 'undefined') {
                    vm.labelProperty = 'label';
                }

                if (typeof vm.options === 'undefined') {
                    vm.options = [];
                }

                if (typeof vm.data === 'undefined' && vm.multiple()) {
                    vm.data = [];
                }
            }

            /**
             * Updates select options based on remote route and parameters
             */
            function updateChoiceWidget() {
                vm.loading = true;
                formApi.get(vm.remoteUrl, vm.remoteParams()).then(function (options) {
                    vm.loading = false;

                    if (vm.optionsRoot) {
                        options = formUtil.deepGet(options, vm.optionsRoot);
                    }

                    vm.options = formUtil.objectValues(normalizeOptions(options)) || [];

                    if (typeof vm.data === 'undefined' && vm.options.length > 0) {
                        if (!vm.multiple()) {
                            vm.data = vm.options[0][vm.valueProperty].toString();
                        }
                    } else {
                        updateSelectedOption();
                    }
                });
            }

            /**
             * Updates selected option based on current data
             */
            function updateSelectedOption() {
                if (vm.multiple()) {
                    vm.selected = vm.options.filter(function (option) {
                        return vm.data.indexOf(option[vm.valueProperty].toString());
                    });
                } else {
                    vm.selected = vm.options.filter(function (option) {
                        return vm.data === option[vm.valueProperty].toString();
                    });

                    if (vm.selected.length) {
                        vm.selected = vm.selected[0];
                    }
                }
            }

            /**
             * Normalizes key-value pairs into an array
             * with desired structure for choice field.
             *
             * @return {Array}
             */
            function normalizeOptions(subject) {
                var normalized = [];

                for (var key in subject) {
                    if (subject.hasOwnProperty(key)) {
                        if (angular.isObject(subject[key])) {
                            normalized.push(subject[key]);
                        } else {
                            normalized.push({
                                value: key,
                                label: subject[key]
                            });
                        }
                    }
                }

                return normalized;
            }
        }
    }

})(angular);
