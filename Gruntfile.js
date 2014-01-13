'use strict';
module.exports = function(grunt) {

  // Project configuration.
  grunt
          .initConfig({
            pkg: grunt.file.readJSON('server/package.json'),
            minSuffix: 'min',
            distName: 'cheese',
            meta: {
              version: '<%= pkg.version %>',
              banner: '/*! cheese.js - v<%= meta.version %> - '
                      + '<%= grunt.template.today("yyyy-mm-dd") %>\n'
                      + '* http://lukejones.com/\n'
                      + '* Copyright (c) <%= grunt.template.today("yyyy") %> '
                      + 'Luke Jones; Licensed MIT */\n',

            },
            clean: {
              files: ['dist', 'dist/plugins', 'dist/css', '!dist/css/images'],
            },
            concat: {
              templateDist: {
                options: {
                  banner: '<%= meta.banner %>',
                  stripBanners: true
                },
                files: {
                  'dist/<%= distName %>.js': ['js/core.js',
                      'js/app/controllers/*.js', 'js/app/models/*.js',
                      'js/app/collections/*.js', 'js/app/views/**/*.js',
                      'js/app/app.js', 'js/app/helpers/*.js'],
                  'dist/plugins/libs.js': ['js/plugins/jquery/*.js',
                      'js/plugins/backbone/underscore*.js',
                      'js/plugins/backbone/backbone*.js',
                      'js/plugins/handlebars/*.js',
                      'js/plugins/async/*.js'],
                  'dist/css/main.css': ['css/jquery-ui-1.10.3.custom.min.css',
                      'css/main.css', 'css/form.css', 'css/tables.css', 'css/menu.css', 'css/cheese.css']
                }
              }
            },
            uglify: {
              target: {
                options: {
                  banner: '<%= meta.banner %>'
                },
                files: {
                  'dist/<%= distName %>.<%= minSuffix %>.js': ['dist/<%= distName %>.js'],
                }
              },
            },
            symlink: {
              explicit: {
                files: [{
                  src: 'images',
                  dest: 'dist/images'
                }, {
                  src: 'images',
                  dest: 'dist/css/images'
                }]
              }
            },
            watch: {
              gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
              },
              src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'qunit']
              },
              test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit']
              },
            },
            qunit: {
              all: ['tests/*.html']
            },
            jshint: {
              beforeconcat: {
                options: {
                  '-W055': true,
                  '-W014': true
                },
                src: ['app/**/*.js']
              },
            /*
             * afterconcat: ['dist/agenda_jar.js'], options: { curly: true,
             * eqeqeq: true, immed: true, latedef: true, newcap: true, noarg:
             * true, sub: true, undef: true, boss: true, eqnull: true, globals: {
             * window: true, pageName: true, Handlebars: true, $: true, jQuery:
             * true, Genwi: true, GENWI: true, google: true, console: true,
             * Image: true, oTmpl: true, oIP: true, oJson: true, alert: true,
             * getShareTmpl: true, iScroll: true, setTimeout: true,
             * navigator:true, categoryJson:true, baseUrl: true, network_id:
             * true, GenwiAndroid:true, document:true, setInterval:true,
             * clearInterval:true, networkTitle:true } },
             */
            },
            yuidoc: {
              compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                  paths: ['js/app/'],
                  outdir: 'yuidocs/',
                  parseOnly: false,
                  themedir: 'yuidoc-bootstrap-theme/'
                },
              }
            }
          });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-symlink');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  // Default task.
  grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify',
      'symlink', 'yuidoc']);

};
