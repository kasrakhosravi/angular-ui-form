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
                ncyBreadcrumb: {
                    label: 'A very simple form'
                }
            })
        ;
    }

})(angular);
