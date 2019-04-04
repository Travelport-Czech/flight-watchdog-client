const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const DtsBundleWebpack = require('dts-bundle-webpack')

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
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader'
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
  plugins: [
    new DtsBundleWebpack({
      baseDir: 'dist-emails',
      main: 'dist-emails/emails/src/index.d.ts',
      name: 'index',
      out: 'index.d.ts',
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, 'tsconfig.json')
    })]
  },
  stats: 'minimal',
  target: 'node'
}

module.exports = config
