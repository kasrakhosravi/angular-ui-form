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
