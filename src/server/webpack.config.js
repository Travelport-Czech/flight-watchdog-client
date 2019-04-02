const path = require('path')
const Dotenv = require('dotenv-webpack')

const sourceFile = path.resolve(__dirname, 'functions/example.tsx')
const outputDir = path.resolve(__dirname, '../../.dist-server')

let entry = {
  index: ['@babel/polyfill', sourceFile]
}

const plugins = [
  new Dotenv({
    path: path.resolve(__dirname, '../../.env.test'), // load this now instead of the ones in '.env'
    safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
    systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
    silent: false // hide any errors
  })
]

const config = {
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
  stats: 'minimal',
  performance: {
    hints: false
  }
}

module.exports = config
