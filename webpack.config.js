const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const config = {
  entry: {
    index: path.resolve(__dirname, './assets/pbr/js/index.jsx'),
    midi: path.resolve(__dirname, './assets/midi/js/index.jsx'),
    vr: path.resolve(__dirname, './assets/vr/js/index.jsx'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './public/build'),
    filename: '[name].js',
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new WebpackAssetsManifest(),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'eval-source-map';
  }

  if (argv.mode === 'production') {
    config.devtool = false;
  }

  return config;
};
