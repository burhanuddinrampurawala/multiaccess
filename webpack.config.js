const webpack = require('webpack');
const path = require('path');
console.log(__dirname)
module.exports = {
  entry: __dirname + '/view/react_comp/mainComponent.js',
  output: {
    path: __dirname   + '/view/static/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
     {
       use: {
         loader: 'babel-loader',
         query: {
           presets: ['react','es2015'],
           plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties']
         }
       },
     },
   ],
  },
};
