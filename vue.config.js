const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    host: "localhost",
    port: 8081,
    proxy: {
      "^/api": {
        target: "http://localhost:11339",
        ws: true,
        changeOrigin: true,
      },
    },
  },
})
