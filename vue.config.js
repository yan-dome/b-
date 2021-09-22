const IS_PROD = ['production'].includes(process.env.NODE_ENV);
module.exports = {
  // css相关配置
  css: {
    extract: IS_PROD, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: !IS_PROD, // 开启 CSS source maps
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    }, // css预设器配置项
  },
  productionSourceMap: !IS_PROD, // js
};
