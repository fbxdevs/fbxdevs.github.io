var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	babel = require('gulp-babel'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	htmlmin = require('gulp-htmlmin');

gulp.task('build', function() {
	gulp.src(['src/**/*.js'])
	.pipe(plumber())
	.pipe(babel({
		presets: [
			'es2015',
			'react'
		]
	}))
	.pipe(browserify())
	.pipe(concat('app.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));

	gulp.src(['src/**/*.html'])
	.pipe(plumber())
	.pipe(htmlmin({
		collapseWhitespace: true,
		minifyURLs: true,
		minifyCSS: true,
		minifyJS: true,
		removeAttributeQuotes: true,
		removeComments: true,
		removeEmptyAttributes: true,
		removeOptionalTags: true,
		removeRedundantAttributes: true
	}))
	.pipe(gulp.dest('dist/'));
});

gulp.task('prod', function() {
	process.env.NODE_ENV = 'production';
});

gulp.task('watch', function() {
	gulp.watch(['src/**/*.js'], ['build', 'prod']);
});

gulp.task('default', ['build', 'prod', 'watch']);