(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldTree', uiFieldTree);

    function uiFieldTree($q, formFactory, formUtil, formApi) {

        return formFactory.create({
            templateUrl: 'forms/field-tree/field-tree.html',
            link: FieldTreeLink,
            scope: {
                data: '=?ngModel',
                inlineTree: '&?',
                remoteParams: '&?',
                includeRoot: '&?',
                remoteUrl: '@?',
                treeRoot: '@?',
                valueProperty: '@?',
                labelProperty: '@?',
                multiple: '&?'
            }
        });

        function FieldTreeLink($scope) {
            var vm = $scope.vm;

            // Bindings
            vm.toggleNode = toggleNode;

            // Two-way binding to provided property or parent data directly
            formUtil.twoWayBind(
                $scope.$parent, 'vm.data' + (vm.property ? '.' + vm.property : ''),
                $scope.vm, 'data'
            );

            // Default Variables
            setDefaults();

            if (vm.remoteUrl) {
                // Watch for changes in parameters when remote route is set.
                $scope.$watch('vm.remoteParams', updateTreeNodes);
            } else {
                // Watch for changes in parameters when remote route is set.
                $scope.$watch('vm.inlineTree()', updateTreeNodes);
            }

            // Select appropriate tree nodes when field data is changed
            $scope.$watch(updateTreeSelectedNodes);

            //** Methods **//

            /**
             * Default scope variables
             */
            function setDefaults() {
                vm.selectedNodes = [];

                if (typeof vm.valueProperty === 'undefined') {
                    vm.valueProperty = 'value';
                }

                if (typeof vm.labelProperty === 'undefined') {
                    vm.labelProperty = 'label';
                }

                if (typeof vm.nodes === 'undefined') {
                    vm.nodes = {};
                }

                if (vm.multiple() && !vm.data) {
                    vm.data = [];
                }
            }

            /**
             * Updates tree nodes based on remote route and parameters
             */
            function updateTreeNodes() {
                var promise;

                if (!vm.loading) {
                    vm.loading = true;

                    if (vm.remoteUrl) {
                        promise = formApi.get(vm.remoteUrl, vm.remoteParams());
                    } else {
                        promise = $q.when(vm.inlineTree());
                    }

                    promise.then(function (result) {
                        vm.loading = false;

                        if (vm.treeRoot) {
                            result = formUtil.deepGet(result, vm.treeRoot);
                        }

                        if ('children' in result) {
                            // It's a single record, so I guess we should show it's children,
                            // except the developer explicitly asks to include the root!
                            if (vm.includeRoot()) {
                                vm.nodes = [result];
                            } else {
                                vm.nodes = formUtil.objectValues(result.children);
                            }
                        } else {
                            // Hope it's an array so what ever it is try to render all of it!
                            vm.nodes = formUtil.objectValues(result);
                        }

                        // Try to eliminate non-numeric keys on every children array.
                        walkNodes(vm.nodes, function (node) {
                            if (node.children) {
                                node.children = formUtil.objectValues(node.children);
                            }
                        });
                    });
                }
            }

            /**
             * Updates selected nodes based on provided data
             */
            function updateTreeSelectedNodes() {
                var data = vm.data;

                vm.selectedNodes = [];

                if (!data) {
                    return;
                }

                if (vm.multiple()) {
                    if (typeof data === 'object' && data.length) {
                        walkNodes(vm.nodes, function (node) {
                            var value = node[vm.valueProperty].toString();
                            if (data.indexOf(value) > -1) {
                                vm.selectedNodes.push(node);
                            }
                        });
                    }
                } else {
                    data = data.toString();
                    walkNodes(vm.nodes, function (node) {
                        if (node[vm.valueProperty].toString() === data) {
                            vm.selectedNodes.push(node);
                        }
                    });
                }
            }

            /**
             * Toggles selection of a node
             *
             * @param {object} node
             */
            function toggleNode(node) {
                var value = node[vm.valueProperty].toString();

                if (vm.multiple()) {
                    var index = vm.data.indexOf(value);
                    if (index > -1) {
                        vm.data.splice(index, 1);
                    } else {
                        vm.data.push(value);
                    }
                } else {
                    if (vm.data !== value) {
                        vm.data = value;
                    } else {
                        vm.data = null;
                    }
                }
            }

            /**
             * Walk on every node deeply.
             *
             * @param {object} nodes
             * @param {function} callback
             */
            function walkNodes(nodes, callback) {
                for (var index in nodes) {
                    if (nodes.hasOwnProperty(index)) {
                        callback(nodes[index]);
                        if ('children' in nodes[index]) {
                            walkNodes(nodes[index].children, callback);
                        }
                    }
                }
            }
        }
    }

})(angular);
