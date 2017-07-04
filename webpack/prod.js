const webpack = require('webpack')
const Extract = require('extract-text-webpack-plugin')
const MinCss = require('optimize-css-assets-webpack-plugin')
const cssProcessor = require('cssnano')

module.exports = {

  entry: {
    [`equilateralTriangles.js`]: [
      'babel-polyfill',
      `${__dirname}/../src/entry/equilateralTriangles.js`
    ],
    [`equilateral-triangles.css`]: `${__dirname}/../src/style/patterns/equilateral-triangles.scss`
  },

  output: {
    path: `${__dirname}/../build`,
    filename: '[name]'
  },

  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader' 
      },
      { 
        test: /\.json$/, 
        exclude: /node_modules/, 
        loader: 'json-loader' 
      },
      { 
        test: /\.html$/, 
        exclude: /node_modules/, 
        loader: 'raw-loader' 
      },
      { 
        test: /\.scss$/, 
        exclude: /node_modules/, 
        use: Extract.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        }) 
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false }
    }),
    new Extract({filename: '[name]'}),
    new MinCss({cssProcessor})
  ]

}