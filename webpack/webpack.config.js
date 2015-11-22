'use strict'

let isProduction = process.env['NODE_ENV'] === 'production'
console.log(`NODE_ENV: ${process.env['NODE_ENV']}`)
let config = isProduction ? require('./webpack.prod.config.js').default
                          : require('./webpack.base.config.js').default

// Can't use export default using babel@6.x, see https://github.com/babel/babel/issues/2760
module.exports = config
