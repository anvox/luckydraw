const { environment } = require('@rails/webpacker')

// Custom to add vue-loader to webpack
const { VueLoaderPlugin } = require('vue-loader')
const vue = require('./loaders/vue')

environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())
environment.loaders.prepend('vue', vue)

// Load pug
const pugConfig = require('./loaders/pug')
environment.loaders.append("pug", pugConfig);

// ----------------------------
module.exports = environment
