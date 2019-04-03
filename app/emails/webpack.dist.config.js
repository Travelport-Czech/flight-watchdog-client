const path = require('path')

const sourceFile = path.resolve(__dirname, 'src/index.ts')
const outputDir = path.resolve(__dirname, '../../dist-emails')

let entry = {
  index: ['@babel/polyfill', sourceFile]
}

const config = {
  devtool: 'source-map',
  entry: entry,
  mode: 'production',
  module: {
    rules: [
      {
        loader: 'babel-loader?cacheDirectory=true',
        options: {
          plugins: [
            '@babel/proposal-class-properties',
            '@babel/proposal-object-rest-spread',
            [
              'module-resolver',
              {
                alias: {
                  emails: './app/emails/src',
                  shared: './app/shared/src'
                },
                root: ['./src']
              }
            ]
          ],
          presets: [
            ['@babel/preset-env', { targets: { node: '8.10' } }],
            '@babel/typescript',
            '@babel/preset-react'
          ],
        },
        test: /\.(ts|js)x?$/
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
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  stats: 'minimal',
  target: 'node'
}

module.exports = config
