'use strict';
var svgCaptcha = require('svg-captcha'); //引入验证
const Service = require('egg').Service;
const md5 = require('md5');

class ToolsService extends Service {
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 6,
      fontSize: 50,
      width: 100,
      height: 40,
      background: "#cc9966"
    })
    this.ctx.session.code = captcha.text
    return captcha
  }
  async md5(str) {
    return md5(str)
  }
}


module.exports = ToolsService;
