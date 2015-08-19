(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .config(translationsConfig);

    function translationsConfig($translateProvider) {
        $translateProvider.translations('en_US', {
            'ui.form.field.choice.unselected_option': 'Select an item',
            'ui.form.field.choice.remote_error': 'Remote API call has an error',
            'ui.form.field.choice.no_result_text': 'No result found for '
        });

        $translateProvider.translations('fa_IR', {
            'ui.form.field.image.instructions': 'آیتم مورد نظر را انتخاب کنید'
        });
    }

})(angular);
