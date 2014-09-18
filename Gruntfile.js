/* global module:false */
module.exports = function(grunt) {
  var port = grunt.option('port') || 8000;
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner:
        '/*!\n' +
        ' * reveal.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
        ' * http://lab.hakim.se/reveal-js\n' +
        ' * MIT licensed\n' +
        ' *\n' +
        ' * Copyright (C) 2013 Hakim El Hattab, http://hakim.se\n' +
        ' */'
    },

    qunit: {
      files: [ 'reveal.js/test/*.html' ]
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>\n'
      },
      build: {
        src: 'reveal.js/js/reveal.js',
        dest: 'reveal.js/js/reveal.min.js'
      }
    },

    cssmin: {
      compress: {
        files: {
          'reveal.js/css/reveal.min.css': [ 'reveal.js/css/reveal.css' ]
        }
      }
    },

    sass: {
      main: {
        files: {
          'css/d3.css': 'css/source/d3.scss',
        }
      }
    },

    jshint: {
      options: {
        curly: false,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        eqnull: true,
        browser: true,
        expr: true,
        globals: {
          head: false,
          module: false,
          console: false,
          unescape: false
        }
      },
      files: [ 'Gruntfile.js', 'reveal.js/js/reveal.js' ]
    },

    connect: {
      server: {
        options: {
          port: port,
          base: '.'
        }
      }
    },

    zip: {
      'reveal-js-presentation.zip': [
        'index.html',
        'reveal.js/css/**',
        'reveal.js/js/**',
        'reveal.js/lib/**',
        'reveal.js/images/**',
        'reveal.js/plugin/**'
      ]
    },

    watch: {
      main: {
        files: [ 'Gruntfile.js', 'reveal.js/js/reveal.js', 'reveal.js/css/reveal.css' ],
        tasks: 'default'
      },
      theme: {
        files: [ 'reveal.js/css/theme/source/*.scss', 'reveal.js/css/theme/template/*.scss' ],
        tasks: 'themes'
      }
    }

  });

  // Dependencies
  grunt.loadNpmTasks( 'grunt-contrib-qunit' );
  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-sass' );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-zip' );

  // Default task
  grunt.registerTask( 'default', [ 'jshint', 'cssmin', 'uglify', 'qunit' ] );

  // Theme task
  grunt.registerTask( 'themes', [ 'sass' ] );

  // Package presentation to archive
  grunt.registerTask( 'package', [ 'default', 'zip' ] );

  // Serve presentation locally
  grunt.registerTask( 'serve', [ 'connect', 'watch' ] );

  // Run tests
  grunt.registerTask( 'test', [ 'jshint', 'qunit' ] );

};
