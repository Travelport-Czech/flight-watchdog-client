const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const sourceFile = path.resolve(__dirname, 'src/index.ts')
const outputDir = path.resolve(__dirname, '../../dist-emails')

let entry = {
  index: ['@babel/polyfill', sourceFile]
}

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
        root: ['.']
      }
    ]
  ],
    presets: [
    ['@babel/preset-env', { targets: { node: '8.10' } }],
    '@babel/typescript',
    '@babel/preset-react'
  ],
}

const config = {
  devtool: 'source-map',
  entry: entry,
  mode: 'production',
  module: {
    rules: [
      {
        loader: 'babel-loader?cacheDirectory=true',
        options: babelOptions,
        test: /\.(ts)x?$/
      },
      {
        loader: 'ts-loader'
      }
    ]
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'prod'
  },
  output: {
    filename: '[name].js',
    path: outputDir
  },
  performance: {
    hints: false
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, 'tsconfig.json'),
      logLevel: 'info'
    })]
  },
  stats: 'minimal',
  target: 'node'
}

module.exports = config
