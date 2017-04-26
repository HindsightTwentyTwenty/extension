var webpack = require('webpack');
var path = require('path');
require('es6-promise').polyfill();

var BUILD_DIR = path.resolve(__dirname, 'src/client/chrome/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app/');
//TODO: TAKE OUT TOTAL
var TOTAL_REACT_DIR = path.resolve(__dirname, 'src/client/');
var INJECT_DIR = path.resolve(__dirname, 'src/client/chrome/');


var config = {
  entry: {
    app: APP_DIR + '/index.js',
    sidebar: INJECT_DIR + '/scripts/inject.js'
  },
  output: {
    path: BUILD_DIR,
    filename: "[name].entry.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx|\.js/ ,
        include: [APP_DIR, INJECT_DIR],
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        include: /\.json$/,
        loaders: ["json-loader"]
      }
    ]
  }
};

module.exports = config;
