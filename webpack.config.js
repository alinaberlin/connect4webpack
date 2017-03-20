var path = require('path')
var webpack = require('webpack')

// webpack src/app.js bundle.js

module.exports = {
  module: {

    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      }
    ],

    
    postLoaders: [
      {
        include: path.resolve(__dirname, 'node_modules/pixi.js'),
        loader: 'transform?brfs'
      }
    ]

  }
}
