import { src, dest, watch, series } from 'gulp';
import sass from 'sass';  // Importar el paquete 'sass'
import gulpSass from 'gulp-sass';  // Usar 'gulp-sass' para integrar 'sass'

// Configurar gulp-sass con 'sass' como el compilador
const sassCompiler = gulpSass(sass);

// Tarea para procesar archivos JS
export function js(done) {
  return src('src/js/app.js')
    .pipe(dest('build/js', { sourcemaps: '.' }))
    .on('end', done);
}

// Tarea para procesar archivos SCSS a CSS
export function css(done) {
  return src('src/scss/app.scss', { sourcemaps: true })
    .pipe(sassCompiler().on('error', sassCompiler.logError)) // Usar 'sassCompiler' para procesar SCSS
    .pipe(dest('build/css', { sourcemaps: '.' }))
    .on('end', done);
}

// Tarea para vigilar los cambios en los archivos SCSS y JS
export function dev() {
  watch('src/scss/**/*.scss', css);  // Vigilar cambios en los archivos SCSS
  watch('src/js/**/*.js', js);      // Vigilar cambios en los archivos JS
}

// Tarea predeterminada
export default series(js, css, dev);