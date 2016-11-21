const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  css: path.join(__dirname, 'public/css'),
  dist: path.join(__dirname, 'public/dist')
};

module.exports = {
  devtool: 'source-map',
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js']
  },
  entry: {
    app: PATHS.src,
    vendor: [
      'd3',
      'deep-diff',
      'immutable',
      'jquery',
      'js-cookie',
      'kendo-ui-web/scripts/kendo.grid.min',
      'kendo-ui-web/scripts/kendo.combobox.min',
      'kendo-ui-web/scripts/kendo.datepicker.min',
      'kendo-ui-web/scripts/kendo.tooltip.min',
      'kendo-ui-web/scripts/kendo.data.min',
      'leaflet-textpath',
      'mapbox.js',
      'moment',
      'moment-timezone',
      'q',
      'react',
      'react-bootstrap',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-bootstrap',
      'react-spin',
      'redux',
      'redux-thunk',
      'toastr',
    ],
  },
  output: {
    path: PATHS.dist,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js',
    publicPath: '/public/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\kendo.*.min.js$/,
        loader: 'imports?jQuery=jquery,$=jquery',
      },
      {
        test: require.resolve('leaflet-textpath'),
        loader: 'imports?L=mapbox.js',
      },
      {
        test: /\.css$/,
        loader: ExtractTextWebpackPlugin.extract('css'),
        include: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'bower_components'), PATHS.css]
      },
      {
        test: /\.less$/,
        loader: ExtractTextWebpackPlugin.extract('css!less'),
        include: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'bower_components'), PATHS.css]
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url?limit=25000',
      },
      {
        test: /\.css$/,
        loaders: ['style/url', 'file?name=[name].[hash].css', 'extract', 'css'],
        include: PATHS.src
      },
      {
        test: /\.less$/,
        loaders: ['style/url', 'file?name=[name].[hash].css', 'extract', 'css', 'less'],
        include: PATHS.src
      },
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: PATHS.src
      },
    ]
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    ),
    new ExtractTextWebpackPlugin('[name].[contenthash].css', {
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      publicPath: '/public/dist/'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"',
        'apiBaseUrl': '"https://hidden-ravine-51571.herokuapp.com"',
        'configFilesUrl': '"https://hidden-ravine-51571.herokuapp.com/configFiles/"',
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};
