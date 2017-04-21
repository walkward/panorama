module.exports = function(grunt) {
  // The order of JS files that get loaded
  var jsBuildFiles = [
                      'scripts/plugins/pannellum.js',
                      'scripts/plugins/cart.js',
                      'scripts/lib/*.js',
                      ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      // Leave development CSS expanded for debugging
      dev: {
        options: {
          style: 'expanded',
          sourcemap: 'none',
          require: 'sass-globbing'
        },
        files: {
          'assets/panorama.css.liquid' : 'sass/styles.sass'
        }
      },
      // Compress CSS for production
      prod: {
        options: {
          style: 'compressed',
          sourcemap: 'none',
          require: 'sass-globbing'
        },
        files: {
          'assets/panorama.css.liquid' : 'sass/styles.sass'
        }
      }
    },
    // Uglifies JS for production
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>*/\n'
      },
      watch: {
        src: jsBuildFiles,
        dest: 'assets/<%= pkg.name %>.js'
      }
    },
    // Combines JS files for development purposes
    concat: {
      options: {
        banner: '/*! <%= pkg.name %>*/\n',
        beautfiy: true,
        process: function(src, filepath) {
          return '//------ ' + filepath + '\n' + src;
        }
      },
      build: {
        src: jsBuildFiles,
        dest: 'assets/<%= pkg.name %>.js'
      }
    },
    watch: {
      scripts: {
        files: ['scripts/**/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false
        },
      },
      css: {
        files: ['sass/**/*.sass', 'sass/**/*.scss', ],
        tasks: ['sass:dev']
      }
    }
  });

  // Tasks
  grunt.registerTask('build', ['uglify', 'sass:prod']);

  // Plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass-globbing');
};
