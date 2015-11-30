(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .config(translationsConfig);

    function translationsConfig($translateProvider) {
        $translateProvider.translations('en_US', {
            'ui.form.field.choice.unselected_option': '...',
            'ui.form.field.choice.remote_error': 'Remote API call has an error'
        });

        $translateProvider.translations('fa_IR', {
            'ui.form.field.choice.unselected_option': '...',
            'ui.form.field.choice.remote_error': 'خطا در دریافت اطلاعات'
        });
    }

})(angular);
