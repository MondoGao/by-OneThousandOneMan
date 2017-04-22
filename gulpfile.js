const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const Gulp = require('gulp');
const GulpClean = require('gulp-clean');
const fs = require('fs')
const { resolve } = require('path')

const prodConfig = require('./build/webpack.prod.config');
const devConfig = require('./build/webpack.dev.config');

const utils = require('./build/utils');

Gulp.task('clean', () =>
  Gulp.src('./dist', {read: false})
    .pipe(GulpClean())
);

Gulp.task('generate:assetsList', () => {
  fs.readdir(resolve(__dirname, 'src', 'assets'), (err, files) => {
    fs.open(resolve(__dirname, 'src', 'assets', 'loadingList.js'), 'w+', (err, file) => {
      let list = []
      
      files.forEach((fileName, index) => {
        const line = `import asset${index} from './${fileName}' \n`
        list.push(`asset${index}`)
        fs.writeSync(file, line)
      })
      
      const conclution = `export default [${list.join(',')}]`
      fs.writeSync(file, conclution)
    })
  })
})

Gulp.task('build', ['clean'], function () {
  utils.build(Webpack, prodConfig);
});

Gulp.task('serve', function () {
  utils.serve(Webpack, WebpackDevServer, devConfig);
});

Gulp.task('default', ['serve']);