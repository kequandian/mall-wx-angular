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
   var minify = gulp.src('app/pages/**/*.js')
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

    var minifyMore = gulp.src(['app/js/app.js','app/js/common.js', 'app/js/global.js', 'app/js/weui.js'])
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

    var minifycss = gulp.src('app/css/**/*.css')
        .pipe(concatCss('bundle.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));

    var rep = gulp.src(['app/index.html'])
        //.pipe(replace(/(\"pages\/.+)\.js/g, '$1\.min\.js'))
        //.pipe(replace(/(\"css\/.+)\.css/g, '$1\.min\.css'))
        .pipe(removeHtmlComments())
        .pipe(replace(/(\<link rel=\"stylesheet\" href=\"css\/common.css\"\>)/g, '<!--$1-->'))
        .pipe(replace(/(\<link rel=\"stylesheet\" href=\"css\/\w+\/.+\.css\"\>)/g, '<!--$1-->'))
        .pipe(replace(/\<\!--(\<link rel=\"stylesheet\" href=\"css\/bundle.css"\>)--\>/, '$1'))
        /*below for js*/
        //.pipe(replace(/(\<script src=\"js\/app\.js"\>\<\/script\>)/g, '<!--$1-->'))
        //.pipe(replace(/(\<script src=\"js\/common\.js"\>\<\/script\>)/g, '<!--$1-->'))
        .pipe(replace(/(\<script src=\"js\/global\.js"\>\<\/script\>)/, '<!--$1-->'))
        /*all pages*/
        .pipe(replace(/(\<script src=\"pages\/\w+\/.+\.js"\>\<\/script\>)/g, '<!--$1-->'))
        .pipe(removeHtmlComments())
        .pipe(gulp.dest('dist'));

    var home = gulp.src('app/pages/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/pages'));

    var lib = gulp.src('app/lib/**/*')
        .pipe(gulp.dest('dist/lib'));

    var img = gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'));

    var bower = gulp.src(['app/bower_components/**/*.js', 'app/bower_components/**/*.css'])
        .pipe(gulp.dest('dist/bower_components'));

    return merge(minify, minifyMore, minifycss, rep, home, lib, img, bower, rep);
});

gulp.task('clean', function () {
    return del.sync(DEST);
});

gulp.task('build', ['clean', 'dist']);
