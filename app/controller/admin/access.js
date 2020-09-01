'use strict';

// const Controller = require('egg').Controller;
const BaseController = require('./base')
class AccessController extends BaseController {
  async index() {
    // 1、在access表中找出  module_id=0的数据        管理员管理 _id    权限管理 _id    角色管理  (模块)

    // 2、让access表和access表关联    条件：找出access表中  module_id等于_id的数据

    const menus = await this.ctx.model.Access.aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items'
        }
      }, {
        $match: {
          "module_id": "0"
        }
      }
    ])
    await this.ctx.render('admin/access/index.html', { menus })
  }
  async add() {
    const modules = await this.ctx.model.Access.find({ "module_id": "0" })
    await this.ctx.render('admin/access/add.html', { modules })
  }
  async doAdd() {
    var addResult = this.ctx.request.body;
    var module_id = addResult.module_id;

    //菜单  或者操作
    if (module_id !== '0') {
      addResult.module_id = this.app.mongoose.Types.ObjectId(module_id);    //调用mongoose里面的方法把字符串转换成ObjectId
    }
    var access = new this.ctx.model.Access(addResult);

    access.save();

    await this.success('/admin/access', '增加权限成功');
  }
  async edit() {
    const _id = this.ctx.request.query.id
    const modules = await this.ctx.model.Access.find({
      module_id: "0"
    })
    const menuInfo = await this.ctx.model.Access.find({_id})
    await this.ctx.render('admin/access/edit.html', {
      menuInfo: menuInfo[0],
      modules
    })
  }
  async doEdit() {
    const reqRes = this.ctx.request.body
    
    if(reqRes.module_id!=='0') {
      reqRes.module_id = this.app.mongoose.Types.ObjectId(reqRes.module_id);  
    }
    const updateAccess =await this.ctx.model.Access.updateOne({
      _id: reqRes._id
    },reqRes)
    // updateAccess.save()

    await this.success('/admin/access', '修改权限成功');
  }
}

module.exports = AccessController;
