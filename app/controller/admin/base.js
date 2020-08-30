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
  async delete() {
    const {model ,_id}= this.ctx.request.query
    console.log(model, _id)
    await this.ctx.model[model].deleteOne({
      _id
    })
    this.ctx.redirect(this.ctx.state.prevPage)
  }
}

module.exports = BaseController;
