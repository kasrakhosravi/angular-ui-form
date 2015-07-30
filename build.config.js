/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    dist_dir: 'dist',
    build_dir: 'build',
    app: {
        scripts: [
            'src/**/*.module.js',
            'src/**/*.constants.js',
            'src/**/*.js',
            '!src/**/*.spec.js'
        ],
        templates: {
            bootstrap: [
                'src/**/*.bs.html'
            ],
            material: [
                'src/**/*.md.html'
            ]
        },
        styles: {
            bootstrap: [
                'src/forms.bs.scss'
            ],
            material: [
                'src/forms.md.scss'
            ]
        },
        assets: [
            // By distributing our e2e helpers we help applications to write e2e tests on their forms.
            'tests/integration/helpers/**/*'
        ],
        tests: [
            'tests/unit/**/*.spec.js'
        ]
    },

    vendor: {
        scripts: [

            // Primary Libraries
            'bower_components/lodash/lodash.js',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',

            // Angular
            'bower_components/angular/angular.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-bootstrap/ui-bootstrap.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/angular-translate/angular-translate.js',
            'bower_components/angular-ui-tree/dist/angular-ui-tree.js',
            'bower_components/angular-local-storage/dist/angular-local-storage.js',
            'bower_components/textAngular/dist/textAngular-rangy.min.js',
            'bower_components/textAngular/dist/textAngular-sanitize.min.js',
            'bower_components/textAngular/dist/textAngular.min.js',

            // Media & Upload Libraries
            'bower_components/plupload/js/moxie.js',
            'bower_components/plupload/js/plupload.dev.js',

            // Date
            'bower_components/angular-bootstrap-persian-datepicker/persiandate.js',
            'bower_components/angular-bootstrap-persian-datepicker/persian-datepicker-tpls.js',
            'bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',

            // Utility
            'bower_components/angular-fcsa-number/src/fcsaNumber.js'
        ]
    },

    docs: {
        scripts: [
            'docs/src/app.js',
            'docs/src/**/*.js'
        ]
    }
};