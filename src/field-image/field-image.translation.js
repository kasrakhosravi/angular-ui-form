(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .config(translationsConfig);

    function translationsConfig($translateProvider) {
        $translateProvider.translations('fa_IR', {
            'ui.form.field.image.instructions': 'برای آپلود کافیه فایل رو بندازی اینجا',
            'ui.form.field.image.upload_button': 'آپلود فایل جدید'
        });
    }

})(angular);
