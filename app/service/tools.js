'use strict';
var svgCaptcha = require('svg-captcha'); //引入验证
const Service = require('egg').Service;

class ToolsService extends Service {
  async captcha (){
    const captcha = svgCaptcha.create()
    this.ctx.session.code = captcha.text
    return captcha
  }
}

module.exports = ToolsService;
