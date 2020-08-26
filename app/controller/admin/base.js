'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  async success(redirectUrl) {
    await this.ctx.render('admin/public/success.html', {
      redirectUrl: redirectUrl
    })
  }
  async error(redirectUrl) {
    await this.ctx.render('admin/public/error.html', {
      redirectUrl: redirectUrl
    })
    // this.ctx.body = '操作失败'
  }
  async verify() {
    const captcha = await this.service.tools.captcha({
      size: 6,
      fontSize: 50,
      width: 100,
      height: 40,
      background: "#cc9966"
    })
    this.ctx.response.type = 'image/svg+xml'
    this.ctx.body = captcha.data
  }
}

module.exports = BaseController;
