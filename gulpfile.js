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
    return gulp.src('app/lib/angular-ad-switch/js/switch.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('app/lib/angular-ad-switch/js'));
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

gulp.task('bundle', function () {
    var minifyapp = gulp.src(['app/js/*.js',
        '!app/js/home.js',
        '!app/js/weui.js',
        '!app/js/global.js'])
        .pipe(ngAnnotate())
        .pipe(concat('apps.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

    var homejs = gulp.src(['app/lib/angular-ad-switch/js/switch.js',
        'app/lib/custom/js/spinner.js',
        'app/pages/home/*.js',
        'app/pages/homePage/*.js'])
        .pipe(ngAnnotate())
        .pipe(stripDebug())
        .pipe(concat('home.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

    //var homecss = gulp.src(['app/lib/angular-ad-switch/css/ui-switch.min.css', 'app/lib/custom/css/spinner.css', 'app/css/home/*.css'])
    //    .pipe(concatCss('home.css'))
    //    .pipe(cleanCSS())
    //    .pipe(gulp.dest('dist/css'));

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

    //var customjs = gulp.src(['app/lib/custom/js/*.js','!app/lib/custom/js/spinner.js'])
    //    .pipe(ngAnnotate())
    //    .pipe(stripDebug())
    //    .pipe(concat('custom.js'))
    //    .pipe(uglify())
    //    .pipe(gulp.dest('dist/js'));

    //var customcss = gulp.src(['app/lib/custom/css/*.css', '!app/lib/custom/spinner.css'])
    //    .pipe(concatCss('custom.css'))
    //    .pipe(cleanCSS())
    //    .pipe(gulp.dest('dist/css'));

    var index = gulp.src(['app/index.html'])
        //.pipe(replace(/(\"pages\/.+)\.js/g, '$1\.min\.js'))
        //.pipe(replace(/(\"css\/.+)\.css/g, '$1\.min\.css'))
        .pipe(removeHtmlComments())
        //.pipe(replace(/(\<link rel=\"stylesheet\" href=\"css\/\w+\/.+\.css\"\>)/g, '<!--$1-->'))
        //.pipe(replace(/(\<link rel=\"stylesheet\" href=\"lib\/custom\/css\/\w+.css\"\>)/g, '<!--$1-->'))
        //.pipe(replace(/(\<link rel=\"stylesheet\" href=\"lib\/angular-ad-switch\/css\/ui-switch\.min\.css\"\>)/g, '<!--$1-->'))
        /*below for js*/
        .pipe(replace(/(\<script src=\"js\/app\.js"\>\<\/script\>)/, '<!--$1-->'))
        .pipe(replace(/(\<script src=\"js\/common\.js"\>\<\/script\>)/, '<!--$1-->'))
        .pipe(replace(/(\<script src=\"js\/moduleValue\.js"\>\<\/script\>)/, '<!--$1-->'))
        .pipe(replace(/(\<script src=\"js\/global\.js"\>\<\/script\>)/, '<!--$1-->'))
        .pipe(replace(/(\<script src=\"pages\/\w+\/.+\.js"\>\<\/script\>)/g, '<!--$1-->'))
        .pipe(replace(/(\<script src=\"lib\/custom\/js\/\w+\.js"\>\<\/script\>)/g, '<!--$1-->'))
        .pipe(replace(/(\<script src=\"lib\/angular-ad-switch\/js\/switch\.js"\>\<\/script\>)/g, '<!--$1-->'))
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

    var js = gulp.src(['app/js/weui.js'])
        .pipe(gulp.dest('dist/js'));

    return merge(minifyapp, homejs, /*homecss,*/ minify, minifycss, index, html, lib, img, bower, js);
});

gulp.task('dist', function () {
    var apps = gulp.src(['app/js/app.js','app/js/common.js', 'app/js/moduleValue.js'])
        .pipe(concat('apps.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

    var homejs = gulp.src(['app/lib/angular-ad-switch/js/switch.js', 'app/lib/custom/js/spinner.js', 'app/pages/home/*.js', 'app/pages/homePage/*.js'])
        .pipe(ngAnnotate())
        .pipe(stripDebug())
        .pipe(concat('home.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

    var homecss = gulp.src(['app/lib/angular-ad-switch/css/ui-switch.css', 'app/lib/custom/css/spinner.css', 'app/css/common/common.css', 'app/css/home/*.css'])
        .pipe(concatCss('home.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));

    var routes = gulp.src('app/pages/**/*-route.js')
        .pipe(ngAnnotate())
        .pipe(stripDebug())
        .pipe(concat('page-route.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    var controllers = gulp.src('app/pages/**/*-controller.js')
        .pipe(ngAnnotate())
        .pipe(stripDebug())
        .pipe(concat('page-controller.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    var services = gulp.src('app/pages/**/*-service.js')
        .pipe(ngAnnotate())
        .pipe(stripDebug())
        .pipe(concat('page-service.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

    var index = gulp.src(['app/index.html'])
        // head
        .pipe(removeHtmlComments())
        .pipe(replace(/(\<script src=\"js\/global\.js\"\>\<\/script\>)/, '<!--$1-->'))
        // app js
        .pipe(replace(/(\<script src=\"js\/app\.js\"\>\<\/script\>)/, '<!--$1-->'))
        .pipe(replace(/(\<script src=\"js\/common\.js\"\>\<\/script\>)/, '<!--$1-->'))
        .pipe(replace(/(\<script src=\"js\/moduleValue\.js\"\>\<\/script\>)/, '<!--$1-->'))
        // home js
        .pipe(replace(/(\<script src=\"lib\/angular-ad-switch\/js\/switch\.js"\>\<\/script\>)/, '<!--$1-->'))
        .pipe(replace(/(\<script src=\"lib\/custom\/js\/spinner\.js"\>\<\/script\>)/, '<!--$1-->'))
        .pipe(replace(/(\<script src=\"pages\/home\/\w+\.js"\>\<\/script\>)/g, '<!--$1-->'))
        .pipe(replace(/(\<script src=\"pages\/homePage\/\w+\.js"\>\<\/script\>)/g, '<!--$1-->'))
        // home css
        .pipe(replace(/(\<link rel=\"stylesheet\" href=\"lib\/angular-ad-switch\/css\/ui-switch\.css\"\>)/, '<!--$1-->'))
        .pipe(replace(/(\<link rel=\"stylesheet\" href=\"lib\/custom\/css\/spinner\.css\"\>)/, '<!--$1-->'))
        .pipe(replace(/(\<link rel=\"stylesheet\" href=\"css\/common\/common\.css\"\>)/, '<!--$1-->'))
        .pipe(replace(/(\<link rel=\"stylesheet\" href=\"css\/home\/home\.css\"\>)/, '<!--$1-->'))
        .pipe(replace(/(\<link rel=\"stylesheet\" href=\"css\/home\/homePage\.css\"\>)/, '<!--$1-->'))
        // page js
        .pipe(replace(/(\<script src=\"pages\/\w+\/.+\-route.js"\>\<\/script\>)/g, '<!--$1-->'))
        .pipe(replace(/(\<script src=\"pages\/\w+\/.+\-controller.js"\>\<\/script\>)/g, '<!--$1-->'))
        .pipe(replace(/(\<script src=\"pages\/\w+\/.+\-service.js"\>\<\/script\>)/g, '<!--$1-->'))
        // page css
        //.pipe(removeHtmlComments())
        //.pipe(replace(/(\<link rel=\"stylesheet\" href=\"css\/\w+\/\w+\.css\"\>)/g, '<!--$1-->'))
        //
        .pipe(removeHtmlComments())
        .pipe(removeEmptyLines({removeComments: true}))
        .pipe(gulp.dest('dist'));

    var pagejs = gulp.src('app/pages/**/*.js')
        .pipe(ngAnnotate())
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest('dist/pages'));

    var pagecss = gulp.src(['app/css/**/*.css', '!app/css/home.css'])
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));

    var pagehtml = gulp.src('app/pages/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/pages'));

    var img = gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'));

    var lib = gulp.src('app/lib/**/*')
        .pipe(gulp.dest('dist/lib'));

    var bower = gulp.src(['app/bower_components/**/*.js', 'app/bower_components/**/*.css'])
        .pipe(gulp.dest('dist/bower_components'));

    var mis = gulp.src(['app/js/weui.js'])
        .pipe(gulp.dest('dist/js'));

    // bundle css
    //var bundlecss = gulp.src(['dist/css/**/*.css', '!dist/css/home.css', '!dist/css/bundle.css'])
    //    .pipe(concatCss('bundle.css'))
    //    .pipe(cleanCSS())
    //    .pipe(gulp.dest('dist/css'));

    return merge(apps, homejs, homecss, routes, controllers, services, index, pagejs, pagecss, pagehtml, img, lib, bower, mis);
});

gulp.task('debug', function () {

    var debug = gulp.src('app/js/global.js')
        .pipe(gulp.dest('dist/js'));

    var index = gulp.src(['dist/index.html'])
        .pipe(replace(/(\<\/body\>)/g, '\<script src=\"js\/global.js\"></script>$1'))
        .pipe(gulp.dest('dist'));

    return merge(debug, index);
});

gulp.task('clean', function () {
    return del.sync(DEST);
});

gulp.task('build', ['clean', 'dist']);
