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
                required: '&?',
                multiple: '&?',
                expanded: '&?'
            }
        });

        function FieldChoiceLink($scope) {
            var vm = $scope.vm,
                remoteIsDone = false;

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

            // Reset data if current data is not in options.
            $scope.$watch('vm.options', clearMissingData);

            /**
             * Default scope variables.
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
             * Updates select options based on remote route and parameters.
             */
            function updateChoiceWidget() {
                vm.loading = true;
                formApi.get(vm.remoteUrl, vm.remoteParams()).then(function (options) {
                    vm.loading = false;
                    remoteIsDone = true;

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
                }, function() {
                    remoteIsDone = true;
                    vm.disabled = true;
                    vm.loading = false;
                    vm.raiseError('ui.form.field.choice.remote_error');
                });
            }

            /**
             * Updates selected option based on current data.
             */
            function updateSelectedOption() {
                if (vm.multiple()) {
                    vm.selected = vm.options.filter(function (option) {
                        return vm.data.indexOf(option[vm.valueProperty].toString());
                    });
                } else {
                    vm.selected = vm.options.filter(function (option) {
                        return vm.data.toString() === option[vm.valueProperty].toString();
                    });

                    if (vm.selected.length) {
                        vm.selected = vm.selected[0];
                    }
                }
            }

            /**
             * Removes data which is missing from updated options.
             *
             * @param {object} options
             */
            function clearMissingData(options) {
                var i, c, values = [];

                if (!options || typeof options !== 'object' || !options.length) {
                    if (!vm.remoteUrl || remoteIsDone) {
                        if (vm.multiple()) {
                            vm.data = [];
                        } else {
                            vm.data = null;
                        }
                    }

                    return;
                }

                for (i = 0, c = options.length; i < c; i++) {
                    values.push(options[i][vm.valueProperty].toString());
                }

                if (vm.multiple()) {
                    if (!vm.data.length) {
                        return;
                    }

                    for (i = 0, c = vm.data.length; i < c; i++) {
                        if (values.indexOf(vm.data[i].toString()) === -1) {
                            vm.data.splice(i, 1);
                            i--;
                            c--;
                        }
                    }
                } else {
                    if (values.indexOf(vm.data.toString()) === -1) {
                        if (vm.required()) {
                            vm.data = options[0][vm.valueProperty].toString();
                        } else {
                            vm.data = null;
                        }
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
