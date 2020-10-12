const path = require('path')

module.exports = {
  resolve: {
    alias: {
      'vue': path.resolve(__dirname, '..', '..', 'node_modules/vue/dist/vue.esm-bundler.js'),
    }
  }
}
