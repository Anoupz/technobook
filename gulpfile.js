// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var minifyHTML = require("gulp-minify-html");
var watch = require('gulp-watch');


var config = {
    paths: {
        html: {
            src:  "./build/Index.html",
            dest: "./build"
        },
        javascript: {
            src:  "./app/**/*.js",
            dest: "build/js"
        },
        css: {
            src: "./app/**/*.css",
            dest: "build/css"
        }
    }
};

// tasks
gulp.task('lint', function() {
    gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});
gulp.task('clean', function() {
    gulp.src('./build/*')
        .pipe(clean({force: true}));
});
gulp.task('minify-css', function() {
    var opts = {comments:true,spare:true};
    gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
        .pipe(minifyCSS(opts))
        .pipe(concat('main.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./build/css/'))
});
gulp.task('minify-js', function() {
    gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./build/js/'))
});
gulp.task('copy-bower-components', function () {
    gulp.src('./app/bower_components/**')
        .pipe(gulp.dest('build/bower_components'));
});
gulp.task('copy-html-files', function () {
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('build/'));
});
/*gulp.task('injectJs', function () {
gulp.src('./build/Index.html')
    .pipe(inject(gulp.src('./build/js*//*.js', {read: false}), {relative: true}))
    .pipe(gulp.dest('./build'));
});
gulp.task('injectCss', function () {
    gulp.src('./build/Index.html')
        .pipe(inject(gulp.src('./build/css*//*.css', {read: false}), {relative: true}))
        .pipe(gulp.dest('./build'));
});*/
gulp.task("html", function(){
    return gulp.src(config.paths.html.src)
        .pipe(inject(gulp.src('./build/js/*.js', {read: false}), {relative: true}))
        .pipe(inject(gulp.src('./build/css/*.css', {read: false}), {relative: true}))
        .pipe(gulp.dest(config.paths.html.dest));
});

gulp.task('watch', function() {
    gulp.watch('app/partials/*.html', ['copy-html-files', 'html']);
    gulp.watch('app/**/*.js', ['lint', 'minify-js', 'html']);
});


gulp.task('connect', function () {
    connect.server({
        root: 'app/',
        port: 9090
    });
});
gulp.task('connectDist', function () {
    connect.server({
        root: 'build/',
        port: 8080
    });
});


// default task
gulp.task('default',
    ['lint', 'connect']
);
// build task
gulp.task('build',
    ['lint', 'minify-css', 'minify-js', 'copy-html-files', 'copy-bower-components']
);

gulp.task('run',
    ['html', 'watch','connectDist']
);