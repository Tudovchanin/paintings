const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const path = require('path');


module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true), 
        __VUE_OPTIONS_API__: JSON.stringify(false), 
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },

  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/main.scss";`, 
      },
    },
  },


});