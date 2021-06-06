const pkg = require('./package.json')
const path = require('path')
const glob = require('glob')
const yargs = require('yargs')
const colors = require('colors')
const through = require('through2');

const sass = require('sass')

const gulp = require('gulp')
const tap = require('gulp-tap')

const connect = require('gulp-connect')

const root = yargs.argv.root || '.'
const port = yargs.argv.port || 8000


// Prevents warnings from opening too many test pages
process.setMaxListeners(20);

let cache = {};


// a custom pipeable step to transform Sass to CSS
function compileSass() {
  return through.obj( ( vinylFile, encoding, callback ) => {
    const transformedFile = vinylFile.clone();

    sass.render({
        data: transformedFile.contents.toString(),
        includePaths: ['css/', 'css/theme/template']
    }, ( err, result ) => {
        if( err ) {
            console.log( vinylFile.path );
            console.log( err.formatted );
        }
        else {
            transformedFile.extname = '.css';
            transformedFile.contents = result.css;
            callback( null, transformedFile );
        }
    });
  });
}

gulp.task('css-themes', () => gulp.src(['./css/theme/source/*.scss'])
        .pipe(compileSass())
        .pipe(gulp.dest('./dist/theme')))

gulp.task('css-custom', () => gulp.src(['css/source/*.scss'])
    .pipe(compileSass())
    .pipe(gulp.dest('./dist')))

gulp.task('css', gulp.parallel('css-themes', 'css-custom'))

gulp.task('reload', () => gulp.src(['*.html', '*.md'])
    .pipe(connect.reload()));

gulp.task('serve', () => {

    connect.server({
        root: root,
        port: port,
        host: '0.0.0.0',
        livereload: true
    })

    gulp.watch(['*.html', '*.md', 'js/**'], gulp.series('reload'))

    gulp.watch([
        'css/theme/source/*.{sass,scss}',
        'css/theme/template/*.{sass,scss}',
    ], gulp.series('css-themes', 'reload'))

    gulp.watch(['test/*.html'], gulp.series('test'))

})