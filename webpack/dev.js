const webpack = require('webpack')
const path = require('path')

module.exports = {

  devtool: 'source-map',

  entry: {
    'equilateralTriangles': [
      'babel-polyfill',
      'react-hot-loader/patch',
      `${__dirname}/../src/entry/equilateralTriangles.js`
    ]
  },

  output: {
    path: '/',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { 
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]


}