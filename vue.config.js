/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');

// const { join } = require('path');

// function resolve(dir) {
//   return join(__dirname, dir);
// }

const superMapSource = './public/supermap/';

// const { openGzip } = require('./package.json');

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  lintOnSave: true,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: `
        @import "@/styles/variables.scss";
        @import "@/styles/mixin.scss";
        `,
      },
    },
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production';
    } else {
      // 为开发环境修改配置...
      config.mode = 'development';
      config.devtool = 'source-map'; // 开发环境显示源码，方便调试
    }
    config.plugins = [
      ...config.plugins,
      new CopyWebpackPlugin({
        patterns: [
          {
            from: superMapSource,
            to: 'supermap',
          },
        ],
      }),
    ];
  },
  chainWebpack: (config) => {
    // 设置别名
    // config.resolve.alias.set('@supermap', resolve(superMapSource));
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial',
      },
    ]);
    // 修复HMR（热更新）失效
    config.resolve.symlinks(true);

    // 移除prefetch插件
    config.plugins.delete('prefetch');
  },
};
