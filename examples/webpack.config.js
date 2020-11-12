const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entry = 'index.ts';

module.exports = {
  mode: 'development',

  entry: path.resolve(`./examples/${entry}`),
  output: {
    path: path.resolve('/no-use/dist'),
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, './'),
    historyApiFallback: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './examples/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
};
