(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .config(translationsConfig);

    function translationsConfig($translateProvider) {
        $translateProvider.translations('en_US', {
            'ui.form.field.image.instructions': 'Drop files to upload',
            'ui.form.field.image.browse_button': 'Browse files',
            'ui.form.field.image.upload_button': 'Upload files'
        });

        $translateProvider.translations('fa_IR', {
            'ui.form.field.image.instructions': 'برای آپلود کافیه فایل رو بندازی اینجا',
            'ui.form.field.image.browse_button': 'انتخاب فایل موجود',
            'ui.form.field.image.upload_button': 'آپلود فایل جدید'

        });
    }

})(angular);
