var gulp = require('gulp'),
	connect = require('gulp-connect'),
	watch = require('gulp-watch'),
  uglify = require('gulp-uglify'),
	sass = require('gulp-ruby-sass')

var sources = {
    'scripts': [
      './scripts/*.js'
    ],
    'sass' : [
    	'./scss/main.scss'
    ]
}

var develop = {
  'scripts' : './scripts/',
  'css' : './css/',
  'templates' : './templates/',
  'fonts' : './fonts/*',
  'images' : './images/**/*',
  'files' : [
    './robots.txt',
    './xdomain.js',
    './svg_map.html'
  ]
}

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('scripts:dev', function() {
    gulp.src(sources.scripts)
        .pipe(connect.reload());
});

gulp.task('sass:dev', function () {
  sass(sources.sass, {
      sourcemap: false, 
      style: 'compact', 
      compass: true,
      debugInfo: false
    })
    .pipe(gulp.dest(develop.css))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  watch(sources.scripts, function(){
    gulp.start('scripts:dev')
  });
  watch('./scss/*.scss', function(){
    gulp.start('sass:dev');
  });
});


gulp.task('connect', function() {
  connect.server({
    root: __dirname,
    port: '9215',
    livereload: true,
    host: 'localhost',
    fallback: 'index.html'
  });
});
 
gulp.task('server', ['connect', 'watch', 'sass:dev']);

gulp.task('build', function(cb) {
  runSequence('clean',['scripts:prod', 'sass:prod', 'html:prod'],['replace','copyFiles'],cb);
});


