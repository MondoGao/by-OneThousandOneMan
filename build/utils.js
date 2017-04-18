// const mockServer = require('../mock/server')

function serve(Webpack, WebpackDevServer, webpackConfig) {
  const compiler = Webpack(webpackConfig)
  const server = new WebpackDevServer(compiler, webpackConfig.devServer)

  // mockServer.listen(webpackConfig.devServer.port + 1, () => {
  //   console.log("Starting mock server")
  // })

  server.listen(webpackConfig.devServer.port, "0.0.0.0", function () {
    console.log("Starting sever")
  })
}

function build(Webpack, webpackConfig) {
  Webpack(webpackConfig, (err, stats) => {
    if (err) throw err
  })
}

module.exports = {
  serve,
  build
}