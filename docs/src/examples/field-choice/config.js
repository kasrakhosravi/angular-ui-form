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
