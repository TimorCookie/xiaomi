'use strict';

const BaseController = require('./base')
class ManagerController extends BaseController {
  async index() {
    const managerList = await this.ctx.model.Admin.aggregate([
      {
        $lookup: {
          from: 'role',
          localField: 'role_id',
          foreignField: '_id',
          as: 'role'
        }
      }
    ])
    await this.ctx.render('admin/manager/index.html', { managerList })
    // this.ctx.body = '管理员列表'
  }
  async add() {
    const roleList = await this.ctx.model.Role.find({})
    await this.ctx.render('admin/manager/add.html', { roleList })
  }
  async doAdd() {
    const userInfo = this.ctx.request.body
    userInfo.password = await this.service.tools.md5(userInfo.password)
    // 判断用户是否已存在
    const userRes = await this.ctx.model.Admin.find({
      username: userInfo.username
    })
    if (userRes.length > 0) {
      await this.error('/admin/manager/add', '此用户已存在')
    } else {
      const newUser = new this.ctx.model.Admin(userInfo)
      newUser.save()
      await this.success('/admin/manager', '增加用户成功')
    }
  }
  async edit() {
    const id = this.ctx.request.query.id
    const managerInfo = await this.ctx.model.Admin.find({
      _id: id
    })
    const roleInfo = await this.ctx.model.Role.find({})
    await this.ctx.render('admin/manager/edit.html', {
      managerInfo: managerInfo[0],
      roleInfo
    })
  }
  async doEdit() {
    console.log(this.ctx.request.body)
    const {_id, username, mobile, email, password, role_id} = this.ctx.request.body

    if(password) {
      const pwd = await this.service.tools.md5(password)
      await this.ctx.model.Admin.updateOne({
        _id: _id
      },{
        password: pwd,
        mobile,
        email,
        role_id
      })
    } else {
      await this.ctx.model.Admin.updateOne({
        _id: _id
      },{
        mobile,
        email,
        role_id
      })
    }
    await this.success('/admin/manager', '管理员信息更新成功！')
  }
}

module.exports = ManagerController;
