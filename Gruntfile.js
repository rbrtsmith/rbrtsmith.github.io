module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),



/*------------------------------------*\
    #PROJECT BANNER
\*------------------------------------*/
        tag: {
          banner: '/*!\n' +
                  ' * <%= pkg.name %>\n' +
                  ' * <%= pkg.url %>\n' +
                  ' * @author(s) <%= pkg.author %>\n' +
                  ' * @version <%= pkg.version %>\n' +
                  ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
                  ' */\n'
        },







/*------------------------------------*\
    #JAVASCRIPT
\*------------------------------------*/

        jshint: {
            all: [
                'Gruntfile.js', 
                '_js/*.js',
            ]
        },


        concat: {
            options: {
                banner: '<%= tag.banner %>'
            },
            dist: {
                src: ['js/source/main.js', 
                      'js/source/components/*.js'], 
                dest: 'js/build/main.js',
            },
        },

        
        uglify: {
            build: {
                files: {
                    'js/build/main.min.js' : 'js/build/main.js',
                },
                options : {
                    banner: '<%= tag.banner %>'
                } 
            }
        },







/*------------------------------------*\
    #CSS
\*------------------------------------*/

        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    banner: '<%= tag.banner %>',
                    compass: false
                },
                files: {
                    'css/style.css': '_scss/main.scss'
                }
            }
        },


        autoprefixer: {
            options: {
                browsers: ['last 8 version', 'ie 9']
            },
            dist: {
                files : {
                    'css/style.css' : 'css/style.css'
                }
            }
        },


        cssmin: {
            options: {
                'keepSpecialComments': 0,
                banner: '<%= tag.banner %>'
            },
            combine: {
                files: {
                'css/style.css': ['css/style.css']
                }
            }
        },











/*------------------------------------*\
    #IMAGES
\*------------------------------------*/

        svgstore: {
            options: {
                formatting : {
                    indent_size : 2
                }
            },
            someTask: {
                files: {
                    'img/build/icons/svg-sprite.svg' : ['img/source/icons/*.svg']
                }
            }
        },



        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/source/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/build/'
                }]
            }
        },



        favicons: {
            options: {
                html: 'img/icons/favicon.html',
                HTMLPrefix: "img/favicons/"
            },
            icons: {
                src: 'img/source/icons/favicon.png',
                dest: 'img/build/icons/favicons/'
            }
        },







/*------------------------------------*\
    #WATCH
\*------------------------------------*/

        watch: {
            scripts: {
                files: ['_js/source*.js'],
                tasks: ['jshint', 'concat', 'uglify', 'copy'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            css: {
                files: ['_scss/**/*.scss'],
                tasks: ['sass', 'autoprefixer', 'cssmin'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            images: {
                files: ['img/source/**/*.{png,jpg,gif,svg}'],
                tasks: ['imagemin', 'svgstore'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        }





    }); // end grunt config








/*------------------------------------*\
    #LOAD TASKS
\*------------------------------------*/

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-favicons');
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');








/*------------------------------------*\
    #REGISTER TASKS
\*------------------------------------*/

    // -----------------------------------------
    // Local development        :: Run 'grunt dev'
    // Production build         :: Run 'grunt'
    // Create favicons          :: Run 'grunt icons'
    // -----------------------------------------

    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'autoprefixer', 'cssmin', 'imagemin', 'svgstore', 'jshint', 'watch']);
    grunt.registerTask('dev', ['concat', 'sass', 'autoprefixer', 'imagemin', 'svgstore', 'jshint', 'watch']);
    grunt.registerTask('icons', ['favicons']);

};