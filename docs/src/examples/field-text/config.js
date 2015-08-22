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
