/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // '/api/': {
    //   target: 'https://preview.pro.ant.design',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     '^': '',
    //   },
    // },
    '/local/':{
      target:"http://localhost:3000",
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/upload/': {
      target: "http://localhost:3001",
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/g2/': {
      target: "https://view.inews.qq.com",
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/fy/': {
      target: "https://www.maomin.club",
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
