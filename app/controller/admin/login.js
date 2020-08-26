'use strict';

// const Controller = require('egg').Controller;
const baseController = require('./base.js')
class LoginController extends baseController {
  async index() {
    await this.ctx.render('admin/login.html')
  }
  async doLogin() {
    await this.success('/admin/login')
  }
  // async error() {
  //   await this.error('/admin/login')
  // }
}

module.exports = LoginController;
