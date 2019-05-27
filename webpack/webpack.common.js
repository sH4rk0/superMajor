const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  InjectManifest
} = require('workbox-webpack-plugin')

module.exports = {
  entry: './src/game.ts',
  output: {
    filename: 'game.bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader'
    }]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]|[\\/]src[\\/]plugins[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: '[name].bundle.js'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CopyWebpackPlugin([{
        from: 'src/assets',
        to: 'assets'
      },
      {
        from: 'src/pwa',
        to: ''
      },
      {
        from: 'src/favicon.ico',
        to: ''
      }
    ]),
    new InjectManifest({
      swSrc: path.resolve(__dirname, '../src/pwa/sw.js'),
      exclude: [/\/spine\/raw\/*/]
    })
  ]
}