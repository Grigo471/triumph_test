const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    clean: true
  },
  devServer: {
    static: './public',
    port: 3000,
    hot: true,
    webSocketServer: false,
  },
  devtool: 'inline-source-map',
};
