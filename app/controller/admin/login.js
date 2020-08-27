'use strict';

// const Controller = require('egg').Controller;
const baseController = require('./base.js')
class LoginController extends baseController {
  async index() {
    await this.ctx.render('admin/login.html')
  }
  async doLogin() {
    const { username, password, verify } = this.ctx.request.body;
    const code = this.ctx.session.code
    // 校验验证码和账户密码是否正确
    if(verify.toUpperCase() !== code.toUpperCase()) {
      await this.error('/admin/login','验证码错误!')
    }
    // await this.success('/admin/login')
  }
}

module.exports = LoginController;
