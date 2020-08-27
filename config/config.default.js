/* eslint valid-jsdoc: "off" */

'use strict';

const adminauth = require("../app/middleware/adminauth");

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1598411138544_8062';
  // 配置session
  config.session={
    key:'SESSION_ID',
    maxAge:864000,
    httpOnly: true,
    encrypt: true,
    renew: true //  延长会话有效期       
  }
  // add your middleware config here
  config.middleware = ['adminauth'];
  config.adminauth = {
    match: '/admin'
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 配置模版引擎
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  }
  // 配置数据库
  exports.mongoose = {
    client: {
      url: 'mongodb://xiaomi:123456@127.0.0.1:27017/eggxiaomi',
      options: {},
      // mongoose global plugins, expected a function or an array of function and options
      // plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
