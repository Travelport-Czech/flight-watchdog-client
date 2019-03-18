const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const sourceFile = path.resolve(__dirname, 'index.tsx')
const sourceFileEmailPreview = path.resolve(__dirname, 'email.tsx')
const outputDir = path.resolve(__dirname, '../../.dist')

let entry = {
  index: ['@babel/polyfill', sourceFile]
}

let plugins = [
  new Dotenv({
    path: path.resolve(__dirname, '../../.env.' + process.env.NODE_ENV), // load this now instead of the ones in '.env'
    safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
    systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
    silent: false // hide any errors
  })
]

if (process.env.NODE_ENV !== 'test') {
  plugins.push(
    new CompressionPlugin({
      filename: '[path][query]',
      algorithm: 'gzip',
      test: /\.js/,
      threshold: 10240,
      minRatio: 0.8
    })
  )
} else {
  entry.email = ['@babel/polyfill', sourceFileEmailPreview]
}

const clientConfig = {
  mode: 'production',
  entry: entry,
  devtool: 'source-map',
  optimization: {
    minimize: process.env.NODE_ENV === 'prod'
  },
  target: 'web',
  output: {
    path: outputDir,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader?cacheDirectory=true',
        options: {
          presets: [
            ['@babel/preset-env', { targets: '> 0.25%, not dead' }],
            '@babel/typescript',
            '@babel/preset-react'
          ],
          plugins: [
            '@babel/proposal-class-properties',
            '@babel/proposal-object-rest-spread',
            [
              'module-resolver',
              {
                root: ['./src'],
                alias: {
                  src: './src',
                  tests: './src/tests'
                }
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: plugins,
  stats: 'minimal'
}

module.exports = clientConfig
