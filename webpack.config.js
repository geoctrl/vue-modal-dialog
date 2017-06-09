const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const script = process.env.npm_lifecycle_event;
const isTest = script === 'test' || script === 'test-watch';
const isProd = script === 'build';
const isDev = !isTest && !isProd;

const include = [
    path.resolve(__dirname, 'dev'),
    path.resolve()
];

module.exports = function() {
  let config = {};

  config.entry = isDev ?
      path.resolve(__dirname, 'dev', 'index.js') :
      path.resolve(__dirname, 'src', 'index.js');
  config.output = {
    path: path.resolve(__dirname, isProd ? 'dist' : 'dev'),
    filename: '[name].js',
    publicPath: '/',
    library: 'commonjs2'
  };

  if (isProd) {
    config.devtool = 'source-map';
  }

  // vue.js npm package is runtime-only - use the dist version to get the compiler
  config.resolve = {
    extensions: ['.js', '.scss', '.html'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  };

  config.cache = true;

  if (isProd) {
    config.externals = {
      vue: 'Vue'
    };
  }

  config.module = {
    rules: [
      {
        test: /.scss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader',
        include
      },
      {
        test: /.html$/,
        loader: 'raw-loader?html-minify-loader',
        include
      },
    ]
  };

  if (isDev) {
    config.module.rules.push({
          test: /\.js$/,
          loader: 'babel-loader',
          include
        }
    )
  }


  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        IS_DEV: !isProd,
        IS_PROD: isProd
      }
    })
  ];

  if (isDev) {
    config.plugins.push(
        new HtmlWebpackPlugin({
          template: 'dev/index.ejs',
          isDev,
          isProd
        })
    );
  }

  config.devServer = {
    contentBase: './dev',
    historyApiFallback: {
      index: 'dev/index.html'
    },
    port: 8080
  };

  return config;
}();