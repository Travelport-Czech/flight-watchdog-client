const os = require('os')
const path = require('path')
const Dotenv = require('dotenv-webpack')

const sourceFile = path.resolve(__dirname, 'src/index.tsx')
const outputDir = path.resolve(__dirname, '../../dist-client')

let entry = {
  index: ['@babel/polyfill', sourceFile],
}

let plugins = [
  new Dotenv({
    path: path.resolve(__dirname, '.env'), // load this now instead of the ones in '.env'
    safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
    silent: false, // hide any errors
    systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
  }),
]

const babelOptions = {
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    [
      'module-resolver',
      {
        alias: {
          '@client': './app/client/src',
          '@shared': './app/shared/src',
        },
        root: ['./src'],
      },
    ],
  ],
  presets: [['@babel/preset-env', { targets: '> 0.25%, not dead' }], '@babel/preset-react'],
}

const clientConfig = {
  devtool: 'source-map',
  entry: entry,
  mode: process.env.NODE_ENV === 'test' ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: process.env.NODE_ENV === 'test' ? /node_modules/ : undefined,
        use: [
          {
            loader: 'cache-loader',
          },
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(js)x?$/,
        exclude: process.env.NODE_ENV === 'test' ? /node_modules/ : undefined,
        use: [
          {
            loader: 'cache-loader',
          },
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
  },
  output: {
    filename: '[name].js',
    path: outputDir,
  },
  performance: {
    hints: false,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  stats: 'minimal',
  target: 'web',
}

module.exports = clientConfig
