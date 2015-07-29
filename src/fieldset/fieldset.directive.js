(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldset', uiFieldset);

    function uiFieldset(formFactory) {
        return formFactory.createTranscludable(
            'forms/fieldset/fieldset.html', {
                scope: {
                    legend: '&?'
                }
            }
        );
    }

})(angular);
