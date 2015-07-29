(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldTab', uiFieldTab);

    function uiFieldTab(formFactory, formApi, formUtil) {

        return formFactory.createTranscludable(
            'ui-form/field-tab/field-tab.html', FieldTabPostLink, {
                scope: {
                    inlineTabs: '&?',
                    remoteParams: '&?',
                    remoteUrl: '@',
                    tabsRoot: '@?',
                    valueProperty: '@',
                    labelProperty: '@'
                }
            }
        );

        function FieldTabPostLink($scope) {
            var vm = $scope.vm;

            // Defaults
            setDefaults();

            // Watch for changes in parameters when remote route is set.
            if (vm.remoteUrl) {
                $scope.$watch(
                    function() {
                        return vm.remoteParams();
                    },
                    updateRemoteTabs
                );
            }

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

                if (typeof vm.inlineTabs === 'function') {
                    var tabs;

                    if (vm.tabsRoot) {
                        tabs = formUtil.deepGet(vm.inlineTabs(), vm.tabsRoot);
                    } else {
                        tabs = vm.inlineTabs();
                    }

                    vm.tabs = normalizeTabs(tabs);
                }

                if (typeof vm.tabs === 'undefined') {
                    vm.tabs = [];
                }

                if (typeof vm.data === 'undefined') {
                    vm.data = {};
                }
            }

            /**
             * Updates tabs from remote when remote params has changed
             */
            function updateRemoteTabs() {
                vm.loading = true;
                formApi.get(vm.remoteUrl, vm.remoteParams()).then(function (tabs) {
                    vm.loading = false;

                    if (vm.tabsRoot) {
                        tabs = formUtil.deepGet(tabs, vm.tabsRoot);
                    }

                    vm.tabs = formUtil.objectValues(tabs) || [];
                });
            }

            /**
             * Normalizes key-value pairs into an array
             * with desired structure for field-tab.
             *
             * @return {Array}
             */
            function normalizeTabs(subject) {
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
