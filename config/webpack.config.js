const path = require('path');
/** @type any */ const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const publicPath = isProduction ? '/account-book' : '';

module.exports = {
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
  entry: './src/index.js',
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: isProduction,
  },
  output: {
    filename: 'main.js',
    publicPath,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'public',
        ignore: ['index.html'],
      },
    ]),
    new HtmlWebpackPlugin({
      minify: isProduction && {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      template: './public/index.html',
    }),
    new InterpolateHtmlPlugin({
      NODE_ENV: process.env.NODE_ENV || 'development',
      PUBLIC_URL: publicPath,
    }),
  ],
};
