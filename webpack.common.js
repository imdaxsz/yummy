const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash:6].js',
    chunkFilename: '[name].[id].[contenthash:6].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, 'babel.config.json'),
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@apis': path.resolve(__dirname, 'src/apis'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@libs': path.resolve(__dirname, 'src/libs'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './public/favicon.ico',
    }),
    new Dotenv(),
    new CopyWebpackPlugin({
      patterns: [{ from: './offline.html', to: 'offline.html' }],
    }),
    new WebpackPwaManifest({
      name: 'yummy',
      short_name: 'yummy',
      description: '맛집 정보 공유 웹앱',
      background_color: '#ffffff',
      crossorigin: 'anonymous',
      dir: 'ltr',
      display: 'standalone',
      orientation: 'any',
      scope: '/',
      start_url: '/',
      theme_color: '#ffcd00',
      icons: [
        {
          src: path.resolve(__dirname, 'public/logo-512x512.png'),
          type: 'image/png',
          sizes: [72, 96, 128, 144, 192, 384, 512],
        },
      ],
      filename: 'manifest.json',
    }),

    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: './src/sw.js',
      swDest: 'sw.js',
      maximumFileSizeToCacheInBytes: 1024 * 1024 * 10,
    }),
  ],
};
