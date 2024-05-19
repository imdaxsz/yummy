const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  optimization: {
    minimizer: [new CssMinimizerPlugin(), '...'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      linkType: false,
      filename: '[name].[contenthash:6].css',
      chunkFilename: '[name].[id].[contenthash:6].css',
    }),
    new CopyPlugin({
      patterns: [{ from: 'public/robots.txt', to: './robots.txt' }],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
      reportFilename: 'bundle-report.html',
      excludeAssets: [/node_modules/],
      generateStatsFile: true,
      statsFilename: 'bundle-stats.json',
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
