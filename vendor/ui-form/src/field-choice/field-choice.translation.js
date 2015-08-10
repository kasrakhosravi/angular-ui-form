(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .config(translationsConfig);

    function translationsConfig($translateProvider) {
        $translateProvider.translations('en_US', {
            'ui.form.field.choice.unselected_option': 'Select an item'
        });

        $translateProvider.translations('fa_IR', {
            'ui.form.field.image.instructions': 'آیتم مورد نظر را انتخاب کنید'
        });
    }

})(angular);
