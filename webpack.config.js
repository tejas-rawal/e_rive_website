var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Clean = require('clean-webpack-plugin');

var definePlugin = new webpack.DefinePlugin({
  __DEVELOPMENT__: JSON.stringify(JSON.parse(process.env.WEBPACK_ENV === 'development')),
  __DEBUG__:       JSON.stringify(JSON.parse(process.env.WEBPACK_ENV === 'debug')),
  __BUILD__:       JSON.stringify(JSON.parse(process.env.WEBPACK_ENV === 'build')),
  __VERSION__:     (new Date().getTime().toString())
});

module.exports = {
  entry: {
    index: [
      __dirname + '/source/stylesheets/site.scss',
      __dirname + '/source/javascripts/index.js'
    ]
  },

  resolve: {
    root: __dirname + '/source/javascripts',
  },

  output: {
    path: __dirname + '/.tmp/dist',
    filename: 'assets/javascripts/[name].bundle.js'
  },

  module: {
    loaders: [
      {
        test: /source\/javascripts\/*\.js$/,
        exclude: /node_modules|\.tmp|vendor/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      },

      {
        test: /.*\.scss$/,
        loader: ExtractTextPlugin.extract('style', "css!sass?sourceMap&includePaths[]=" + __dirname + "/node_modules")
      },

      { test: /\.css$/, loader: "style!css" }
    ]
  },

  node: {
    console: true
  },

  plugins: [
    definePlugin,
    new Clean(['.tmp']),
    new ExtractTextPlugin('assets/stylesheets/index.bundle.css', {
      allChunks: true
    })
  ],

  resolve: {
    moduleDirectories: ['node_modules', 'source'],
    extensions: ['', '.js', '.scss']
  }
};
