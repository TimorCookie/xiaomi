'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  async success(redirectUrl, text) {
    await this.ctx.render('admin/public/success.html', {
      redirectUrl: redirectUrl,
      text: text
    })
  }
  async error(redirectUrl, text) {
    await this.ctx.render('admin/public/error.html', {
      redirectUrl: redirectUrl,
      text: text
    })
    // this.ctx.body = '操作失败'
  }
  async verify() {
    const captcha = await this.service.tools.captcha()
    this.ctx.response.type = 'image/svg+xml'
    this.ctx.body = captcha.data
  }
  async delete() {
    const { model, _id } = this.ctx.request.query
    // console.log(model, _id)
    await this.ctx.model[model].deleteOne({
      _id
    })
    this.ctx.redirect(this.ctx.state.prevPage)
  }
  async changeStatus() {
    const { model, attr, id } = this.ctx.request.query
    const result = await this.ctx.model[model].find({ "_id": id })
    if (result.length > 0) {
      if (result[0][attr] == 1) {
        var json = {
          [attr]: 0
        }
      } else {
      var json = {
          [attr]: 1
        }
      }
      // 执行更新操作
      const updateResult = await this.ctx.model[model].updateOne({ "_id": id }, json)
      if (updateResult) {
        this.ctx.body = {
          "message": '更新成功',
          "success": true
        }
      } else {
        this.ctx.body = {
          "message": '更新失败',
          "success": false
        }
      }
    } else {
      this.ctx.body = {
        "message": '参数有误，更新失败',
        "success": false
      }
    }
  }
  async editNum() {
    const { model, attr, id, num } = this.ctx.request.query
    const res = await this.ctx.model[model].find({"_id":id})
    if(res.lenth>0) {
      const json = {
        [attr]: num
      }
      const updateRes = await this.ctx.model[model].updateOne({"_id":id},json)
      if(updateRes) {
        this.ctx.body = {
          "message": "更新成功",
          "success": true
        }
      } else {
        this.ctx.body = {
          "message": "更新失败",
          "success": false
        }
      }

    } else {
      this.ctx.body = {
        "message": '参数有误，更新失败',
        "success": false
      }
    }
  }
}

module.exports = BaseController;
