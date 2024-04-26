const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
  const IS_PRODUCTION = argv.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '/',
    },
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
    devtool: IS_PRODUCTION ? 'source-map' : 'eval-cheap-module-source-map',
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
    ],
  };
};
