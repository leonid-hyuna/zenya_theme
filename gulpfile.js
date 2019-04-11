
'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const prefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');
const cssmin = require('gulp-clean-css');
const imagemin = require('imagemin');
const pngquant = require('imagemin-pngquant');
const plumber = require('gulp-plumber');
//const rimraf = require('rimraf');
const rename = require("gulp-rename");


const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
 
(async () => {
    const files = await imagemin(['images/src/**/*.{jpg,png}'], 'images', {
        plugins: [
            imageminJpegtran(),
            imageminPngquant({quality: '65-80'})
        ]
    });
 
    console.log(files);
    //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
})();

const path = {

  build: { // paths to build
    // html: 'build/',
    js: 'js/',
    css: 'css/',
    img: 'images/',
  },

  src: { // paths to source files
    // html: 'src/*.html',
    js: 'src/js/app.js',
    scss: 'src/scss/app.scss',
    img: 'src-images/**/*.*',
  },

  watch: { // paths to modify files
    // html: 'src/**/*.html',
    js: 'src/js/*.js',
    scss: 'src/scss/*.scss',
    img: 'images/**/*.*',
  },

  clean: './build'
};

const sassPaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src',
  'node_modules/fa-scss-plus'
];


gulp.task('clean', function (cb) { // <- clear
  rimraf(path.clean, cb);
});

// gulp.task('html:build', function () { // <- task to build html
//    gulp.src(path.src.html)
//     .pipe(rigger())
//     .pipe(gulp.dest(path.build.html));
//     // .pipe(reload({stream: true}));
// });

gulp.task('js:build', function () { // <- task to build js
   gulp.src(path.src.js)
    .pipe(rigger())
    //.pipe(sourcemaps.init())
    .pipe(uglify())
    //.pipe(sourcemaps.write())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest(path.build.js));
    // .pipe(reload({stream: true}));
});

gulp.task('scss:build', function () { // <- task to build scss
  gulp.src(path.src.scss)
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    .pipe(sass({
    	includePaths: sassPaths
    }))
    .pipe(prefixer({
    	browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(cssmin())
    .pipe(rename('app.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css));
    // .pipe(reload({stream: true}));
});

gulp.task('build', [
    // 'html:build',
    'js:build',
    'scss:build',
//     'images:build'
]);

gulp.task('watch', function(){
    // watch([path.watch.html], function(event, cb) {
    //     gulp.start('html:build');
    // });
    watch([path.watch.scss], function(event, cb) {
        gulp.start('scss:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
//     watch([path.watch.img], function(event, cb) {
//         gulp.start('images:build');
//     });
});


gulp.task('default', ['build', 'watch']);
