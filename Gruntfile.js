module.exports = function ( grunt ) {

    /**
     * Load required Grunt tasks. These are installed based on the versions listed
     * in `package.json` when you do `npm install` in this directory.
     */
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');

    /**
     * Load in our build configuration file.
     */
    var userConfig = require( './build.config.js' );

    /**
     * This is the configuration object Grunt uses to give each plugin its
     * instructions.
     */
    var taskConfig = {

        pkg: grunt.file.readJSON("package.json"),

        meta: {
            banner:
                '/**\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' */\n'
        },

        /**
         * Code sniffer
         */
        jscs: {
            all: {
                options: {
                    config: '.jscsrc'
                },
                src: [ 'src/**/*.js' ]
            }
        },

        /**
         * `jshint` defines the rules of our linter as well as which files we
         * should check. This file, all javascript sources, and all our unit tests
         * are linted based on the policies listed in `options`. But we can also
         * specify exclusionary patterns by prefixing them with an exclamation
         * point (!); this is useful when code comes from a third party but is
         * nonetheless inside `src/`.
         */
        jshint: {
            src: [
                '<%= app.scripts %>'
            ],
            test: [
                '<%= app.tests %>'
            ],
            gruntfile: [
                'Gruntfile.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true
            },
            globals: {}
        },

        /**
         * Concatenates multiple source files into a single file.
         */
        concat: {
            app: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: [
                    '<%= app.scripts %>'
                ],
                dest: '<%= dist_dir %>/ui-form.js'
            },
            docs: {
                src: [
                    '<%= docs.scripts %>'
                ],
                dest: 'docs/dist/ui-form-docs.js'
            }
        },

        /**
         * `ngAnnotate` annotates the sources before minifying. That is, it allows us
         * to code without the array syntax.
         */
        ngAnnotate: {
            app: {
                files: [
                    {
                        src: '<%= dist_dir %>/ui-form.js',
                        dest: '<%= dist_dir %>/ui-form.js'
                    }
                ]
            }
        },

        /**
         * Minify the sources!
         */
        uglify: {
            options: {
                sourceMap: true
            },
            all: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dist_dir %>',
                        src: [ '*.js', '!*.min.js' ],
                        dest: '<%= dist_dir %>',
                        ext: '.min.js'
                    }
                ]
            }
        },

        /**
         * Compile SASS styles
         */
        sass: {
            material: {
                src: [
                    '<%= app.styles.material %>'
                ],
                dest: '<%= dist_dir %>/ui-form-material.css'
            },
            bootstrap: {
                src: [
                    '<%= app.styles.bootstrap %>'
                ],
                dest: '<%= dist_dir %>/ui-form-bootstrap.css'
            }
        },

        /**
         * Add browser prefixes
         */
        autoprefixer: {
            dist: {
                src: '<%= dist_dir %>/*.css'
            }
        },

        /**
         * Compile angular templates to a JS file
         */
        ngtemplates: {
            /**
             * These are the material templates from `src/` prefixed with .md.html.
             */
            material: {
                options: {
                    module: 'ui.form',
                    url: function(url) {
                        return url.replace('src/', 'ui-form/').replace('.md.html', '.html');
                    }
                },
                src: '<%= app.templates.material %>',
                dest: '<%= dist_dir %>/ui-form-templates-material.js'
            },

            /**
             * These are the bootstrap templates from `src/` prefixed with .md.html.
             */
            bootstrap: {
                options: {
                    module: 'ui.form',
                    url: function(url) {
                        return url.replace('src/', 'ui-form/').replace('.bs.html', '.html');
                    }
                },
                src: '<%= app.templates.bootstrap %>',
                dest: '<%= dist_dir %>/ui-form-templates-bootstrap.js'
            },

            /**
             * These are the templates we use in docs and examples.
             */
            docs: {
                options: {
                    module: 'ui.form.docs',
                    url: function(url) {
                        return 'ui-form/' + url.replace('src/', '');
                    }
                },
                src: 'docs/src/**/*.html',
                dest: 'docs/dist/ui-form-docs-templates.js'
            }
        },

        /**
         * The Karma configurations.
         */
        karma: {
            options: {
                configFile: '<%= build_dir %>/karma-unit.js',
                logLevel: 'ERROR'
            },
            unit: {
                port: 9019,
                background: true
            },
            continuous: {
                singleRun: true
            }
        },

        /**
         * This task compiles the karma template so that changes to its file array
         * don't have to be managed manually.
         */
        karmaconfig: {
            unit: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor.scripts %>',
                    'bower_components/angular-mocks/angular-mocks.js',
                    '<%= app.scripts %>',
                    '<%= ngtemplates.bootstrap.dest %>', // We only test with bootstrap templates.
                    '<%= app.tests %>'
                ]
            }
        },

        /**
         * And for rapid development, we have a watch set up that checks to see if
         * any of the files listed below change, and then to execute the listed
         * tasks when they do. This just saves us from having to type "grunt" into
         * the command-line every time we want to see what we're working on; we can
         * instead just leave "grunt watch" running in a background terminal. Set it
         * and forget it, as Ron Popeil used to tell us.
         *
         * But we don't need the same thing to happen for all the files.
         */
        delta: {
            /**
             * When the javascript files change, we need to build them.
             */
            scripts: {
                files: [
                    '<%= app.scripts %>',
                    '<%= docs.scripts %>'
                ],
                tasks: [ 'jshint:src', 'karma:unit:run', 'concat' ]
            },

            /**
             * When our templates change, we only rewrite the template cache.
             */
            templates: {
                files: [
                    '<%= app.templates.bootstrap %>',
                    '<%= app.templates.material %>'
                ],
                tasks: [ 'ngtemplates' ]
            },

            /**
             * When the CSS files change, we need to compile and minify them.
             */
            sass: {
                files: [ 'src/**/*.scss' ],
                tasks: [ 'sass', 'autoprefixer' ]
            }
        }
    };

    grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

    /**
     * A utility function to get all app JavaScript sources.
     */
    function filterForJS ( files ) {
        return files.filter( function ( file ) {
            return file.match( /\.js$/ );
        });
    }

    /**
     * In order to make it safe to just compile or copy *only* what was changed,
     * we need to ensure we are starting from a clean, fresh build. So we rename
     * the `watch` task to `delta` (that's why the configuration var above is
     * `delta`) and then add a new task called `watch` that does a clean compile
     * before watching for changes.
     */
    grunt.renameTask( 'watch', 'delta' );
    grunt.registerTask( 'watch', [ 'build', 'karma:unit', 'delta' ] );

    /**
     * The default task is to build and compile.
     */
    grunt.registerTask( 'default', [ 'compile' ] );

    /**
     * The `build` task gets your app ready to run for development and testing.
     */
    grunt.registerTask( 'build', [
        'jscs', 'jshint', 'ngtemplates', 'concat', 'sass', 'autoprefixer'
    ]);

    /**
     * The `test` task builds your app and runs all tests.
     */
    grunt.registerTask( 'test', [
        'build', 'karmaconfig', 'karma:continuous'
    ]);

    /**
     * The `compile` task makes your app ready for production use.
     */
    grunt.registerTask( 'compile', [
        'build', 'ngAnnotate', 'uglify'
    ]);

    /**
     * In order to avoid having to specify manually the files needed for karma to
     * run, we use grunt to manage the list for us. The `karma/*` files are
     * compiled as grunt templates for use by Karma. Yay!
     */
    grunt.registerMultiTask( 'karmaconfig', 'Process karma config templates', function () {
        var jsFiles = filterForJS( this.filesSrc );

        grunt.file.copy( 'tests/karma/karma-unit.tpl.js', grunt.config( 'build_dir' ) + '/karma-unit.js', {
            process: function ( contents, path ) {
                return grunt.template.process( contents, {
                    data: {
                        scripts: jsFiles
                    }
                });
            }
        });
    });
};