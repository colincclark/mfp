const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")

const packageJSON = require('../package.json')
const commonConfig = require('./webpack.common')

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    port: 8080,
    historyApiFallback: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        auth: 'auth@http://localhost:8082/remoteEntry.js',
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
      },
      shared: packageJSON.dependencies,
    })
  ]
}

module.exports = merge(commonConfig, devConfig)
