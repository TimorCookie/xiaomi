'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
  async index() {
    await this.ctx.render('admin/manager/index.html')
    // this.ctx.body = '管理员列表'
  }
  async add() {
    await this.ctx.render('admin/manager/add.html')
  }
  async edit() {
    await this.ctx.render('admin/manager/edit.html')
  }
  async delete() {
    this.ctx.body = '管理员删除'
  }
}

module.exports = ManagerController;
