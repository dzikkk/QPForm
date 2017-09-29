var webpack = require('webpack');

module.exports = {
  entry: __dirname + '/src/index.js',

  // verbose: true,
  output: {
    path: __dirname + '/public',
    filename: 'app.build.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'], cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader'
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader'
      }
    ]
  },
};
