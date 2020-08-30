'use strict';

const BaseController = require('./base')
class ManagerController extends BaseController {
  async index() {
    await this.ctx.render('admin/manager/index.html')
    // this.ctx.body = '管理员列表'
  }
  async add() {
    const roleList = await this.ctx.model.Role.find({})
    await this.ctx.render('admin/manager/add.html', {roleList})
  }
  async doAdd() {
    const userInfo = this.ctx.request.body
    userInfo.password = await this.service.tools.md5(userInfo.password)
    // 判断用户是否已存在
    const userRes = await this.ctx.model.Admin.find({
      username: userInfo.username
    })
    if(userRes.length > 0) {
      await this.error('/admin/manager/add', '此用户已存在')
    } else {
      const newUser = new this.ctx.model.Admin(userInfo)
      newUser.save()
      await this.success('/admin/manager','增加用户成功')
    }
  }
  async edit() {
    await this.ctx.render('admin/manager/edit.html')
  }
  async delete() {
    this.ctx.body = '管理员删除'
  }
}

module.exports = ManagerController;
