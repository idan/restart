import path from 'path'

export function runWebpackDevServer () {
  const webpack = require('webpack')
  const WebpackDevServer = require('webpack-dev-server')

  // .default because babel@6.x, see https://github.com/babel/babel/issues/2760
  const webpackConfig = require(path.join(process.cwd(), './webpack/webpack.dev.config')).default
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: '/static/',
    contentBase: './client/',
    inline: true,
    hot: true,
    stats: false,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    }
  }).listen(3001, 'localhost', function (err, result) {
    if (err) {
      console.log(err)
    }

    console.log('✅  ==> webpack dev server listening on localhost:3001')
  })
}
