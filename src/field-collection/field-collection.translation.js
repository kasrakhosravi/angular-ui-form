(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .config(translationsConfig);

    function translationsConfig($translateProvider) {
        $translateProvider.translations('en_US', {
            'ui.form.field.collection.add_button': 'Add'
        });

        $translateProvider.translations('fa_IR', {
            'ui.form.field.collection.add_button': 'افزودن گزینه'
        });
    }

})(angular);
