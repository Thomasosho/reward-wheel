// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './widget-server/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'widget-server/public/static/widget'),
    publicPath: '/static/widget/'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};
