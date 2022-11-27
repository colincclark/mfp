const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")

const packageJSON = require('../package.json')
const commonConfig = require('./webpack.common')

const domain = process.env.PRODUCTION_DOMAIN

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
      },
      shared: packageJSON.dependencies,
    })
  ]
}

module.exports = merge(commonConfig, prodConfig)
