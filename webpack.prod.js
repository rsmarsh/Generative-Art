const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Project Starter',
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([{ from: 'static', to: 'dist' }])
  ]
});
