(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .controller('FormController', FormController);

    function FormController($rootScope, $scope, $element, formUtil) {
        var vm = this;

        // Mark this scope as a ui-form/ui-field-* type.
        vm.$$isUiType = true;

        // Bind this field's data to appropriate destination (by ng-model or property).
        _bindData();

        // If errors attribute is not by user it means we should ask parent for errors (if there's any).
        if (!$element.attr('errors')) {
            _bindToErrorsFromParent();
        }

        // Add common class
        $element.addClass('ui-type');

        // Reset errors when data has changed.
        $scope.$watch('vm.data', resetErrors, true);

        // Public methods
        vm.hasAnyError = hasAnyError;
        vm.raiseError = raiseError;
        vm.resetErrors = resetErrors;

        return this;

        //-- Public Methods --//

        /**
         * Returns true if one of the children has any error.
         *
         * @returns {object}
         */
        function hasAnyError() {
            var found = false;

            if (typeof vm.errors === 'object') {
                _deepWalkOnErrors(vm.errors, function (errors) {
                    if (errors.length > 0) {
                        found = true;
                    }
                });
            }

            return found;
        }

        /**
         * Appends a new error to errors of view model.
         */
        function raiseError(message) {
            if (typeof vm.errors === 'undefined') {
                vm.errors = {};
            }

            if (typeof vm.errors.errors === 'undefined') {
                vm.errors.errors = [];
            }

            if (vm.errors.errors.indexOf(message) === -1) {
                vm.errors.errors.push(message);
            }
        }

        /**
         * Resets current field errors.
         */
        function resetErrors() {
            vm.errors = {
                errors: [],
                children: {}
            };
        }

        //-- Private Methods --//

        /**
         * Binds this form/field data back to a property binding or ng-model.
         *
         * Make a two-way binding to parent scope based on property name provided.
         * Since every parent (whether form root or another field) is bound through `vm` binding context
         * and the data is available on `data` key we can easily bind
         * from $parent.vm.data[vm.property] to this field's vm.data.
         *
         * If vm.property is not provided (like in fieldset) it means
         * we do not need to walk down the data hierarchy so we want a binding from $parent.vm.data to field's vm.data.
         * Note that we cannot leave this job to scope prototypical nature since we're working with isolated scopes.
         */
        function _bindData() {
            var propertyPath = vm.property ? ('["' + vm.property + '"]') : '',
                $parent;

            if (vm.property || !$element.attr('ng-model')) {
                $parent = _findScopeOfNearestParentField($scope);

                if (!$parent) {
                    throw new Error('Could not find any form parent. ' +
                    'Maybe you should at least one of `ng-model` or `property` attributes for your field.');
                }

                formUtil.twoWayBind(
                    $parent, 'vm.data' + propertyPath,
                    vm, 'data'
                );
            }
        }

        /**
         * This method tries to bind to errors provided by parent form/field.
         *
         * To access error strings in template you should use vm.errors.errors,
         * and to access children ErrorObjects you should use vm.errors.children which
         * contains an associative array of children ErrorObjects.
         */
        function _bindToErrorsFromParent() {
            var $parent = _findScopeOfNearestParentField($scope);

            // No parent so silently skip errors binding.
            if (!$parent) {
                return;
            }

            // Watch parent errors because it contains this field's errors.
            $parent.$watch('vm.errors', function (parentErrorObject) {
                if (typeof parentErrorObject === 'object') {
                    if (vm.property) {
                        if (parentErrorObject.children && parentErrorObject.children[vm.property]) {
                            vm.errors = parentErrorObject.children[vm.property];
                        }
                    } else {
                        // No property is set so skip the hierarchy.
                        vm.errors = parentErrorObject;
                    }
                }
            });

            // Send any changes on this field's errors back to parent.
            $scope.$watch('vm.errors', function (errorObject) {
                if (!angular.isObject($parent.vm.errors)) {
                    $parent.vm.errors = {};
                }

                if (vm.property) {
                    if (!angular.isObject($parent.vm.errors.children)) {
                        $parent.vm.errors.children = {};
                    }

                    $parent.vm.errors.children[vm.property] = errorObject;
                } else {
                    // No property is set so skip the hierarchy.
                    $parent.vm.errors = errorObject;
                }
            });
        }

        /**
         * Walks up the scope hierarchy to find nearest parent scope which is a field or form.
         *
         * @param {object} $scope
         *
         * @returns {object|null}
         */
        function _findScopeOfNearestParentField($scope) {
            if ($scope === $rootScope) {
                return null;
            }

            if ($scope.$parent.vm && $scope.$parent.vm.$$isUiType) {
                return $scope.$parent;
            } else {
                return _findScopeOfNearestParentField($scope.$parent);
            }
        }

        /**
         * Walks down the errors tree of a subject and fires a callback on errors of every item.
         *
         * @param {object} subject = children: [...], errors: [...]
         * @param {function} callback(errors)
         */
        function _deepWalkOnErrors(subject, callback) {
            var index;

            if (!subject) {
                return;
            }

            if (typeof subject.children === 'object') {
                for (index in subject.children) {
                    if (subject.children.hasOwnProperty(index)) {
                        _deepWalkOnErrors(subject.children[index], callback);
                    }
                }
            }

            if (typeof subject.errors !== 'undefined') {
                callback(subject.errors);
            }
        }
    }

})(angular);
