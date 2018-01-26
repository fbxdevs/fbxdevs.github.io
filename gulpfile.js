let gulp = require('gulp');
let plumber = require('gulp-plumber');
let browserify = require('browserify');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let source = require('vinyl-source-stream');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let htmlmin = require('gulp-htmlmin');
let imagemin = require('gulp-imagemin');
let cssmin = require('gulp-cssmin');
let sequence = require('gulp-sequence');
let fs = require('fs');

let getSymverFromPackage = () => {
	let pkg = require('./package.json');

	return pkg.version;
};

let writeSymverToPackage = (symverStr) => {
	let pkg = require('./package.json');
	pkg.version = symverStr;

	fs.writeFileSync('./package.json', JSON.stringify(pkg, 0, 4));
};

let createGitTag = (symver) => {
	exec(`git commit -am "Updated version to ${symver}"`, {cwd: __dirname}, (err, stdout, stderr) => {
		if(err)
			throw new Error(err);
		else {
			exec(`git tag v${symver}`, {cwd: __dirname}, (err, stdout, stderr) => {
				if(err)
					throw new Error(err);
			});
		}
	});
};

let bumpVersion = (index) => {
	let originalSymver = getSymverFromPackage();
	let versions = originalSymver.split('.');

	versions[index]++;

	versions.forEach((version, i) => {
		if(i > index)
			versions[i] = 0;
	});

	let newSymver = `${versions[0]}.${versions[1]}.${versions[2]}`;
	writeSymverToPackage(newSymver);
	
	setTimeout(() => {
		createGitTag(newSymver);
	}, 7000);
};

gulp.task('bump-major', () => {
	bumpVersion(0);
});

gulp.task('bump-minor', () => {
	bumpVersion(1);
});

gulp.task('bump-patch', () => {
	bumpVersion(2);
});

gulp.task('compile-scripts', () => {
	return browserify('src/js/app.js')
	.transform('babelify', {
		presets: ['react', 'env'],
	})
	.bundle()
	.pipe(source('app.js'))
	.pipe(plumber())
    .pipe(gulp.dest('js'));
});

gulp.task('min-scripts', () => {
	return gulp.src(['js/app.js'])
	.pipe(plumber())
	.pipe(uglify())
	.pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('js'));
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
	.pipe(gulp.dest('./'));
});

gulp.task('sass', () => {
	return gulp.src(['src/scss/**/*.scss', 'src/scss/**/*.css', 'src/css/**/*.css'])
	.pipe(plumber())
	.pipe(sass.sync())
	.pipe(autoprefixer({
		browsers: ['last 3 versions'],
	}))
	.pipe(concat('app.css'))
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('css'));
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
	.pipe(gulp.dest('fonts'));
});

gulp.task('min-image', () => {
	return gulp.src('src/img/**/*')
	.pipe(plumber())
	.pipe(imagemin())
	.pipe(gulp.dest('img'));
});

gulp.task('prod', () => {
	process.env.NODE_ENV = 'production';
});

gulp.task('all', (callback) => {
	sequence('prod', 'compile-scripts', 'min-scripts', ['min-html', 'sass', 'fonts'])(callback);
});

gulp.task('watch', () => {
	gulp.watch('src/**', ['all']);
});

gulp.task('default', sequence('all', 'watch'));