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
    }else {
      const dbResult = await this.ctx.model.Admin.find({
        "username": username,
        "password": md5(password)
      })
      if(dbResult.length >0) {
        this.ctx.session.userinfo = dbResult[0]
        this.ctx.redirect('/admin/manager')
      } else {
        await this.error('账号密码不正确！')
      }
    }
    // await this.success('/admin/login')
  }
  async loginOut (){
    this.ctx.session.userinfo = null
    this.ctx.redirect('/admin/login')
  }
}

module.exports = LoginController;
