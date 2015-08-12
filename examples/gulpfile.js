/**
 * based on https://github.com/christianalfoni/react-app-boilerplate
 *
 * compass support added
 * copying files from src to build and dist added
 */

var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var compass = require('gulp-compass');
var cssmin = require('gulp-cssmin');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var glob = require('glob');
var livereload = require('gulp-livereload');
var jasminePhantomJs = require('gulp-jasmine2-phantomjs');

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
  // REMOVED, causes missing react error in build
  // 'react',
  // 'react-addons'
];

var browserifyTask = function(options) {
  // Our app bundler
  var appBundler = browserify({
    extensions: ['.jsx'],
    entries: [options.src], // Only need initial file, browserify finds the rest
    transform: [reactify], // We want to convert JSX to normal javascript
    debug: options.development, // Gives us sourcemapping - AND HUGE FILE SIZE,
                                // set to false if runs too slow
    cache: {}, packageCache: {}, fullPaths: options.development // Requirement of watchify
  });

  // We set our dependencies as externals on our app bundler when developing
  (options.development ? dependencies : []).forEach(function(dep) {
    appBundler.external(dep);
  });

  // The rebundle process
  var rebundle = function() {
    var start = Date.now();
    console.log('Building APP bundle');
    appBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('app.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.development, livereload()))
      .pipe(notify(function() {
        console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
      }));
  };

  // Fire up Watchify when developing
  if (options.development) {
    appBundler = watchify(appBundler, {poll: true, ignoreWatch: true});
    appBundler.on('update', rebundle);
  }

  rebundle();

  // We create a separate bundle for our dependencies as they
  // should not rebundle on file changes. This only happens when
  // we develop. When deploying the dependencies will be included
  // in the application bundle
  if (options.development) {

    var testFiles = glob.sync('./specs/**/*-spec.js');
    var testBundler = browserify({
      entries: testFiles,
      debug: true, // Gives us sourcemapping
      transform: [reactify],
      cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });

    dependencies.forEach(function(dep) {
      testBundler.external(dep);
    });

    var rebundleTests = function() {
      var start = Date.now();
      console.log('Building TEST bundle');
      testBundler.bundle()
      .on('error', gutil.log)
        .pipe(source('specs.js'))
        .pipe(gulp.dest(options.dest))
        .pipe(livereload())
        .pipe(notify(function() {
          console.log('TEST bundle built in ' + (Date.now() - start) + 'ms');
        }));
    };

    testBundler = watchify(testBundler);
    testBundler.on('update', rebundleTests);
    rebundleTests();

    // Remove react-addons when deploying, as it is only for
    // testing
    if (!options.development) {
      dependencies.splice(dependencies.indexOf('react-addons'), 1);
    }

    var vendorsBundler = browserify({
      debug: true,
      require: dependencies
    });

    // Run the vendor bundle
    var start = new Date();
    console.log('Building VENDORS bundle');
    vendorsBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function() {
        console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
      }));
  }
};

var compassTask = function(options) {
  if (options.development) {
    // unminified development version
    var run = function() {
      var start = new Date();
      console.log('Compiling COMPASS');

      gulp.src(options.src)
        .pipe(compass(options.config))
        .on('error', function(error) {
          console.log(error);
          this.emit('end');
        })
        .pipe(rename('css/styles.css'))
        .pipe(gulp.dest('build/styles'))
        .pipe(notify(function() {
          console.log('COMPASS compiled in ' + (Date.now() - start) + 'ms');
        }));
    };
    run();
    gulp.watch(options.src, run);
  }
  else {
    // minified production version
    gulp.src(options.src)
      .pipe(compass(options.config))
      .on('error', function(error) {
        console.log(error);
        this.emit('end');
      })
      .pipe(cssmin())
      .pipe(rename('css/styles.css'))
      .pipe(gulp.dest(options.dest));
  }
};

var copyFilesTask = function(options) {
  if (options.development) {
    var run = function() {
      var start = new Date();
      console.log('Copying index.html and assets');
      gulp.src('src/index.html')
        .pipe(gulp.dest('build'));
      gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest('build/assets'));
      gulp.src('src/styles/**/*.*')
        .pipe(gulp.dest('build/styles'))
        .pipe(notify(function() {
            console.log('index.html and assets copied in ' + (Date.now() - start) + 'ms');
         }));
    };
    run();
    gulp.watch(options.src, run);
  }
  else {
    var start = new Date();
    console.log('Copying index.html and assets');
    gulp.src('src/index.html')
      .pipe(gulp.dest('dist'));
    gulp.src('src/assets/**/*.*')
      .pipe(gulp.dest('dist/assets'));
    gulp.src('src/styles/css/styles.min.css')
      .pipe(rename('styles.css'))
      .pipe(gulp.dest('dist/styles/css/'))
      .pipe(notify(function() {
          console.log('index.html and assets copied in ' + (Date.now() - start) + 'ms');
       }));
  }
};

// Starts our development workflow, runs browserify, compass & moves files to
// /build and watches css and jsx files
// gulp.task('default', function() {
//   browserifyTask({
//     development: true,
//     src: './app.jsx',
//     dest: './'
//   });
// });

gulp.task('1', function() {
  browserifyTask({
    development: true,
    src: './1.jsx',
    dest: './'
  });
});
