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
                'src/form.bs.scss'
            ],
            material: [
                'src/form.md.scss'
            ]
        },
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