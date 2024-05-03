const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devServer: {
    hot: true,
    port: 8080,
    open: true,
    historyApiFallback: true,
    compress: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
  devtool: 'eval-cheap-module-source-map',
};

module.exports = merge(commonConfig, devConfig);
