'use strict';

const BaseController = require('./base')

class GoodsTypeController extends BaseController {
  async index() {
    const res = await this.ctx.model.GoodsType.find({})
    await this.ctx.render('admin/goodsType/index', {
      list: res
    })
  }
  async add() {
    await this.ctx.render('admin/goodsType/add');
  }
  async doAdd() {
    var res = new this.ctx.model.GoodsType(this.ctx.request.body)
    await res.save();

    await this.success('/admin/goodsType', '增加类型成功');
  }
  async edit() {
    const id = this.ctx.request.query.id
    const res = await this.ctx.model.GoodsType.find({"_id":id})
    await this.ctx.render('admin/goodsType/edit', {
      list: res[0]
    });
  }
  async doEdit() {
    const id = this.ctx.request.body._id
    await this.ctx.model.GoodsType.updateOne({"_id":id},this.ctx.request.body)
    await this.success('/admin/goodsType','编辑类型成功')
  }
}

module.exports = GoodsTypeController;
