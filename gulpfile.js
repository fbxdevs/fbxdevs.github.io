var gulp       = require('gulp'),
	plumber    = require('gulp-plumber'),
	browserify = require('browserify'),
	source     = require('vinyl-source-stream'),
	buffer     = require('vinyl-buffer'),
	concat     = require('gulp-concat'),
	uglify     = require('gulp-uglify'),
	rename     = require('gulp-rename'),
	htmlmin    = require('gulp-htmlmin'),
	imagemin   = require('gulp-imagemin'),
	cssmin     = require('gulp-cssmin'),
	sequence   = require('gulp-sequence');

gulp.task('compile-scripts', function() {
	return browserify('src/js/index.js')
	.transform('babelify', {
		presets: ['react', 'es2015', 'es2016', 'es2017']
	})
	.bundle()
	.pipe(source('app.js'))
	.pipe(plumber())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('min-scripts', function() {
	return gulp.src(['dist/js/app.js'])
	.pipe(plumber())
	.pipe(uglify())
	.pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('min-html', function() {
	return gulp.src('src/**/*.html')
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
	.pipe(gulp.dest('dist'));
});

gulp.task('min-css', function() {
	return gulp.src('src/css/**/*.css')
	.pipe(plumber())
	.pipe(concat('app.css'))
	.pipe(cssmin())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', function() {
	var fontDir = 'src/fonts/';
	return gulp.src([fontDir + '*.ttf',
			  fontDir + '*.oft', 
			  fontDir + '*.woff', 
			  fontDir + '*.woff2', 
			  fontDir + '*.svg', 
			  fontDir + '*.eot'])
	.pipe(plumber())
	.pipe(gulp.dest('dist/fonts'));
});

gulp.task('min-image', function() {
	return gulp.src('src/img/**/*')
	.pipe(plumber())
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'));
});

gulp.task('prod', function() {
	process.env.NODE_ENV = 'production';
});

gulp.task('all', function(callback) {
	sequence('prod', 'compile-scripts', 'min-scripts', ['min-html', 'min-css', 'fonts'])(callback);
});

gulp.task('watch', function() {
	gulp.watch('src/**', ['all']);
});

gulp.task('default', sequence('all', 'watch'));