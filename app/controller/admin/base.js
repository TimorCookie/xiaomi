'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  async success(redirectUrl, text) {
    await this.ctx.render('admin/public/success.html',{
      redirectUrl: redirectUrl,
      text: text
    })
  }
  async error(redirectUrl, text) {
    await this.ctx.render('admin/public/error.html', {
      redirectUrl: redirectUrl,
      text: text
    })
    // this.ctx.body = '操作失败'
  }
  async verify() {
    const captcha = await this.service.tools.captcha()
    this.ctx.response.type = 'image/svg+xml'
    this.ctx.body = captcha.data
  }
}

module.exports = BaseController;
