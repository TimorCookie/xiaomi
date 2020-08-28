'use strict';

// const Controller = require('egg').Controller;
const BaseController = require('./base')
class RoleController extends BaseController {
  async index() {
    const roleList = await this.ctx.model.Role.find({})
    await this.ctx.render('admin/role/index.html', { roleList })
  }
  async add() {
    // const newRole = new this.ctx.model.RoleMode({})
    await this.ctx.render('admin/role/add.html')
  }
  async doAdd() {
    // console.log(this.ctx.request.body)
    const { title, description } = this.ctx.request.body
    const newRole = new this.ctx.model.Role({ title, description })
    await newRole.save()
    await this.success('/admin/role', '增加角色成功');
  }
  async edit() {
    const id = this.ctx.query.id
    const result = await this.ctx.model.Role.find({ "_id": id })
    await this.ctx.render('admin/role/edit.html', { roleInfo: result[0] })
  }
  async doEdit() {
    let self = this
    const { title, description, _id} = this.ctx.request.body
    this.ctx.model.Role.updateOne({
      _id
    },{
      title, description
    })
    await self.success('/admin/role', '更新角色成功！');
  }
  async delete() {
    this.ctx.body = '角色删除'
  }
}

module.exports = RoleController;
