(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldImage', uiFieldImage);

    function uiFieldImage(formFactory) {

        return formFactory.create({
            templateUrl: 'ui-form/field-image/field-image.html',
            scope: {
                multiple: '&?',
                browseButton: '&?'
            },
            link: uiFieldImageLink
        });

        function uiFieldImageLink($scope) {
            var vm = $scope.vm;

            // Initial scope variables
            if (vm.multiple()) {
                if (!angular.isArray(vm.data)) {
                    vm.data = [];
                }
            }

            // Method bindings
            vm.addImage = addImage;
            vm.removeImage = removeImage;

            // I handle upload events for the images (ie, the response from the server).
            $scope.$on('imageUploaded', handleImageUploaded);

            // I delete an image from the collection.
            function removeImage(image) {
                if (vm.multiple()) {
                    return vm.data.splice(vm.data.indexOf(image), 1);
                } else {
                    vm.data = null;
                }
            }

            // I add an image to the collection.
            function addImage(image) {
                if (vm.multiple()) {
                    if (typeof vm.data === 'undefined' || null === vm.data) {
                        vm.data = [];
                    }

                    return vm.data.push(image);
                } else {
                    vm.data = image;
                }
            }

            // I handle upload events for the images (ie, the response from the server).
            function handleImageUploaded(event, image) {
                addImage(image);
            }
        }
    }

})(angular);
