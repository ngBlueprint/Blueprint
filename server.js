const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.dev');
const express = require('express')
const http = require('http')
let app = express();


new WebpackDevServer(webpack(config), {
  headers: {
      "Access-Control-Allow-Origin": "*"
  },
  publicPath: config.output.publicPath, 
  hot: true,
  inline: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});