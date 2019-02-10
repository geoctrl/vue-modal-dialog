const path = require('path');
const config = {}

config.entry = path.resolve(__dirname, 'src/index.js');
config.output = {
  filename: 'index.js',
  path: path.resolve(__dirname, 'build/'),
  library: 'vue-modal-dialog',
  libraryTarget: 'umd',
};

config.externals = {
  vue: 'Vue'
};

config.mode = 'production';
config.module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    },
  ],
};


module.exports = config;