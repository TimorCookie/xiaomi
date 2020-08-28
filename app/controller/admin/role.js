'use strict';

// const Controller = require('egg').Controller;
const BaseController = require('./base')
class RoleController extends BaseController {
  async index() {
    await this.ctx.render('admin/role/index.html')
  }
  async add() {
    // const newRole = new this.ctx.model.RoleMode({})
    await this.ctx.render('admin/role/add.html')
  }
  async doAdd() {
    console.log(this.ctx.request.body)
    await this.success('/admin/role','增加角色成功');
  }
  async edit() {
    await this.ctx.render('admin/role/edit.html')
  }
  async delete() {
    this.ctx.body = '角色删除'
  }
}

module.exports = RoleController;
