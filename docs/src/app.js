(function(angular) {
    'use strict';

    angular
        .module('ui.form.docs', [
            'ui.form',
            'ui.router',
            'localytics.directives'
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
