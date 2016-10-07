var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/chrome/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: [
    // 'webpack-dev-server/client?http://0.0.0.0:3000',
    // 'webpack/hot/only-dev-server',
    APP_DIR + '/index.jsx'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx/,
        include: APP_DIR,
        loader: 'babel'
      }
    ]
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ]
};

module.exports = config;
