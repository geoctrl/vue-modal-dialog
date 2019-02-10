const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {};

config.entry = path.resolve(__dirname, 'dev/index.js');
config.output = {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'build/'),
  publicPath: '/',
};

// vue.js npm package is runtime-only - use the dist version to get the compiler
config.resolve = {
  alias: {
    vue: 'vue/dist/vue.esm.js'
  }
};

config.mode = 'development';
config.devtool = 'source-map';

config.module = {
  rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer')
            ],
          },
        },
        'sass-loader',
      ],
      exclude: /node_modules/,
    },
  ]
};

config.plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'dev/index.html'),
  }),
];

config.devServer = {
  index: 'index.html',
  contentBase: path.resolve(__dirname, 'dev'),
  historyApiFallback: true,
};

module.exports = config;