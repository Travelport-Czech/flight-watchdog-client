const path = require('path')
const slsw = require('serverless-webpack')
const Dotenv = require('dotenv-webpack')
const nodeExternals = require('webpack-node-externals')

const entries = {}

Object.keys(slsw.lib.entries).forEach(key => (entries[key] = ['./source-map-install.js', slsw.lib.entries[key]]))

const plugins = [
  new Dotenv({
    path: path.resolve(__dirname, '.env.' + process.env.NODE_ENV), // load this now instead of the ones in '.env'
    safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
    systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
    silent: false // hide any errors
  })
]

const serverConfig = {
  mode: 'production', // dev mode couses memory leak
  optimization: {
    minimize: false
  },
  externals: process.env.NODE_ENV === 'test' ? [nodeExternals()] : [/aws-sdk/],
  entry: entries,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.dist-server'),
    filename: '[name].js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', { targets: { node: '8.10' } }], '@babel/typescript', '@babel/preset-react'],
          plugins: [
            '@babel/proposal-class-properties',
            '@babel/proposal-object-rest-spread',
            [
              'module-resolver',
              {
                root: ['./src'],
                alias: {
                  src: './src'
                }
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: process.env.NODE_ENV === 'test' ? plugins : [],
  stats: 'minimal'
}

module.exports = serverConfig
