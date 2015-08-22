(function(angular) {
    'use strict';

    angular
        .module('ui.form.docs', [
            'ui.form',
            'ui.router'
        ])
        .config(FormExampleConfig)
    ;

    function FormExampleConfig($urlRouterProvider, $stateProvider, $translateProvider) {

        // Default language.
        $translateProvider.preferredLanguage('en_US');

        // Default to welcome page.
        $urlRouterProvider.otherwise('/ui/form/docs/welcome');

        // Base routes.
        $stateProvider
            .state('ui', {
                url: '/ui',
                template: '<ui-view />',
                abstract: true
            })
            .state('ui.form', {
                url: '/form',
                template: '<ui-view />',
                abstract: true
            })
            .state('ui.form.docs', {
                url: '/docs',
                abstract: true,
                templateUrl: 'ui-form/docs/main.html',
                breadcrumb: {
                    label: 'ui-form'
                }
            })
            .state('ui.form.docs.welcome', {
                url: '/welcome',
                templateUrl: 'ui-form/docs/welcome.html',
                breadcrumb: {
                    label: 'Welcome'
                }
            })
        ;
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form.docs')
        .config(configure);

    function configure($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.when(
            '/ui/form/docs/examples',
            '/ui/form/docs/examples/simple-form'
        );

        $stateProvider
            .state('ui.form.docs.examples', {
                url: '/examples',
                template: '<ui-view />',
                breadcrumb: {
                    label:'Examples'
                }
            })
        ;
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form.docs')
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('ui.form.docs.examples.field_choice', {
                url: '/field-choice',
                templateUrl: 'ui-form/docs/examples/field-choice/template.html',
                controller: 'ExampleFieldChoiceController',
                controllerAs: 'vm',
                breadcrumb: {
                    label: 'Field Choice'
                }
            })
        ;
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form.docs')
        .controller('ExampleFieldChoiceController', ExampleFieldChoiceController)
    ;

    function ExampleFieldChoiceController($timeout) {
        var vm = this;

        // Default bindings
        vm.debug = false;

        // Public methods
        vm.save = save;
        vm.saveWithErrors = saveWithErrors;

        // -- Public Methods -- //

        function save() {
            if (vm.loading) {
                return;
            }

            vm.loading = true;

            // Mimicking async http call to save data.
            $timeout(function () {
                vm.loading = false;
                alert('Data saved.');
            }, 3000);
        }

        function saveWithErrors() {
            if (vm.loading) {
                return;
            }

            vm.loading = true;

            // Mimicking async http call to save data, this time we pretend server has returned some validation errors.
            $timeout(function () {
                vm.loading = false;
                vm.errors = {
                    errors: ['This errors is about the whole form, not any specific field.'],
                    children: {
                        title: {
                            errors: ['This is a validation error sent from server!']
                        }
                    }
                };
            }, 3000);
        }
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form.docs')
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('ui.form.docs.examples.field_text', {
                url: '/field-text',
                templateUrl: 'ui-form/docs/examples/field-text/template.html',
                controller: 'ExampleFieldTextController',
                controllerAs: 'vm',
                breadcrumb: {
                    label: 'Field Text'
                }
            })
        ;
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form.docs')
        .controller('ExampleFieldTextController', ExampleFieldTextController)
    ;

    function ExampleFieldTextController($timeout) {
        var vm = this;

        // Default bindings
        vm.debug = false;
        vm.data = {
            title: 'Developer',
            company: 'Ravaj',
            address: '767 Fifth Avenue',
            city: 'New York',
            state: 'NY'
        };

        // Public methods
        vm.save = save;
        vm.saveWithErrors = saveWithErrors;

        // -- Public Methods -- //

        function save() {
            if (vm.loading) {
                return;
            }

            vm.loading = true;

            // Mimicking async http call to save data.
            $timeout(function () {
                vm.loading = false;
                alert('Data saved.');
            }, 3000);
        }

        function saveWithErrors() {
            if (vm.loading) {
                return;
            }

            vm.loading = true;

            // Mimicking async http call to save data, this time we pretend server has returned some validation errors.
            $timeout(function () {
                vm.loading = false;
                vm.errors = {
                    errors: ['This errors is about the whole form, not any specific field.'],
                    children: {
                        title: {
                            errors: ['This is a validation error sent from server!']
                        }
                    }
                };
            }, 3000);
        }
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form.docs')
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('ui.form.docs.examples.simple_form', {
                url: '/simple-form',
                templateUrl: 'ui-form/docs/examples/simple-form/template.html',
                controller: 'ExampleSimpleFormController',
                breadcrumb: {
                    label: 'A very simple form'
                }
            })
        ;
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form.docs')
        .controller('ExampleSimpleFormController', ExampleSimpleFormController)
    ;

    function ExampleSimpleFormController($timeout) {
        var vm = this;

        // Default bindings
        vm.debug = false;
        vm.data = {
            sku: '67265690',
            content: 'Default sample content'
        };

        // Public methods
        vm.save = save;
        vm.saveWithErrors = saveWithErrors;

        // -- Public Methods -- //

        function save() {
            if (vm.loading) {
                return;
            }

            vm.loading = true;

            // Mimicking async http call to save data.
            $timeout(function () {
                vm.loading = false;
                alert('Data saved.');
            }, 3000);
        }

        function saveWithErrors() {
            if (vm.loading) {
                return;
            }

            vm.loading = true;

            // Mimicking async http call to save data, this time we pretend server has returned some validation errors.
            $timeout(function () {
                vm.loading = false;
                vm.errors = {
                    errors: ['This errors is about the whole form, not any specific field.'],
                    children: {
                        title: {
                            errors: ['This is a validation error sent from server!']
                        }
                    }
                };
            }, 3000);
        }
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form.docs')
        .config(configure);

    function configure($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.when(
            '/ui/form/docs/guide',
            '/ui/form/docs/guide/getting-started'
        );

        $stateProvider
            .state('ui.form.docs.guide', {
                url: '/guide',
                template: '<ui-view />',
                breadcrumb: {
                    label:'Examples'
                }
            })
        ;
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form.docs')
        .config(configure);

    function configure($stateProvider) {
        $stateProvider
            .state('ui.form.docs.guide.getting_started', {
                url: '/getting-started',
                templateUrl: 'ui-form/docs/guide/getting-started/template.html',
                breadcrumb: {
                    label: 'Getting Started'
                }
            })
        ;
    }

})(angular);
