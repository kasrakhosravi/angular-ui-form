(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldImagePreview', uiFieldImagePreview);

    function uiFieldImagePreview(mOxie) {

        // Return the directive configuration.
        return {
            link: link,
            restrict: 'E',
            scope: {
                image: '&'
            }
        };

        // I take the given File object (as presented by
        // Plupoload), and show the client-side-only preview of
        // the selected image object.
        function link($scope, element, attributes) {
            var image = $(new Image()).appendTo(element);

            // Create an instance of the mOxie Image object. This
            // utility object provides several means of reading in
            // and loading image data from various sources.
            // --
            // Wiki: https://github.com/moxiecode/moxie/wiki/Image
            var preloader = new mOxie.Image();

            // Define the onload BEFORE you execute the load()
            // command as load() does not execute async.
            preloader.onload = function() {

                // This will scale the image (in memory) before it
                // tries to render it. This just reduces the amount
                // of Base64 data that needs to be rendered.
                preloader.downsize(300, 300);

                // Now that the image is preloaded, grab the Base64
                // encoded data URL. This will show the image
                // without making an Network request using the
                // client-side file binary.
                image.prop('src', preloader.getAsDataURL());
            };

            // Calling the .getSource() on the file will return an
            // instance of mOxie.File, which is a unified file
            // wrapper that can be used across the various runtimes.
            // --
            // Wiki: https://github.com/moxiecode/plupload/wiki/File
            preloader.load($scope.image().getSource());
        }
    }

})(angular);
