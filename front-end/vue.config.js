const { defineConfig } = require("@vue/cli-service");
const fs = require('fs')
const Dotenv = require('dotenv-webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: "http://localhost:3000",
    https: {
      key: fs.readFileSync('./src/cert/key.pem'),
      cert: fs.readFileSync('./src/cert/cert.pem'),
    },
  },
  configureWebpack: {
    plugins: [
      new Dotenv()
    ]
  }
});