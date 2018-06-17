var gulp = require('gulp');
var uncss = require('gulp-uncss');
var csscomb = require('gulp-csscomb');
var cssnano = require('gulp-cssnano');
var csso = require('gulp-csso');
var jsbeautifier = require('gulp-jsbeautifier');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var commentz = require('gulp-commentz');
var fs = require('fs');

gulp.task('css', function () {
	return gulp.src('css/base.css')
		.pipe(uncss({ html: ['base.html'] }))
		.pipe(cssnano({ zindex: false }))
		.pipe(csscomb())
		.pipe(csso())
		.pipe(jsbeautifier())
		.pipe(rename('new.css'))
		.pipe(gulp.dest('css'));
});

gulp.task('html', function() {
	return gulp.src(['base.html'])
		.pipe(jsbeautifier())
		.pipe(rename('new.html'))
		.pipe(replace('base.css', 'new.css'))
		.pipe(gulp.dest('.'));
});

gulp.task('csslast', function () {
	return gulp.src('css/new.css')
		.pipe(uncss({ html: ['new.html'] }))
		.pipe(cssnano({ zindex: false }))
		.pipe(csscomb())
		.pipe(csso())
		.pipe(jsbeautifier())
		.pipe(rename('last.css'))
		.pipe(gulp.dest('css'));
});

gulp.task('htmllast', function() {
	return gulp.src(['new.html'])
		.pipe(commentz())
		.pipe(jsbeautifier())
		.pipe(rename('last.html'))
		.pipe(replace('new.css', 'last.css'))
		.pipe(replace('__x__', ''))
		.pipe(replace('__x1__', ''))
		.pipe(replace('__x2__', ''))
		.pipe(replace('__x3__', ''))
		.pipe(replace('__x4__', ''))
		.pipe(replace('__x5__', ''))
		.pipe(replace('__x6__', ''))
		.pipe(replace('__x7__', ''))
		.pipe(replace('__x8__', ''))
		.pipe(replace('__x9__', ''))
		.pipe(replace('__x10__', ''))
		.pipe(replace('__x11__', ''))
		.pipe(jsbeautifier())
		.pipe(gulp.dest('.'));
});

gulp.task('cssc', function () {
	gulp.src('css/new.css')
		.pipe(cssnano({ zindex: false }))
		.pipe(csscomb())
		.pipe(csso())
		.pipe(jsbeautifier())
		.pipe(gulp.dest('css'));
});

gulp.task('cssl', function () {
	gulp.src('css/last.css')
		.pipe(cssnano({ zindex: false }))
		.pipe(csscomb())
		.pipe(csso())
		.pipe(jsbeautifier())
		.pipe(gulp.dest('css'));
});

gulp.task('watch', function(){
	try {
		fs.accessSync('new.html');
	} catch (e) {
		gulp.src(['newx.js'])
			.pipe(rename('new.html'))
			.pipe(gulp.dest('.'));
	}finally{
		console.log('Lütfen Bekleyin...');
		setTimeout(function(){
			gulp.watch('base.html', ['css', 'html']);
			gulp.watch('new.html', ['csslast', 'htmllast']);
			gulp.watch('css/new.css', ['cssc']);
			gulp.watch('css/last.css', ['cssl']);
			console.log('İşlemler Başladı.');
		}, 5000); 
	}
})



/* CSSUSED Chrome Extension Verison */

gulp.task('html2', function() {
	return gulp.src(['base.html'])
		.pipe(jsbeautifier())
		.pipe(rename('new.html'))
		.pipe(replace('base.css', 'new.css'))
		.pipe(gulp.dest('.'));
});

gulp.task('htmllast2', function() {
	return gulp.src(['new.html'])
		.pipe(commentz())
		.pipe(jsbeautifier())
		.pipe(rename('last.html'))
		.pipe(replace('new.css', 'last.css'))
		.pipe(replace('__x__', ''))
		.pipe(replace('__x1__', ''))
		.pipe(replace('__x2__', ''))
		.pipe(replace('__x3__', ''))
		.pipe(replace('__x4__', ''))
		.pipe(replace('__x5__', ''))
		.pipe(replace('__x6__', ''))
		.pipe(replace('__x7__', ''))
		.pipe(replace('__x8__', ''))
		.pipe(replace('__x9__', ''))
		.pipe(replace('__x10__', ''))
		.pipe(replace('__x11__', ''))
		.pipe(jsbeautifier())
	.pipe(gulp.dest('.'));
});

gulp.task('cssc2', function () {
	gulp.src('css/new.css')
		.pipe(cssnano({ zindex: false }))
		.pipe(csscomb())
		.pipe(csso())
		.pipe(jsbeautifier())
		.pipe(gulp.dest('css'));
});

gulp.task('cssl2', function () {
	gulp.src('css/last.css')
		.pipe(cssnano({ zindex: false }))
		.pipe(csscomb())
		.pipe(csso())
		.pipe(jsbeautifier())
		.pipe(gulp.dest('css'));
});

gulp.task('watch2', function(){
	try {
		fs.accessSync('new.html');
	} catch (e) {
		gulp.src(['newx.js'])
			.pipe(rename('new.html'))
			.pipe(gulp.dest('.'));
	}finally{
		console.log('Lütfen Bekleyin...');
		setTimeout(function(){
			gulp.watch('base.html', ['html2']);
			gulp.watch('new.html', ['htmllast2']);
			gulp.watch('css/new.css', ['cssc2']);
			gulp.watch('css/last.css', ['cssl2']);
			console.log('İşlemler Başladı.');
		}, 5000); 
	}
})
