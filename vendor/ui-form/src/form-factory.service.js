(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .factory('formFactory', formFactory);

    function formFactory($templateCache, $compile, formUtil) {
        return {
            create: createSimpleDirective,
            createTranscludable: createTranscludableDirective
        };

        /**
         * Creates a simple form element (a field or a form)
         *
         * @param {object} options
         *
         * @returns {*}
         */
        function createSimpleDirective(options) {
            return formUtil.defaults(options || {}, {
                restrict: 'E',
                controller: 'FormController',
                bindToController: true,
                controllerAs: 'vm',
                require: '?ngModel',
                scope: {
                    label: '@?',
                    help: '@?',
                    property: '@?',
                    data: '=?ngModel',
                    loading: '=?',
                    errors: '=?',
                    debug: '&?'
                    // TODO Add disabled, required, pattern
                }
            });
        }

        /**
         * Creates a field which can have transcluded content.
         *
         * The difference between using this helper and using ng-transclude is that it does not try to
         * compile the content before transclusion so that you can for example put your transcluded content
         * inside an ng-repeat in your template. See ui-field-collection as real example.
         *
         * @param {string} templateUrl Template path to load in which you should place a
         *                              <ui-transclude-here> element for content transclusion.
         * @param {function} postLink  A function to run after in post-link phase. Usually used
         *                              to add custom methods and properties to field's scope.
         *                              You can access access $scope in first argument and controller
         *                              in $scope.vm property.
         *                              Signature of this function is following angular directive's post-link
         *                              functions.
         * @param {object} options     These options will directly be injected in directive's definition,
         *                              Usually used to add additional scope-attribute bindings.
         *                              e.g. A `multiple` one-way binding to be used in field-choice.
         *
         * @returns {object}            An angular directive definition.
         */
        function createTranscludableDirective(templateUrl, postLink, options) {
            if (typeof postLink == 'object') {
                options = postLink;
                postLink = angular.noop;
            }

            return createSimpleDirective(formUtil.defaults(options || {}, {
                compile: compileTranscludable
            }));

            function compileTranscludable(tElement) {
                var content = tElement[0].innerHTML;
                tElement.html('');

                function linkTranscludable($scope, iElement) {
                    var templateEl = $(angular.element($templateCache.get(templateUrl)));
                    templateEl.find('ui-transclude-here').replaceWith(content);

                    iElement.html('');
                    iElement.append($compile(templateEl)($scope));

                    if (postLink) {
                        postLink.apply(null, arguments);
                    }
                }

                return linkTranscludable;
            }
        }
    }

})(angular);
