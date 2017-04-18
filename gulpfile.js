const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const Gulp = require('gulp');
const GulpClean = require('gulp-clean');

const prodConfig = require('./build/webpack.prod.config');
const devConfig = require('./build/webpack.dev.config');

const utils = require('./build/utils');

Gulp.task('clean', () =>
  Gulp.src('./dist', {read: false})
    .pipe(GulpClean())
);

Gulp.task('build', ['clean'], function () {
  utils.build(Webpack, prodConfig);
});

Gulp.task('serve', function () {
  utils.serve(Webpack, WebpackDevServer, devConfig);
});

Gulp.task('default', ['serve']);