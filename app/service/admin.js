'use strict';

const Service = require('egg').Service;
const url = require('url');

class AdminService extends Service {
  async checkAuth() {

    // 1. 获取当前角色
    const userinfo = this.ctx.session.userinfo
    const { role_id } = userinfo
    // 首先排除一些不需要权限的页面（登录，登出，验证码...）
    const ignoreUrl = ['/admin/login', '/admin/doLogin', '/admin/verify', '/admin/loginOut']
    const pathname = url.parse(this.ctx.request.url).pathname;

    if (ignoreUrl.indexOf(pathname) !== -1 || userinfo.is_super == 1) {
      return true
    }
    // 2.根据角色获取当前角色权限列表
    const roleAccess = await this.ctx.model.RoleAccess.find({ role_id })
    const roleAccessArray = []
    roleAccess.map((el, index) => {
      roleAccessArray.push(el.access_id.toString())
    })

    // 获取当前访问地址,根据访问地址查询对应的权限列表
    const accessRes = await this.ctx.model.Access.find({
      url: pathname
    })
    // console.log(accessRes)
    // 判断当前需要访问的url对应的权限id 是否在权限列表中
    if (accessRes.length > 0) {
      if (roleAccessArray.indexOf(accessRes[0]._id.toString()) != -1) {
        return true
      } else {
        return false
      }
    }
  }
  async getMenuList() {

    // 获取全部权限
    const accessAll = await this.ctx.model.Access.aggregate([
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

    // 获取当前角色拥有的权限
    const role_id = this.ctx.session.userinfo.role_id
    const accessCurrent = await this.ctx.model.RoleAccess.find({role_id})
    const roleAccessArray = []
    accessCurrent.map(el=> {
      roleAccessArray.push(el.access_id.toString())
    })
    // console.log(roleAccessArray)

    // 循环遍历所有的权限数据 找出当前角色在其中对应的权限
    accessAll.map((e,i)=> {
      if(roleAccessArray.indexOf(e._id.toString())!=-1) {
        accessAll[i].checked = true
      }

      accessAll[i].items.map((el, index)=> {
        if(roleAccessArray.indexOf(el._id.toString())!=-1) {
          accessAll[i].items[index].checked = true
        }
      })
    })
    return accessAll
  }
}

module.exports = AdminService;
