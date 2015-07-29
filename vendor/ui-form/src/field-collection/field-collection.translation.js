(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .config(translationsConfig);

    function translationsConfig($translateProvider) {
        $translateProvider.translations('fa_IR', {
            'ui.form.collection.add': 'افزودن گزینه'
        });
    }

})(angular);
