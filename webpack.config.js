var webpack = require('webpack');

module.exports = {
  entry: __dirname + '/source/javascripts/index.js',

  output: {
    filename: __dirname + '/source/javascripts/[name].bundle.js'
  },

  watch: true,

  module: {
    loaders: [
      {
        test: /source\/javascripts\/*\.js$/,
        exclude: /node_modules|\/source\/javascripts\/bundle.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  },

  resolve: {
    moduleDirectories: ['node_modules', 'source'],
    extensions: ['', '.js', '.scss']
  }
};
