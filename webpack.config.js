const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const currentPath = path.join(__dirname);
const basePath = currentPath + '/.env';

const envPath = basePath + '.' + process.env.ENVIRONMENT;
const finalPath = fs.existsSync(envPath) ? envPath : basePath;
const fileEnv = dotenv.config({path: finalPath}).parsed;

const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
  return prev;
}, {});

const config = {
  entry: ['react-hot-loader/patch', './src/index.tsx'],
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    contentBase: './dist',
  },
  node: {
    fs: 'empty',
  },
  plugins: [new webpack.DefinePlugin(envKeys)],
};

module.exports = config;
