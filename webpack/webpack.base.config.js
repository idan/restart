'use strict'

import path from 'path'
import webpack from 'webpack'
import objectAssign from 'object-assign'

let _env = process.env['NODE_ENV']

let env = {
  production: _env === 'production',
  staging: _env === 'staging',
  test: _env === 'test',
  development: _env === 'development' || typeof _env === 'undefined'
}

objectAssign(env, {
  build: (env.production || env.staging)
})

module.exports = {
  target: 'web',

  entry: './src/client.js',

  output: {
    path: path.join(process.cwd(), './static/dist'),
    pathInfo: true,
    publicPath: 'http://localhost:3001/client/',
    filename: 'bundle.js'
  },

  resolve: {
    modulesDirectories: [
      'web_modules',
      'node_modules',
      'client'
    ],
    extentions: ['js', 'jsx', 'scss']
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production,
      __CURRENT_ENV__: "'" + (_env) + "'"
    })
  ],

  module: {
    loaders: [
      {test: /\.scss$/, loader: 'style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded'}
    ],

    noParse: /\.min\.js/
  }

}
