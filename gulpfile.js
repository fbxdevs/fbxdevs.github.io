let gulp = require('gulp');
let plumber = require('gulp-plumber');
let browserify = require('browserify');
let source = require('vinyl-source-stream');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let htmlmin = require('gulp-htmlmin');
let imagemin = require('gulp-imagemin');
let cssmin = require('gulp-cssmin');
let sequence = require('gulp-sequence');

gulp.task('compile-scripts', () => {
	return browserify('www/js/app.js')
	.transform('babelify', {
		presets: ['react', 'env'],
	})
	.bundle()
	.pipe(source('app.js'))
	.pipe(plumber())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('min-scripts', () => {
	return gulp.src(['dist/js/app.js'])
	.pipe(plumber())
	.pipe(uglify())
	.pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('min-html', () => {
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

gulp.task('min-css', () => {
	return gulp.src('src/css/**/*.css')
	.pipe(plumber())
	.pipe(concat('app.css'))
	.pipe(cssmin())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', () => {
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

gulp.task('min-image', () => {
	return gulp.src('src/img/**/*')
	.pipe(plumber())
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'));
});

gulp.task('prod', () => {
	process.env.NODE_ENV = 'production';
});

gulp.task('all', (callback) => {
	sequence('prod', 'compile-scripts', 'min-scripts', ['min-html', 'min-css', 'fonts'])(callback);
});

gulp.task('watch', () => {
	gulp.watch('src/**', ['all']);
});

gulp.task('default', sequence('all', 'watch'));