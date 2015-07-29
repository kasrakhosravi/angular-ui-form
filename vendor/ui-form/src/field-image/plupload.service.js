(function(angular) {
    'use strict';

    if (plupload) {
        angular
            .module('ui.form')

            // Return the global Plupload reference so that it can be injected,
            // proper-like, into our directives.
            .constant('plupload', plupload)

            // Return the global mOxie reference so that it can be injected,
            // proper-like, into our directives.
            .constant('mOxie', mOxie);
    } else {
        console.log('ui-form could not find plupload, are you sure its script file is included before ui-form.js?');
    }

})(angular);
