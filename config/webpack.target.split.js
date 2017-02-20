'use strict'

const path = require('path')
const merge = require('webpack-merge')
const {filename, production} = require('./webpack.vars')

module.exports = merge(
  require('./webpack.config.base.js'),
  require(production ? './webpack.config.prod' : './webpack.config.dev'),
  require('./webpack.config.extract'),
  {
    output: {
      filename: filename('js'),
      path: path.resolve(__dirname, '../dist')
    }
  }
)
