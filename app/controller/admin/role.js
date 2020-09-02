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
    const { title, description, _id } = this.ctx.request.body
    this.ctx.model.Role.updateOne({
      _id
    }, {
      title, description
    })
    await self.success('/admin/role', '更新角色成功！');
  }
  async auth() {
    const role_id = this.ctx.request.query.id
    const menus = await this.ctx.model.Access.aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items'
        }
      },
      {
        $match: {
          module_id: "0"
        }
      }
    ])
    await this.ctx.render('/admin/role/auth', { menus, role_id })
  }
  async doAuth() {
    const { role_id, access_node} = this.ctx.request.body

    if(await this.ctx.model.RoleAccess.find({role_id})) {
      await this.ctx.model.RoleAccess.deleteMany({
        role_id
      })
    }
    for(let i = 0; i<access_node.length; i++) {
      const roleAccessData = new this.ctx.model.RoleAccess({
        role_id,
        access_id: access_node[i]
      })
      roleAccessData.save()
    }
    await this.success('/admin/role/auth?id='+role_id, "授权成功")
  }
}

module.exports = RoleController;
