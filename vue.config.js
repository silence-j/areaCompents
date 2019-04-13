module.exports = {
  configureWebpack: {
      resolve: {
          alias: {
              'assets': '@/assets'
          }
      },
    devServer: {
      port: '8082',
    },
  },
};
