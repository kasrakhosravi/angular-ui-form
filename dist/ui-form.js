/**
 * Copyright (c) 2015 aramalipoor <aram.alipoor@gmail.com>
 */
(function(angular) {
    'use strict';

    angular
        .module('ui.form', [

            // Libraries
            'ui.bootstrap',
            'ui.bootstrap.datepicker',
            'ui.bootstrap.persian.datepicker',
            'pascalprecht.translate',
            'LocalStorageModule',
            'textAngular',
            'fcsa-number'

        ]);

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldCheckbox', uiFieldCheckbox);

    function uiFieldCheckbox(formFactory) {
        return formFactory.create({
            templateUrl: 'forms/field-checkbox/field-checkbox.html'
        });
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldChoice', uiFieldChoice);

    function uiFieldChoice(formFactory, formUtil, formApi) {
        return formFactory.create({
            link: FieldChoiceLink,
            templateUrl: 'forms/field-choice/field-choice.html',
            scope: {
                inlineOptions: '&?',
                remoteUrl: '@?',
                remoteParams: '&?',
                optionsRoot: '@?',
                valueProperty: '@?',
                labelProperty: '@?',
                selected: '=?',
                multiple: '&?',
                expanded: '&?'
            }
        });

        function FieldChoiceLink($scope) {
            var vm = $scope.vm;

            // Defaults
            setDefaults();

            // Watch for changes in parameters when remote route is set.
            if (vm.remoteUrl) {
                $scope.$watch(
                    function() {
                        return vm.remoteParams();
                    },
                    updateChoiceWidget
                );
            }

            // Set selected option when data is changed
            $scope.$watch('vm.data', updateSelectedOption);

            /**
             * Default scope variables
             */
            function setDefaults() {
                if (typeof vm.valueProperty === 'undefined') {
                    vm.valueProperty = 'value';
                }

                if (typeof vm.labelProperty === 'undefined') {
                    vm.labelProperty = 'label';
                }

                if (typeof vm.inlineOptions === 'function') {
                    var options;

                    if (vm.optionsRoot) {
                        options = formUtil.deepGet(vm.inlineOptions(), vm.optionsRoot);
                    } else {
                        options = vm.inlineOptions();
                    }

                    vm.options = normalizeOptions(options);
                }

                if (typeof vm.options === 'undefined') {
                    vm.options = [];
                }

                if (typeof vm.data === 'undefined' && vm.multiple()) {
                    vm.data = [];
                }

                if (typeof vm.data === 'undefined' && vm.options.length > 0) {
                    if (!vm.multiple()) {
                        vm.data = vm.options[0][vm.valueProperty].toString();
                    }
                }
            }

            /**
             * Updates select options based on remote route and parameters
             */
            function updateChoiceWidget() {
                vm.loading = true;
                formApi.get(vm.remoteUrl, vm.remoteParams()).then(function (options) {
                    vm.loading = false;

                    if (vm.optionsRoot) {
                        options = formUtil.deepGet(options, vm.optionsRoot);
                    }

                    vm.options = formUtil.objectValues(normalizeOptions(options)) || [];

                    if (typeof vm.data === 'undefined' && vm.options.length > 0) {
                        if (!vm.multiple()) {
                            vm.data = vm.options[0][vm.valueProperty].toString();
                        }
                    } else {
                        updateSelectedOption();
                    }
                });
            }

            /**
             * Updates selected option based on current data
             */
            function updateSelectedOption() {
                if (vm.multiple()) {
                    vm.selected = vm.options.filter(function (option) {
                        return vm.data.indexOf(option[vm.valueProperty].toString());
                    });
                } else {
                    vm.selected = vm.options.filter(function (option) {
                        return vm.data === option[vm.valueProperty].toString();
                    });

                    if (vm.selected.length) {
                        vm.selected = vm.selected[0];
                    }
                }
            }

            /**
             * Normalizes key-value pairs into an array
             * with desired structure for choice field.
             *
             * @return {Array}
             */
            function normalizeOptions(subject) {
                var normalized = [];

                for (var key in subject) {
                    if (subject.hasOwnProperty(key)) {
                        if (angular.isObject(subject[key])) {
                            normalized.push(subject[key]);
                        } else {
                            normalized.push({
                                value: key,
                                label: subject[key]
                            });
                        }
                    }
                }

                return normalized;
            }
        }
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldCollection', uiFieldCollection);

    function uiFieldCollection(formFactory, formUtil) {

        return formFactory.createTranscludable(
            'forms/field-collection/field-collection.html', FieldCollectionPostLink, {
                scope: {
                    initialValue: '&?'
                }
            }
        );

        function FieldCollectionPostLink($scope) {
            var vm = $scope.vm;

            // Bindings
            vm.addItem = addItem;
            vm.removeItem = removeItem;
            vm.toolbar = {
                add: {
                    label: 'ui.form.collection.add',
                    color: 'primary',
                    click: addItem
                }
            };

            // Default Variables
            setDefaults();

            /**
             * Default scope variables
             */
            function setDefaults() {
                if (!vm.data) {
                    vm.data = [];
                } else {
                    if (!angular.isArray(vm.data)) {
                        // Make sure we have an array with numeric indices.
                        vm.data = formUtil.objectValues(vm.data);
                    }
                }
            }

            /**
             * Adds a new item to the collection.
             */
            function addItem() {
                vm.data.push(vm.initialValue ? angular.copy(vm.initialValue()) : null);
            }

            /**
             * Removes an item from collection by index.
             *
             * @param {integer} index
             */
            function removeItem(index) {
                vm.data.splice(index, 1);
            }
        }
    }

})(angular);

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

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldColor', uiFieldColor);

    function uiFieldColor(formFactory) {
        return formFactory.create({
            templateUrl: 'forms/field-color/field-color.html'
        });
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldDatepicker', uiFieldDatepicker);

    function uiFieldDatepicker(formFactory) {
        return formFactory.create({
            templateUrl: 'forms/field-datepicker/field-datepicker.html',
            scope: {
                minDate: '&?',
                calendar: '&?'
            }
        });
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldEditor', uiFieldEditor);

    function uiFieldEditor(formFactory) {
        return formFactory.create({
            templateUrl: 'forms/field-editor/field-editor.html'
        });
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldEmail', uiFieldEmail);

    function uiFieldEmail(formFactory) {
        return formFactory.create({
            templateUrl: 'forms/field-email/field-email.html'
        });
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldImage', uiFieldImage);

    function uiFieldImage(
        formFactory
    ) {
        return formFactory.create({
            templateUrl: 'forms/field-image/field-image.html',
            scope: {
                multiple: '&?'
            },
            link: function ($scope) {
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
        });
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .config(translationsConfig);

    function translationsConfig($translateProvider) {
        $translateProvider.translations('fa_IR', {
            'ui.form.field.image.instructions': 'برای آپلود کافیه فایل رو بندازی اینجا',
            'ui.form.field.image.upload': 'آپلود فایل جدید'
        });
    }

})(angular);

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

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldImageUploader', uiFieldImageUploader);

    function uiFieldImageUploader($window, plupload, $translate, formUtil, apiRouting) {

        // Return the directive configuration.
        return {
            link: link,
            restrict: 'A',
            scope: false
        };

        // I bind the JavaScript events to the scope.
        function link($scope, element, attributes) {
            var uniqueId = Math.floor(Math.random() * 100000000);

            // The uploader has to reference the various elements using IDs. Rather than
            // crudding up the HTML, just insert the values dynamically here.
            element
                .attr('id', 'imageUploaderContainer-' + uniqueId)
                .find('.field-image-upload-button')
                    .attr('id', 'imageUploaderButton-' + uniqueId)
            ;

            // Set a reference to plupload library so that we can access status constants
            $scope.plupload = plupload;

            // Instantiate the Plupload uploader.
            //jscs:disable
            var uploader = new plupload.Uploader({

                // For this demo, we're only going to use the html5 runtime. I don't
                // want to have to deal with people who require flash - not this time,
                // I'm tired of it; plus, much of the point of this demo is to work with
                // the drag-n-drop, which isn't available in Flash.
                runtimes: 'html5',

                // Upload the image to the API.
                url: apiRouting.generateUrl('cmf_media_image_upload', {
                    editor: 'ravaj'
                }),

                // Set the name of file field (that contains the upload).
                file_data_name: 'file',

                // The container, into which to inject the Input shim.
                container: 'imageUploaderContainer-' + uniqueId,

                // The ID of the drop-zone element.
                drop_element: 'imageUploaderContainer-' + uniqueId,

                // To enable click-to-select-files, you can provide a browse button.
                // We can use the same one as the drop zone.
                browse_button: 'imageUploaderButton-' + uniqueId,

                // We don't have any parameters yet; but, let's create the object now
                // so that we can simply consume it later in the BeforeUpload event.
                multipart_params: {},

                filters: {
                    prevent_duplicates: true,
                    mime_types: [
                        {
                            title: $translate.instant('ui.form.field.image.image_mime'),
                            extensions: 'jpg,gif,png,jpeg'
                        }
                    ]
                }
            });
            //jscs:enable

            // Initialize the plupload runtime.
            uploader.bind('Error', handleError);
            uploader.bind('PostInit', handleInit);
            uploader.bind('FilesAdded', handleFilesAdded);
            uploader.bind('QueueChanged', handleQueueChanged);
            uploader.bind('BeforeUpload', handleBeforeUpload);
            uploader.bind('UploadProgress', handleUploadProgress);
            uploader.bind('FileUploaded', handleFileUploaded);
            uploader.bind('StateChanged', handleStateChanged);
            uploader.init();

            // I provide access to the file list inside of the directive. This can be
            // used to render the items being uploaded.
            $scope.queue = new PublicQueue();

            // When the window is resized, we'll have to update the dimensions of the
            // input shim.
            $window.addEventListener('resize', handleWindowResize);

            // When the scope is destroyed, clean up bindings.
            $scope.$on(
                '$destroy',
                function () {
                    $window.removeEventListener('resize', handleWindowResize);
                    uploader.destroy();
                }
            );

            // Retries to send a failed upload
            $scope.retryUpload = function (queueItem) {
                uploader.stop();
                queueItem.file.status = plupload.UPLOADING;
                uploader.state = plupload.STARTED;
                uploader.trigger('StateChanged');
                uploader.trigger('UploadFile', queueItem.file);
            };

            // Cancels an upload
            $scope.cancelUpload = function (queueItem) {
                uploader.removeFile(queueItem.file);
            };

            // ---
            // PRIVATE METHODS.
            // ---

            // I handle the before upload event where the meta data can be edited right
            // before the upload of a specific file, allowing for per-file settings.
            function handleBeforeUpload(uploader, file) {
            }

            // I handle errors that occur during initialization or general operation of
            // the Plupload instance.
            function handleError(uploader, error) {
                $scope.$apply(
                    function () {
                        $scope.queue.rebuild(uploader.files);
                        error.file.lastError = formUtil.humanize(
                            error.response ? angular.fromJson(error.response) : error
                        );
                    }
                );
            }

            // I handle the files-added event. This is different that the queue-
            // changed event. At this point, we have an opportunity to reject files from
            // the queue.
            function handleFilesAdded(uploader, files) {
                // Tell AngularJS that something has changed (the public queue will have
                // been updated at this point).
                $scope.$apply();
            }

            // I handle the file-uploaded event. At this point, the image has been
            // uploaded and thumbnailed - we can now load that image in our uploads list.
            function handleFileUploaded(uploader, file, response) {
                $scope.$apply(
                    function () {
                        // Emit the response from the server to this scope and up.
                        $scope.$emit(
                            'imageUploaded',
                            angular.fromJson(response.response)
                        );
                        // Remove the file from the internal queue.
                        uploader.removeFile(file);
                    }
                );
            }

            // I handle the init event. At this point, we will know which runtime has
            // loaded, and whether or not drag-drop functionality is supported.
            function handleInit(uploader, params) {
                console.log('Initialization complete.');
                console.log('Drag-drop supported:', !!uploader.features.dragdrop);
            }

            // I handle the queue changed event. When the queue changes, it gives us an
            // opportunity to programmatically start the upload process. This will be
            // triggered when files are both added to or removed (programmatically) from
            // the list (respectively).
            function handleQueueChanged(uploader) {
                if (uploader.files.length && isNotUploading()) {
                    uploader.start();
                }
                $scope.queue.rebuild(uploader.files);
            }

            // I handle the change in state of the uploader.
            function handleStateChanged(uploader) {
                if (isUploading()) {
                    element.addClass('uploading');
                } else {
                    element.removeClass('uploading');
                }
            }

            // I get called when upload progress is made on the given file.
            // --
            // CAUTION: This may get called one more time after the file has actually
            // been fully uploaded AND the uploaded event has already been called.
            function handleUploadProgress(uploader, file) {
                $scope.$apply(
                    function () {
                        $scope.queue.updateFile(file);
                    }
                );

            }

            // I handle the resizing of the browser window, which causes a resizing of
            // the input-shim used by the uploader.
            function handleWindowResize(event) {
                uploader.refresh();
            }

            // I determine if the upload is currently inactive.
            function isNotUploading() {
                return uploader.state === plupload.STOPPED;
            }

            // I determine if the uploader is currently uploading a file.
            function isUploading() {
                return uploader.state === plupload.STARTED;
            }
        }

        // I model the queue of files exposed by the uploader to the child DOM.
        function PublicQueue() {

            // I contain the actual data structure that is exposed to the user.
            var queue = [];

            // I index the currently queued files by ID for easy reference.
            var fileIndex = {};

            // I add the given file to the public queue.
            queue.addFile = function (file) {
                var item = {
                    id: file.id,
                    name: file.name,
                    size: file.size,
                    loaded: file.loaded,
                    percent: file.percent.toFixed(0),
                    status: file.status,
                    isUploading: (file.status === plupload.UPLOADING),
                    file: file
                };

                this.push(fileIndex[item.id] = item);
            };

            // I rebuild the queue.
            // --
            // NOTE: Currently, the implementation of this doesn't take into account any
            // optimizations for rendering. If you use 'track by' in your ng-repeat,
            // though, you should be ok.
            queue.rebuild = function (files) {
                // Empty the queue.
                this.splice(0, this.length);

                // Clear the internal index.
                fileIndex = {};

                // Add each file to the queue.
                for (var i = 0, length = files.length; i < length; i++) {
                    this.addFile(files[i]);
                }
            };

            // I update the percent loaded and state for the given file.
            queue.updateFile = function (file) {

                // If we can't find this file, then ignore -- this can happen if the
                // progress event is fired AFTER the upload event (which it does
                // sometimes).
                if (!fileIndex.hasOwnProperty(file.id)) {
                    return;
                }

                var item = fileIndex[file.id];

                item.loaded = file.loaded;
                item.percent = file.percent.toFixed(0);
                item.status = file.status;
                item.isUploading = (file.status === plupload.UPLOADING);
            };

            return queue;
        }
    }

})(angular);

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

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldNumber', uiFieldNumber);

    function uiFieldNumber(formFactory) {
        return formFactory.create({
            templateUrl: 'forms/field-number/field-number.html',
            scope: {
                append: '&?',
                prepend: '&?'
            }
        });
    }

})(angular);


(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldPassword', uiFieldPassword);

    function uiFieldPassword(formFactory) {
        return formFactory.create({
            templateUrl: 'forms/field-password/field-password.html',
            scope: {
                confirmLabel: '@'
            },
            link: function($scope) {
                var vm = $scope.vm;

                vm.confirmValue = '';

                $scope.$watch('vm.data', checkValues);
                $scope.$watch('vm.confirmValue', checkValues);

                function checkValues() {
                    if (vm.confirmValue !== vm.data) {
                        vm.raiseError('ui.field.password.mismatch');
                    } else {
                        vm.resetErrors();
                    }
                }
            }
        });
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldRow', uiFieldRow);

    function uiFieldRow() {
        return {
            restrict: 'E',
            templateUrl: 'forms/field-row/field-row.html',
            transclude: true
        };
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldTab', uiFieldTab);

    function uiFieldTab(formFactory, formApi, formUtil) {

        return formFactory.createTranscludable(
            'forms/field-tab/field-tab.html', FieldTabPostLink, {
                scope: {
                    inlineTabs: '&?',
                    remoteParams: '&?',
                    remoteUrl: '@',
                    tabsRoot: '@?',
                    valueProperty: '@',
                    labelProperty: '@'
                }
            }
        );

        function FieldTabPostLink($scope) {
            var vm = $scope.vm;

            // Defaults
            setDefaults();

            // Watch for changes in parameters when remote route is set.
            if (vm.remoteUrl) {
                $scope.$watch(
                    function() {
                        return vm.remoteParams();
                    },
                    updateRemoteTabs
                );
            }

            /**
             * Default scope variables
             */
            function setDefaults() {
                if (typeof vm.valueProperty === 'undefined') {
                    vm.valueProperty = 'value';
                }

                if (typeof vm.labelProperty === 'undefined') {
                    vm.labelProperty = 'label';
                }

                if (typeof vm.inlineTabs === 'function') {
                    var tabs;

                    if (vm.tabsRoot) {
                        tabs = formUtil.deepGet(vm.inlineTabs(), vm.tabsRoot);
                    } else {
                        tabs = vm.inlineTabs();
                    }

                    vm.tabs = normalizeTabs(tabs);
                }

                if (typeof vm.tabs === 'undefined') {
                    vm.tabs = [];
                }

                if (typeof vm.data === 'undefined') {
                    vm.data = {};
                }
            }

            /**
             * Updates tabs from remote when remote params has changed
             */
            function updateRemoteTabs() {
                vm.loading = true;
                formApi.get(vm.remoteUrl, vm.remoteParams()).then(function (tabs) {
                    vm.loading = false;

                    if (vm.tabsRoot) {
                        tabs = formUtil.deepGet(tabs, vm.tabsRoot);
                    }

                    vm.tabs = formUtil.objectValues(tabs) || [];
                });
            }

            /**
             * Normalizes key-value pairs into an array
             * with desired structure for field-tab.
             *
             * @return {Array}
             */
            function normalizeTabs(subject) {
                var normalized = [];

                for (var key in subject) {
                    if (subject.hasOwnProperty(key)) {
                        if (angular.isObject(subject[key])) {
                            normalized.push(subject[key]);
                        } else {
                            normalized.push({
                                value: key,
                                label: subject[key]
                            });
                        }
                    }
                }

                return normalized;
            }
        }
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldText', uiFieldText);

    function uiFieldText($timeout, formUtil, formFactory) {

        return formFactory.create({
            templateUrl: 'forms/field-text/field-text.html',
            scope: {
                required: '&?',
                readonly: '&?',
                disabled: '&?',
                placeholder: '@?',
                pattern: '&?'
            },
            link: uiFieldTextLink
        });

        function uiFieldTextLink($scope, $element) {
            // We need timeout to let transclusion of ui-field-row to happen before looking for a child element.
            $timeout(function () {
                formUtil.bindValidityErrors($scope, $element.find('input'));
            });
        }
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldTextarea', uiFieldTextarea);

    function uiFieldTextarea($timeout, formUtil, formFactory) {
        return formFactory.create({
            templateUrl: 'forms/field-textarea/field-textarea.html',
            scope: {
                placeholder: '@?',
                required: '&?',
                pattern: '&?'
            },
            link: uiFieldTextareaLink
        });

        function uiFieldTextareaLink($scope, $element) {
            // We need timeout to let transclusion of ui-field-row to happen before looking for a child element.
            $timeout(function () {
                formUtil.bindValidityErrors($scope, $element.find('textarea'));
            });
        }
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldTree', uiFieldTree);

    function uiFieldTree($q, formFactory, formUtil, formApi) {

        return formFactory.create({
            templateUrl: 'forms/field-tree/field-tree.html',
            link: FieldTreeLink,
            scope: {
                data: '=?ngModel',
                inlineTree: '&?',
                remoteParams: '&?',
                includeRoot: '&?',
                remoteUrl: '@?',
                treeRoot: '@?',
                valueProperty: '@?',
                labelProperty: '@?',
                multiple: '&?'
            }
        });

        function FieldTreeLink($scope) {
            var vm = $scope.vm;

            // Bindings
            vm.toggleNode = toggleNode;

            // Two-way binding to provided property or parent data directly
            formUtil.twoWayBind(
                $scope.$parent, 'vm.data' + (vm.property ? '.' + vm.property : ''),
                $scope.vm, 'data'
            );

            // Default Variables
            setDefaults();

            if (vm.remoteUrl) {
                // Watch for changes in parameters when remote route is set.
                $scope.$watch('vm.remoteParams', updateTreeNodes);
            } else {
                // Watch for changes in parameters when remote route is set.
                $scope.$watch('vm.inlineTree()', updateTreeNodes);
            }

            // Select appropriate tree nodes when field data is changed
            $scope.$watch(updateTreeSelectedNodes);

            //** Methods **//

            /**
             * Default scope variables
             */
            function setDefaults() {
                vm.selectedNodes = [];

                if (typeof vm.valueProperty === 'undefined') {
                    vm.valueProperty = 'value';
                }

                if (typeof vm.labelProperty === 'undefined') {
                    vm.labelProperty = 'label';
                }

                if (typeof vm.nodes === 'undefined') {
                    vm.nodes = {};
                }

                if (vm.multiple() && !vm.data) {
                    vm.data = [];
                }
            }

            /**
             * Updates tree nodes based on remote route and parameters
             */
            function updateTreeNodes() {
                var promise;

                if (!vm.loading) {
                    vm.loading = true;

                    if (vm.remoteUrl) {
                        promise = formApi.get(vm.remoteUrl, vm.remoteParams());
                    } else {
                        promise = $q.when(vm.inlineTree());
                    }

                    promise.then(function (result) {
                        vm.loading = false;

                        if (vm.treeRoot) {
                            result = formUtil.deepGet(result, vm.treeRoot);
                        }

                        if ('children' in result) {
                            // It's a single record, so I guess we should show it's children,
                            // except the developer explicitly asks to include the root!
                            if (vm.includeRoot()) {
                                vm.nodes = [result];
                            } else {
                                vm.nodes = formUtil.objectValues(result.children);
                            }
                        } else {
                            // Hope it's an array so what ever it is try to render all of it!
                            vm.nodes = formUtil.objectValues(result);
                        }

                        // Try to eliminate non-numeric keys on every children array.
                        walkNodes(vm.nodes, function (node) {
                            if (node.children) {
                                node.children = formUtil.objectValues(node.children);
                            }
                        });
                    });
                }
            }

            /**
             * Updates selected nodes based on provided data
             */
            function updateTreeSelectedNodes() {
                var data = vm.data;

                vm.selectedNodes = [];

                if (!data) {
                    return;
                }

                if (vm.multiple()) {
                    if (typeof data === 'object' && data.length) {
                        walkNodes(vm.nodes, function (node) {
                            var value = node[vm.valueProperty].toString();
                            if (data.indexOf(value) > -1) {
                                vm.selectedNodes.push(node);
                            }
                        });
                    }
                } else {
                    data = data.toString();
                    walkNodes(vm.nodes, function (node) {
                        if (node[vm.valueProperty].toString() === data) {
                            vm.selectedNodes.push(node);
                        }
                    });
                }
            }

            /**
             * Toggles selection of a node
             *
             * @param {object} node
             */
            function toggleNode(node) {
                var value = node[vm.valueProperty].toString();

                if (vm.multiple()) {
                    var index = vm.data.indexOf(value);
                    if (index > -1) {
                        vm.data.splice(index, 1);
                    } else {
                        vm.data.push(value);
                    }
                } else {
                    if (vm.data !== value) {
                        vm.data = value;
                    } else {
                        vm.data = null;
                    }
                }
            }

            /**
             * Walk on every node deeply.
             *
             * @param {object} nodes
             * @param {function} callback
             */
            function walkNodes(nodes, callback) {
                for (var index in nodes) {
                    if (nodes.hasOwnProperty(index)) {
                        callback(nodes[index]);
                        if ('children' in nodes[index]) {
                            walkNodes(nodes[index].children, callback);
                        }
                    }
                }
            }
        }
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldUnitValue', uiFieldUnitValue);

    function uiFieldUnitValue(formFactory, localStorageService) {

        return formFactory.create({
            templateUrl: 'forms/field-unit-value/field-unit-value.html',
            scope: {
                units: '=',
                alias: '@'
            },
            link: uiFieldUnitValueLink
        });

        function uiFieldUnitValueLink($scope) {
            var vm = $scope.vm;

            // Default Binding
            vm.selectedUnit = getDefaultUnit();
            vm.selectUnit = selectUnit;

            // Watch masked data and and change real data accordingly
            $scope.$watch('vm.maskedData', transform);

            // Watch real data and change masked data accordingly
            $scope.$watch('vm.data', reverse);

            // Watch selected unit and change the masked data based on the type of selected unit
            $scope.$watch('vm.selectedUnit', function () {
                reverse(vm.data);
            });

            /**
             * Selects a unit.
             *
             * @param {object} unit
             */
            function selectUnit(unit) {
                vm.selectedUnit = unit;
                setDefaultUnit(unit);
            }

            /**
             * Calculates real data based on current masked data and selected unit,
             * and changes real data to calculated value.
             *
             * @param {object} maskedData
             */
            function transform(maskedData) {
                if (typeof maskedData !== 'undefined') {
                    vm.data = vm.maskedData * vm.selectedUnit.division;
                }
            }

            /**
             * Calculates masked data based on current real data and selected unit,
             * and changes masked data to calculated value.
             *
             * @param {object} data
             */
            function reverse(data) {
                if (typeof data !== 'undefined') {
                    vm.maskedData = data / vm.selectedUnit.division;
                }
            }

            /**
             * Returns default unit based on last selected unit by the user,
             * or first unit if it's the first time that this directive is being rendered.
             *
             * @returns {object}
             */
            function getDefaultUnit() {
                var storedUnitDivision, i, c;

                storedUnitDivision = localStorageService.get(
                    'field-unit-value-' + vm.alias + '-division'
                );

                if (typeof storedUnitDivision === 'number') {
                    for (i = 0, c = vm.units.length; i < c; i++) {
                        if (vm.units[i].division === storedUnitDivision) {
                            return vm.units[i];
                        }
                    }
                }

                return vm.units[0];
            }

            /**
             * Saves a unit into local storage for future reference.
             *
             * @see getDefaultUnit
             * @param {object} unit
             */
            function setDefaultUnit(unit) {
                localStorageService.set(
                    'field-unit-value-' + vm.alias + '-division', unit.division
                );
            }
        }
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFieldset', uiFieldset);

    function uiFieldset(formFactory) {
        return formFactory.createTranscludable(
            'forms/fieldset/fieldset.html', {
                scope: {
                    legend: '&?'
                }
            }
        );
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .service('formApi', formApi);

    function formApi($http) {
        return {
            get: get
        };

        // -- Public Methods -- //

        /**
         * @param {string} url Url to send a GET request to.
         * @param {Array} parameters [Optional] Query string parameters to add to end of the url.
         * @param {Array} options [Optional] Additional $http options.
         * @returns {Deferred.promise}
         */
        function get(url, parameters, options) {
            return $http.get(buildUrl(url, parameters), options)
                .then(function (response) {
                    return response.data;
                })
            ;
        }

        // -- Private Methods -- //

        function buildUrl(url, parameters) {
            var qs = '', key, value;

            for (key in parameters) {
                if (parameters.hasOwnProperty(key)) {
                    value = parameters[key];
                    qs += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
                }
            }

            if (qs.length > 0) {
                qs = qs.substring(0, qs.length - 1); //chop off last "&"
                url = url + '?' + qs;
            }

            return url;
        }
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .factory('formFactory', formFactory);

    function formFactory($templateCache, $compile, formUtil) {
        return {
            create: createSimpleDirective,
            createTranscludable: createTranscludableDirective
        };

        /**
         * Creates a simple form element (a field or a form)
         *
         * @param {object} options
         *
         * @returns {*}
         */
        function createSimpleDirective(options) {
            return formUtil.defaults(options || {}, {
                restrict: 'E',
                controller: 'FormController',
                bindToController: true,
                controllerAs: 'vm',
                require: '?ngModel',
                scope: {
                    label: '@?',
                    help: '@?',
                    property: '@?',
                    data: '=?ngModel',
                    loading: '=?',
                    errors: '=?',
                    debug: '&?'
                    // TODO Add disabled, required, pattern
                }
            });
        }

        /**
         * Creates a field which can have transcluded content.
         *
         * The difference between using this helper and using ng-transclude is that it does not try to
         * compile the content before transclusion so that you can for example put your transcluded content
         * inside an ng-repeat in your template. See ui-field-collection as real example.
         *
         * @param {string} templateUrl Template path to load in which you should place a
         *                              <ui-transclude-here> element for content transclusion.
         * @param {function} postLink  A function to run after in post-link phase. Usually used
         *                              to add custom methods and properties to field's scope.
         *                              You can access access $scope in first argument and controller
         *                              in $scope.vm property.
         *                              Signature of this function is following angular directive's post-link
         *                              functions.
         * @param {object} options     These options will directly be injected in directive's definition,
         *                              Usually used to add additional scope-attribute bindings.
         *                              e.g. A `multiple` one-way binding to be used in field-choice.
         *
         * @returns {object}            An angular directive definition.
         */
        function createTranscludableDirective(templateUrl, postLink, options) {
            if (typeof postLink == 'object') {
                options = postLink;
                postLink = angular.noop;
            }

            return createSimpleDirective(formUtil.defaults(options || {}, {
                compile: compileTranscludable
            }));

            function compileTranscludable(tElement) {
                var content = tElement[0].innerHTML;
                tElement.html('');

                function linkTranscludable($scope, iElement) {
                    var templateEl = $(angular.element($templateCache.get(templateUrl)));
                    templateEl.find('ui-transclude-here').replaceWith(content);

                    iElement.html('');
                    iElement.append($compile(templateEl)($scope));

                    if (postLink) {
                        postLink.apply(null, arguments);
                    }
                }

                return linkTranscludable;
            }
        }
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .factory('formUtil', formUtil);

    function formUtil($injector, $parse) {
        var objectPath = objectPathFactory();

        return {
            bindValidityErrors: bindValidityErrors,
            defaults: generateDefaultsFn(),
            formatNumber: formatNumber,
            humanize: humanize,
            objectValues: objectValues,
            twoWayBind: twoWayBind,
            deepGet: objectPath.get,
            deepSet: objectPath.set
        };

        /**
         * Binds a field's FormController to validity errors of an element inside that ui-field.
         * @param {object} $scope The scope in which this element belongs to. Usually its holding directive.
         * @param {object} $element The element to look for validity errors on its ngModel controller.
         */
        function bindValidityErrors($scope, $element) {
            var ngModel = $element.controller('ngModel'),
                vm = $scope.vm;

            $scope.$watchCollection(
                function () {
                    return ngModel.$error;
                },
                function (errors) {
                    vm.resetErrors();
                    for (var name in errors) {
                        vm.raiseError('ui.form.error.' + name);
                    }
                }
            );
        }

        function generateDefaultsFn() {
            return _.partialRight(_.merge, function recursiveDefaults() {
                // Ensure dates and arrays are not recursively merged
                if (_.isArray(arguments[0]) || _.isDate(arguments[0])) {
                    return arguments[0];
                }
                return _.merge(arguments[0], arguments[1], recursiveDefaults);
            });
        }

        function formatNumber(number, decimals, decPoint, thousandsSep) {
            number = (number + '')
                .replace(/[^0-9+\-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep,
                dec = (typeof decPoint === 'undefined') ? '.' : decPoint,
                s = '',
                toFixedFix = function(n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + (Math.round(n * k) / k)
                            .toFixed(prec);
                };
            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
                .split('.');
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }
            if ((s[1] || '')
                    .length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1)
                    .join('0');
            }
            return s.join(dec);
        }

        function humanize(input, walkOnKeys) {
            var textuals = [],
                inputCopy = angular.copy(input),
                textMapper = function (value) {
                    return value;
                };

            if (typeof inputCopy === 'object') {
                var keys = ['statusText', 'message', 'errors', 'children', 'data'],
                    key, index, error;
                for (index in keys) {
                    if (keys.hasOwnProperty(index)) {
                        key = keys[index];
                        if (inputCopy.hasOwnProperty(key)) {
                            error = humanize(inputCopy[key], key === 'children');
                            if (error) {
                                textuals.push(error);
                                delete inputCopy[key];
                            }
                        }
                    }
                }

                var subject, subjectErrors;
                for (subject in inputCopy) {
                    if (inputCopy.hasOwnProperty(subject)) {
                        if (parseFloat(subject) > -1 &&
                            typeof inputCopy[subject] === 'string') {
                            textuals.push(inputCopy[subject]);
                        } else if (walkOnKeys) {
                            subjectErrors = humanize(inputCopy[subject]);
                            if (subjectErrors) {
                                textuals.push('[' + subject + ']: ' + subjectErrors);
                            }
                        }
                    }
                }
            } else {
                textuals.push(inputCopy.toString ? inputCopy.toString() : inputCopy);
            }

            if ($injector.has('$translate')) {
                textMapper = $injector.get('$translate').instant;
            }

            return textuals.map(textMapper).join('\n');
        }

        function objectValues(input) {
            var tmpArr = [], key;

            for (key in input) {
                if (input.hasOwnProperty(key)) {
                    tmpArr[tmpArr.length] = input[key];
                }
            }

            return tmpArr;
        }

        function twoWayBind(parentScope, parentName, bindingContext, scopeName, isCollection) {
            var lastValue,
                parentGet, parentSet, compare;

            parentGet = $parse(parentName);

            if (parentGet.literal) {
                compare = angular.equals;
            } else {
                compare = function(a, b) { return a === b || (a !== a && b !== b); };
            }

            parentSet = parentGet.assign || function() {
                // reset the change, or we will throw this exception on every $digest
                lastValue = bindingContext[scopeName] = parentGet(parentScope);
                throw new Error('Expression `' + scopeName + '` is non-assignable!');
            };

            lastValue = bindingContext[scopeName] = parentGet(parentScope);

            var parentValueWatch = function parentValueWatch(parentValue) {
                if (!compare(parentValue, bindingContext[scopeName])) {
                    // we are out of sync and need to copy
                    if (!compare(parentValue, lastValue)) {
                        // parent changed and it has precedence
                        bindingContext[scopeName] = parentValue;
                    } else {
                        // if the parent can be assigned then do so
                        parentSet(parentScope, parentValue = bindingContext[scopeName]);
                    }
                }
                return lastValue = parentValue;
            };

            parentValueWatch.$stateful = true;

            var unwatch;
            if (isCollection) {
                unwatch = parentScope.$watchCollection(parentName, parentValueWatch);
            } else {
                unwatch = parentScope.$watch(
                    $parse(parentName, parentValueWatch),
                    null,
                    parentGet.literal
                );
            }

            parentScope.$on('$destroy', unwatch);
        }
    }

    function objectPathFactory() {
        var
            toStr = Object.prototype.toString,
            _hasOwnProperty = Object.prototype.hasOwnProperty;

        function isEmpty(value) {
            if (!value) {
                return true;
            }
            if (isArray(value) && value.length === 0) {
                return true;
            } else if (!isString(value)) {
                for (var i in value) {
                    if (_hasOwnProperty.call(value, i)) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }

        function toString(type) {
            return toStr.call(type);
        }

        function isNumber(value) {
            return typeof value === 'number' || toString(value) === '[object Number]';
        }

        function isString(obj) {
            return typeof obj === 'string' || toString(obj) === '[object String]';
        }

        function isObject(obj) {
            return typeof obj === 'object' && toString(obj) === '[object Object]';
        }

        function isArray(obj) {
            return typeof obj === 'object' && typeof obj.length === 'number' &&
                toString(obj) === '[object Array]';
        }

        function isBoolean(obj) {
            return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
        }

        function getKey(key) {
            var intKey = parseInt(key);
            if (intKey.toString() === key) {
                return intKey;
            }
            return key;
        }

        function set(obj, path, value, doNotReplace) {
            if (isNumber(path)) {
                path = [path];
            }
            if (isEmpty(path)) {
                return obj;
            }
            if (isString(path)) {
                return set(obj, path.split('.').map(getKey), value, doNotReplace);
            }
            var currentPath = path[0];

            if (path.length === 1) {
                var oldVal = obj[currentPath];
                if (oldVal === void 0 || !doNotReplace) {
                    obj[currentPath] = value;
                }
                return oldVal;
            }

            if (obj[currentPath] === void 0) {
                //check if we assume an array
                if (isNumber(path[1])) {
                    obj[currentPath] = [];
                } else {
                    obj[currentPath] = {};
                }
            }

            return set(obj[currentPath], path.slice(1), value, doNotReplace);
        }

        function del(obj, path) {
            if (isNumber(path)) {
                path = [path];
            }

            if (isEmpty(obj)) {
                return void 0;
            }

            if (isEmpty(path)) {
                return obj;
            }
            if (isString(path)) {
                return del(obj, path.split('.'));
            }

            var currentPath = getKey(path[0]);
            var oldVal = obj[currentPath];

            if (path.length === 1) {
                if (oldVal !== void 0) {
                    if (isArray(obj)) {
                        obj.splice(currentPath, 1);
                    } else {
                        delete obj[currentPath];
                    }
                }
            } else {
                if (obj[currentPath] !== void 0) {
                    return del(obj[currentPath], path.slice(1));
                }
            }

            return obj;
        }

        var objectPath = function(obj) {
            return Object.keys(objectPath).reduce(function(proxy, prop) {
                /*istanbul ignore else*/
                if (typeof objectPath[prop] === 'function') {
                    proxy[prop] = objectPath[prop].bind(objectPath, obj);
                }

                return proxy;
            }, {});
        };

        objectPath.has = function (obj, path) {
            if (isEmpty(obj)) {
                return false;
            }

            if (isNumber(path)) {
                path = [path];
            } else if (isString(path)) {
                path = path.split('.');
            }

            if (isEmpty(path) || path.length === 0) {
                return false;
            }

            for (var i = 0; i < path.length; i++) {
                var j = path[i];
                if ((isObject(obj) || isArray(obj)) && _hasOwnProperty.call(obj, j)) {
                    obj = obj[j];
                } else {
                    return false;
                }
            }

            return true;
        };

        objectPath.ensureExists = function (obj, path, value) {
            return set(obj, path, value, true);
        };

        objectPath.set = function (obj, path, value, doNotReplace) {
            return set(obj, path, value, doNotReplace);
        };

        objectPath.insert = function (obj, path, value, at) {
            var arr = objectPath.get(obj, path);
            at = ~~at;
            if (!isArray(arr)) {
                arr = [];
                objectPath.set(obj, path, arr);
            }
            arr.splice(at, 0, value);
        };

        objectPath.empty = function(obj, path) {
            if (isEmpty(path)) {
                return obj;
            }
            if (isEmpty(obj)) {
                return void 0;
            }

            var value, i;
            if (!(value = objectPath.get(obj, path))) {
                return obj;
            }

            if (isString(value)) {
                return objectPath.set(obj, path, '');
            } else if (isBoolean(value)) {
                return objectPath.set(obj, path, false);
            } else if (isNumber(value)) {
                return objectPath.set(obj, path, 0);
            } else if (isArray(value)) {
                value.length = 0;
            } else if (isObject(value)) {
                for (i in value) {
                    if (_hasOwnProperty.call(value, i)) {
                        delete value[i];
                    }
                }
            } else {
                return objectPath.set(obj, path, null);
            }
        };

        objectPath.push = function (obj, path /*, values */) {
            var arr = objectPath.get(obj, path);
            if (!isArray(arr)) {
                arr = [];
                objectPath.set(obj, path, arr);
            }

            arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
        };

        objectPath.coalesce = function (obj, paths, defaultValue) {
            var value;

            for (var i = 0, len = paths.length; i < len; i++) {
                if ((value = objectPath.get(obj, paths[i])) !== void 0) {
                    return value;
                }
            }

            return defaultValue;
        };

        objectPath.get = function (obj, path, defaultValue) {
            if (isNumber(path)) {
                path = [path];
            }
            if (isEmpty(path)) {
                return obj;
            }
            if (isEmpty(obj)) {
                return defaultValue;
            }
            if (isString(path)) {
                return objectPath.get(obj, path.split('.'), defaultValue);
            }

            var currentPath = getKey(path[0]);

            if (path.length === 1) {
                if (obj[currentPath] === void 0) {
                    return defaultValue;
                }
                return obj[currentPath];
            }

            return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
        };

        objectPath.del = function(obj, path) {
            return del(obj, path);
        };

        return objectPath;
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .controller('FormController', FormController);

    function FormController($rootScope, $scope, $element, formUtil) {
        var vm = this;

        // Mark this scope as a ui-form/ui-field-* type.
        vm.$$isUiType = true;

        // Bind this field's data to appropriate destination (by ng-model or property).
        _bindData();

        // If errors attribute is not by user it means we should ask parent for errors (if there's any).
        if (!$element.attr('errors')) {
            _bindToErrorsFromParent();
        }

        // Add common class
        $element.addClass('ui-type');

        // Reset errors when data has changed.
        $scope.$watch('vm.data', resetErrors, true);

        // Public methods
        vm.hasAnyError = hasAnyError;
        vm.raiseError = raiseError;
        vm.resetErrors = resetErrors;

        return this;

        //-- Public Methods --//

        /**
         * Returns true if one of the children has any error.
         *
         * @returns {object}
         */
        function hasAnyError() {
            var found = false;

            if (typeof vm.errors === 'object') {
                _deepWalkOnErrors(vm.errors, function (errors) {
                    if (errors.length > 0) {
                        found = true;
                    }
                });
            }

            return found;
        }

        /**
         * Appends a new error to errors of view model.
         */
        function raiseError(message) {
            if (typeof vm.errors === 'undefined') {
                vm.errors = {};
            }

            if (typeof vm.errors.errors === 'undefined') {
                vm.errors.errors = [];
            }

            if (vm.errors.errors.indexOf(message) === -1) {
                vm.errors.errors.push(message);
            }
        }

        /**
         * Resets current field errors.
         */
        function resetErrors() {
            vm.errors = {
                errors: [],
                children: {}
            };
        }

        //-- Private Methods --//

        /**
         * Binds this form/field data back to a property binding or ng-model.
         *
         * Make a two-way binding to parent scope based on property name provided.
         * Since every parent (whether form root or another field) is bound through `vm` binding context
         * and the data is available on `data` key we can easily bind
         * from $parent.vm.data[vm.property] to this field's vm.data.
         *
         * If vm.property is not provided (like in fieldset) it means
         * we do not need to walk down the data hierarchy so we want a binding from $parent.vm.data to field's vm.data.
         * Note that we cannot leave this job to scope prototypical nature since we're working with isolated scopes.
         */
        function _bindData() {
            var propertyPath = vm.property ? ('["' + vm.property + '"]') : '',
                $parent;

            if (vm.property || !$element.attr('ng-model')) {
                $parent = _findScopeOfNearestParentField($scope);

                if (!$parent) {
                    throw new Error('Could not find any form parent. ' +
                    'Maybe you should at least one of `ng-model` or `property` attributes for your field.');
                }

                formUtil.twoWayBind(
                    $parent, 'vm.data' + propertyPath,
                    vm, 'data'
                );
            }
        }

        /**
         * This method tries to bind to errors provided by parent form/field.
         *
         * To access error strings in template you should use vm.errors.errors,
         * and to access children ErrorObjects you should use vm.errors.children which
         * contains an associative array of children ErrorObjects.
         */
        function _bindToErrorsFromParent() {
            var $parent = _findScopeOfNearestParentField($scope);

            // No parent so silently skip errors binding.
            if (!$parent) {
                return;
            }

            // Watch parent errors because it contains this field's errors.
            $parent.$watch('vm.errors', function (parentErrorObject) {
                if (typeof parentErrorObject === 'object') {
                    if (vm.property) {
                        if (parentErrorObject.children && parentErrorObject.children[vm.property]) {
                            vm.errors = parentErrorObject.children[vm.property];
                        }
                    } else {
                        // No property is set so skip the hierarchy.
                        vm.errors = parentErrorObject;
                    }
                }
            });

            // Send any changes on this field's errors back to parent.
            $scope.$watch('vm.errors', function (errorObject) {
                if (!angular.isObject($parent.vm.errors)) {
                    $parent.vm.errors = {};
                }

                if (vm.property) {
                    if (!angular.isObject($parent.vm.errors.children)) {
                        $parent.vm.errors.children = {};
                    }

                    $parent.vm.errors.children[vm.property] = errorObject;
                } else {
                    // No property is set so skip the hierarchy.
                    $parent.vm.errors = errorObject;
                }
            });
        }

        /**
         * Walks up the scope hierarchy to find nearest parent scope which is a field or form.
         *
         * @param {object} $scope
         *
         * @returns {object|null}
         */
        function _findScopeOfNearestParentField($scope) {
            if ($scope === $rootScope) {
                return null;
            }

            if ($scope.$parent.vm && $scope.$parent.vm.$$isUiType) {
                return $scope.$parent;
            } else {
                return _findScopeOfNearestParentField($scope.$parent);
            }
        }

        /**
         * Walks down the errors tree of a subject and fires a callback on errors of every item.
         *
         * @param {object} subject = children: [...], errors: [...]
         * @param {function} callback(errors)
         */
        function _deepWalkOnErrors(subject, callback) {
            var index;

            if (!subject) {
                return;
            }

            if (typeof subject.children === 'object') {
                for (index in subject.children) {
                    if (subject.children.hasOwnProperty(index)) {
                        _deepWalkOnErrors(subject.children[index], callback);
                    }
                }
            }

            if (typeof subject.errors !== 'undefined') {
                callback(subject.errors);
            }
        }
    }

})(angular);

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

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiForm', uiForm);

    function uiForm(formFactory) {
        return formFactory.createTranscludable('forms/form/form.html');
    }

})(angular);

(function(angular) {
    'use strict';

    angular
        .module('ui.form')
        .directive('uiFormLoading', uiFormLoading);

    function uiFormLoading() {
        return {
            restrict: 'AE',
            templateUrl: 'forms/loading/loading.html'
        };
    }

})(angular);
