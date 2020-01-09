const os = require('os')
const path = require('path')
const Dotenv = require('dotenv-webpack')

const sourceFile = path.resolve(__dirname, 'src/example.tsx')
const outputDir = path.resolve(__dirname, '../../dist-emails')

let entry = {
  index: ['@babel/polyfill', sourceFile]
}

let plugins = [
  new Dotenv({
    path: path.resolve(__dirname, '.env'), // load this now instead of the ones in '.env'
    safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
    silent: false, // hide any errors
    systemvars: true // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
  })
]

const babelOptions = {
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    [
      'module-resolver',
      {
        alias: {
          '@emails': './app/emails/src',
          '@shared': './app/shared/src'
        },
        root: ['./src']
      }
    ]
  ],
  presets: ['@babel/preset-env', '@babel/preset-react']
}

const config = {
  devtool: 'source-map',
  entry: entry,
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'babel-loader',
            options: babelOptions
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader'
          },
          {
            loader: 'babel-loader',
            options: babelOptions
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: false
  },
  output: {
    filename: '[name].js',
    path: outputDir
  },
  performance: {
    hints: false
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  stats: 'minimal',
  target: 'web'
}

module.exports = config
