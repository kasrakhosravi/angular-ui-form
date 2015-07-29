(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .config(translationsConfig);

    function translationsConfig($translateProvider) {
        $translateProvider.translations('en_US', {
            'ui.form.error.required': 'This field is required.',
            'ui.form.error.pattern': 'Invalid input.'
        });

        $translateProvider.translations('fa_IR', {
            'ui.form.error.required': 'این فیلد اجباری است.',
            'ui.form.error.pattern': 'مقدار وارد شده نا معتبر است.'
        });
    }

})(angular);
