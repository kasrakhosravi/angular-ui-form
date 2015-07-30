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
                ncyBreadcrumb: {
                    label:'Examples'
                }
            })
        ;
    }

})(angular);
