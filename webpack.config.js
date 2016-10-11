var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/chrome/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app/components');

var config = {
  entry: {
    app: APP_DIR + '/app.jsx'
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js'
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
