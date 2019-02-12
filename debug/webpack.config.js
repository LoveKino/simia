var path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: ['./index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name].js'
  },
  module: {},
  plugins: []
};
