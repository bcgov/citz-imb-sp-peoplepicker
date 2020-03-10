const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('build-script', function () {
    return gulp.src('./build/static/js/*.js')
        .pipe(concat('peoplePicker.js'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('build-css', function () {
    return gulp.src('./build/static/css/*.css')
        .pipe(concat('peoplePicker.css'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('default', gulp.parallel(['build-script', 'build-css']))