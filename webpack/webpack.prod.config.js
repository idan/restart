'use strict'

import path from 'path'
import webpack from 'webpack'
import config from './webpack.base.config.js'
import SaveAssetsJson from 'assets-webpack-plugin'

config.bail = true
config.debug = false
config.profile = false
config.devtool = '#source-map'

config.output = {
  path: path.join(process.cwd(), './static/dist'),
  pathInfo: false,
  publicPath: '/client/dist/',
  filename: 'bundle.[hash].min.js'
}

config.plugins = config.plugins.concat([
  new webpack.optimize.OccurenceOrderPlugin(true),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({ output: {comments: false} }),
  new SaveAssetsJson({
    path: process.cwd(),
    filename: 'assets.json'
  })
])

config.module.loaders = config.module.loaders.concat([
  {
    test: /\.jsx?$/,
    loaders: ['babel'],
    include: [path.join(process.cwd(), './src/')]
  }
])

export default config
