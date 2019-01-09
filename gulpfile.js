/// <binding BeforeBuild='default' ProjectOpened='watch' />
const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const rename = require('gulp-rename');

const root = "./wwwroot/";
const vendorScripts = [
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/popper.js/dist/umd/popper.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js"
];

const vendorStyles = "node_modules/bootstrap/scss/bootstrap.scss";
const customerStyleOverrides = root + "scss/main.scss";


// merge javascripts into a single vendor.min.js file and save it to wwwroot
gulp.task('build-vendor-js', () => {
    return gulp.src(vendorScripts)
        .pipe(concat('js/bootstrap.min.js'))
        .pipe(gulp.dest(root));
});

// compile bootstrap and save as vendor.min.css to wwwroot
gulp.task('build-vendor-css', () => {
    return gulp.src([vendorStyles, customerStyleOverrides])
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(rename('css/main.min.css'))
        .pipe(gulp.dest(root));
});

gulp.task('watch', () => {
    gulp.watch(vendorScripts, gulp.parallel('build-vendor-js'));
    gulp.watch(customerStyleOverrides, gulp.parallel('build-vendor-css'));
});
gulp.task('default', gulp.parallel('build-vendor-js', 'build-vendor-css')); 