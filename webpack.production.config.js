/* eslint-disable no-var */

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var headerFile = path.resolve(__dirname, 'webpack.output-banner.txt');

module.exports = {
  devtool: 'hidden-source-map',
  entry: [path.resolve(__dirname, 'app', 'main.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/app.[hash].js',
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /(_s|S)pec\.js$/],
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
    failOnError: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'jsbf',
    }),
    new webpack.DefinePlugin({
      'DEV_BUILD': false,
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.BannerPlugin(fs.readFileSync(headerFile, {encoding: 'utf8', entryOnly: true})),
  ],
};
