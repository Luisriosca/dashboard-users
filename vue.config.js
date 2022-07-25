const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer:{
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    proxy:'http://localhost:8080/'
  }
})
