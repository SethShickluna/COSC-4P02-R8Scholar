// Import Webpack npm module
const webpack = require('webpack')
const path = require('path')

module.exports = {
  // Which file is the entry point to the application
  entry: './src/index.js',
  // Which file types are in our project, and where they are located
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // Where to output the final bundled code to
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "build.js",
  },
  devtool: 'eval', 
  module: {
    // How to process project files with loaders
    rules: [
      // Process any .js or .jsx file with Babel
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader'], 
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: "10000",
        }
      }
    ]
  }
}
