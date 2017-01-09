var webpack = require('webpack');
var path = require('path');
require('es6-promise').polyfill();

var BUILD_DIR = path.resolve(__dirname, 'src/client/chrome/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app/');

var config = {
  entry: {
    app: APP_DIR + '/index.js'
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx|\.js/ ,
        include: APP_DIR,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
};

module.exports = config;
