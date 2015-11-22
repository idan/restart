'use strict'

import path from 'path'
import webpack from 'webpack'
import config from './webpack.base.config.js'

if (process.env['NODE_ENV'] !== 'test') {
  config.entry = [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/dev-server',
    config.entry
  ]
}

config.devtool = 'eval-source-map'

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin()
])

config.module.loaders = config.module.loaders.concat([
  {
    test: /\.jsx?$/,
    loaders: ['react-hot', 'babel'],
    include: [
      path.join(process.cwd(), './src/')
    ]
  }
])

export default config
