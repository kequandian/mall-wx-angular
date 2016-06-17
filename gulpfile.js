var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
//var sourcemaps = require('gulp-sourcemaps');
var stripDebug = require('gulp-strip-debug');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var removeHtmlComments = require('gulp-remove-html-comments');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var merge = require('merge-stream');
var del = require('del');
var path = require('path');

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
    return gulp.src('app/css/**/*.css')
        //.pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('bundle-css', function(){
    return gulp.src('app/css/**/*.css')
        .pipe(concat('bundle.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('imagemin', function () {
    return gulp.src('app/img/**/*.png')
        //.pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('rep', function(){
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
        .pipe(replace(/(\<script src=\"pages\/\w+\/.+\.js"\>\<\/script\>)/g, '<!--$1-->'))
        .pipe(replace(/\<\!--(\<script src=\"js\/bundle.js\"\/\>)--\>/, '$1'))
        .pipe(gulp.dest('dist'));

    var home = gulp.src('app/pages/**/*.html')
        .pipe(gulp.dest('dist/pages'));

    var js = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'));

    var lib = gulp.src('app/lib/**/*')
        .pipe(gulp.dest('dist/lib'));

    var img = gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'));

    var bower = gulp.src(['app/bower_components/**/*.js','app/bower_components/**/*.css'])
        .pipe(gulp.dest('dist/bower_components'));

    return merge(minify, minifycss, home, js, lib, img, bower, rep);
});

gulp.task('clean', function () {
    return del.sync(DEST);
});

gulp.task('build', ['clean', 'dist']);
