var gulp=require("gulp"),
    webpack=require("webpack"),
    //gutil = require("gulp-util"),
    less=require('gulp-less'),
    jade=require('gulp-jade'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    uglify = require('gulp-uglify'),
    concat=require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps=require('gulp-sourcemaps'),
    spriter = require('gulp-css-spriter'),
    webpackConfig=require('./webpack.config.js');

gulp.task("webpack",function(callback){
    var myConfig=Object.create(webpackConfig)
    webpack(myConfig,function(err,status){
        // if(err) throw new gutil.PluginError("webpack", err);
        // gutil.log("[webpack]", stats.toString({
        //	 // output options
        // }));
        callback();
    })
})


gulp.task('less', ['webpack'],function () {
    gulp.src('src/webpack/*.less')
        //.pipe(sourcemaps.init())
        .pipe(less({compress: true}))
        //.pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 5 version']
        }))
        /*
		.pipe(spriter({
			'spriteSheet': './dist/img/spritesheet.png',
			'pathToSpriteSheetFromCSS': '../img/spritesheet.png'
		}))
        */
        .pipe(gulp.dest('dist/style'));
});


gulp.task('jade', function () {
    gulp.src('src/jade/*.jade')
      .pipe(jade({pretty: '    '}))   //生成html以4个空格缩进
      //.pipe(minify())
      .pipe(gulp.dest('dist/html'));
});

gulp.task('imagemin', function () {
    gulp.src('src/widgets/**/img/*')
		.pipe(imagemin({
			progressive: true,
            optimizationLevel:1,  //优化压缩 数字越大压缩越多 0~7
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('compress',['webpack'], function() {
  gulp.src('src/js/lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/lib'));
  gulp.src('src/webpack/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});


gulp.task('clean', function() {
    gulp.src('dist')
        .pipe(clean());
});

gulp.task('copy', function () {
    gulp.src(['src/img/**'])
        .pipe(gulp.dest('dist/img/**'));
});


gulp.task('watch', function(){
    gulp.watch(['src/css/*.less'],['less']);
    gulp.watch(['src/widgets/**/*.jade'],['jade']);
    gulp.watch(['src/widgets/**/*.less','src/widgets/**/*.js'],['webpack']);
    gulp.watch(['src/webpack/*.js'],['compress']);
    gulp.watch(['src/webpack/*.less'],['less']);
    gulp.watch(['src/widgets/**/img/**'],['imagemin']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('dist', ['webpack','less','compress','jade','imagemin','copy']);

gulp.task('default', ['dist','watch']);
 

