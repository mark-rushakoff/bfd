/* eslint-disable no-var */

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [path.resolve(__dirname, 'app', 'main.js')],
  output: {
    path: path.resolve(__dirname, 'dev'),
    filename: 'static/app.dev.js',
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /fonts\/\w+\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'static/fonts/[hash].[ext]',
        },
      },
      {
        test: /img\/[-\w]+\.(png|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'static/img/[hash].[ext]',
        },
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          optional: ['runtime'],
        },
      },
    ],
  },
  eslint: {
    failOnWarning: false,
    failOnError: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'DEV_BUILD': true,
    }),
    new HtmlWebpackPlugin({
      title: 'jsbf',
    }),
  ],
};
