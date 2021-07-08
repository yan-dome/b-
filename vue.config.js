// vue.config.js配置

module.exports = {
  productionSourceMap: true,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
};
