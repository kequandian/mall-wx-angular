var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
//var sourcemaps = require('gulp-sourcemaps');
var stripDebug = require('gulp-strip-debug');
var cleanCSS = require('gulp-clean-css');
//var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var removeHtmlComments = require('gulp-remove-html-comments');
var removeEmptyLines = require('gulp-remove-empty-lines');
var htmlmin = require('gulp-html-minifier');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var merge = require('merge-stream');
var del = require('del');
var path = require('path');

gulp.task('default', function () {
    return gulp.src('app/lib/custom/js/*.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('app/lib/custom/js'));
});

gulp.task('ad', function () {
    return gulp.src('app/lib/angular-ad-switch/js/switch.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('app/lib/angular-ad-switch/js'));
});

gulp.task('minify', function () {
    return gulp.src('app/pages/**/*.js')
        .pipe(ngAnnotate())

        //.pipe(gulp.dest('app/dist/pages'))

        .pipe(stripDebug())

        // .min.js + .min.js.map
        .pipe(rename({extname: '.min.js'}))
        //.pipe(sourcemaps.init())
        .pipe(uglify())
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/pages'));
});

gulp.task('minify-css', function () {
    return gulp.src('app/lib/custom/*.css')
        //.pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('app/lib/custom'));
});

gulp.task('bundle-css', function () {
    return gulp.src('app/css/**/*.css')
        .pipe(concat('bundle.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

//gulp.task('imagemin', function () {
//    return gulp.src(['app/img/**/*.png', 'app/img/**/*.jpg'])
//        //.pipe(cleanCSS({compatibility: 'ie8'}))
//        .pipe(imagemin())
//        .pipe(gulp.dest('dist/img'));
//});

gulp.task('rep', function () {
    return gulp.src(['app/index.html'])
        .pipe(replace(/(\"pages\/.+)\.js/g, '$1\.min\.js'))
        .pipe(replace(/(\"css\/.+)\.css/g, '$1\.min\.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('dist', function () {
    var homejs = gulp.src(['app/pages/home/*.js', 'app/pages/homePage/*.js', 'app/lib/custom/js/spinner.js'])
        .pipe(ngAnnotate())
        .pipe(stripDebug())
        .pipe(concat('home.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

    var homecss = gulp.src(['app/css/home/*.css', 'app/lib/custom/spinner.css'])
        .pipe(concatCss('home.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));

    var minify = gulp.src(['app/pages/**/*.js', '!app/pages/home/*.js', '!app/pages/homePage/*.js'])
        .pipe(ngAnnotate())
        //.pipe(gulp.dest('app/dist/pages'))
        .pipe(stripDebug())
        .pipe(concat('bundle.js'))
        // .min.js + .min.js.map
        //.pipe(rename({extname: '.min.js'}))
        //.pipe(sourcemaps.init())
        .pipe(uglify())
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'));

    var minifycss = gulp.src(['app/css/**/*.css', '!app/css/home/*.css'])
        .pipe(concatCss('bundle.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));

    var customjs = gulp.src(['app/lib/custom/js/*.js','!app/lib/custom/js/spinner.js'])
        .pipe(ngAnnotate())
        .pipe(stripDebug())
        .pipe(concat('custom.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

    var customcss = gulp.src(['app/lib/custom/css/*.css', '!app/lib/custom/spinner.css'])
        .pipe(concatCss('custom.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));

    var minifyapp = gulp.src(['app/js/app.js', 'app/js/common.js', 'app/js/moduleValue.js', 'app/js/weui.js'])
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

    var index = gulp.src(['app/index.html'])
        //.pipe(replace(/(\"pages\/.+)\.js/g, '$1\.min\.js'))
        //.pipe(replace(/(\"css\/.+)\.css/g, '$1\.min\.css'))
        .pipe(removeHtmlComments())
        .pipe(replace(/(\<link rel=\"stylesheet\" href=\"css\/\w+\/.+\.css\"\>)/g, '<!--$1-->'))
        .pipe(replace(/(\<link rel=\"stylesheet\" href=\"lib\/custom\/css\/\w+.css\"\>)/g, '<!--$1-->'))
        /*below for js*/
        //.pipe(replace(/(\<script src=\"js\/app\.js"\>\<\/script\>)/, '<!--$1-->'))
        //.pipe(replace(/(\<script src=\"js\/common\.js"\>\<\/script\>)/, '<!--$1-->'))
        //.pipe(replace(/(\<script src=\"js\/weui\.js"\>\<\/script\>)/, '<!--$1-->'))
        .pipe(replace(/(\<script src=\"js\/global\.js"\>\<\/script\>)/, '<!--$1-->'))
        .pipe(replace(/(\<script src=\"pages\/\w+\/.+\.js"\>\<\/script\>)/g, '<!--$1-->'))
        .pipe(replace(/(\<script src=\"lib\/custom\/js\/\w+\.js"\>\<\/script\>)/g, '<!--$1-->'))
        .pipe(removeHtmlComments())
        .pipe(removeEmptyLines({removeComments: true}))
        .pipe(gulp.dest('dist'));

    var html = gulp.src('app/pages/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/pages'));

    var lib = gulp.src('app/lib/**/*')
        .pipe(gulp.dest('dist/lib'));

    var img = gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'));

    var bower = gulp.src(['app/bower_components/**/*.js', 'app/bower_components/**/*.css'])
        .pipe(gulp.dest('dist/bower_components'));

    var debug = gulp.src('app/js/global.js')
        .pipe(gulp.dest('dist/js'));

    return merge(homejs, homecss, minify, minifycss, customjs, customcss, minifyapp, index, html, lib, img, bower, index, debug);
});

gulp.task('clean', function () {
    return del.sync(DEST);
});

gulp.task('build', ['clean', 'dist']);
