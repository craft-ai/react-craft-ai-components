const path = require('path');

const MODE =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  entry: './src/index.js',
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          rootMode: 'upward'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  output: {
    filename:
      MODE === 'production'
        ? 'react-craft-ai-decision-tree.min.js'
        : 'react-craft-ai-decision-tree.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'DecisionTree',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
};
