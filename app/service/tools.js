'use strict';
var svgCaptcha = require('svg-captcha'); //引入验证
const md5 = require('md5');
const sd = require('silly-datetime');
const path = require('path');
const mkdirp = require('mz-modules/mkdirp');

const Service = require('egg').Service;
class ToolsService extends Service {
  async captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
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
  async getTime() {

    var d = new Date();

    return d.getTime();

  }
  async getUploadFile(filename) {
    // 1. 获取当前日期
    let day = sd.format(new Date(), 'YYYYMMDD')
    // 2. 创建图片保存路径
    const dir = path.join(this.config.uploadDir, day)
    await mkdirp(dir)
    // 返回图片保存路径
    const d = await this.getTime()
    const uploadDir = path.join(dir, d+path.extname(filename))

    return {
      uploadDir,
      saveDir: uploadDir.slice(3).replace(/\\/g,'/')
    }
  }
}


module.exports = ToolsService;
