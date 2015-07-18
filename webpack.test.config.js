/* eslint-disable no-var */

var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval',
  entry: './webpack.spec-loader.js',
  output: {
    path: path.resolve(__dirname, 'built_specs'),
    filename: 'all_specs.js',
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
        test: /\.(scss|svg)$/,
        loader: 'null-loader',
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
    configFile: 'spec/.eslintrc', // only for test; prod will ignore these
    failOnWarning: false,
    failOnError: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'DEV_BUILD': true,
    }),
  ],
};
