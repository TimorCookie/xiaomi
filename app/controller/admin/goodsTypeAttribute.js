const BaseController = require('./base.js');
class GoodsTypeAttributeController extends BaseController {
  async index() {
    //显示对应类型的属性
    //获取当前属性的类型id   分类id
    const cate_id = this.ctx.request.query.id;
    const result = await this.ctx.model.GoodsTypeAttribute.aggregate([
      {
        $lookup: {
          from: 'goods_type',
          localField: 'cate_id',
          foreignField: '_id',
          as: 'goods_type'
        }
      },
      {
        $match: {
          "cate_id": this.app.mongoose.Types.ObjectId(cate_id)
        }
      }
    ])
    const goodsType = await this.ctx.model.GoodsType.find({"_id":cate_id})

    await this.ctx.render('admin/goodsTypeAttribute/index', {
      goodsType: goodsType[0],
      list: result,
      cate_id: cate_id
    });
  }


  async add() {
    //获取类型数据

    const cate_id = this.ctx.request.query.id;
    const goodsTypes = await this.ctx.model.GoodsType.find({});
    await this.ctx.render('admin/goodsTypeAttribute/add', {
      cate_id: cate_id,
      goodsTypes: goodsTypes
    });

  }

  async doAdd() {
    var res = new this.ctx.model.GoodsTypeAttribute(this.ctx.request.body);
    await res.save();
    await this.success(`/admin/goodsTypeAttribute?id=${this.ctx.request.body.cate_id}`, '增加商品类型属性成功');
  }



  //功能还没有实现
  async edit() {

    const id = this.ctx.request.query.id
    const res = await this.ctx.model.GoodsTypeAttribute.find({"_id":id})
    const goodsTypes =await  this.ctx.model.GoodsType.find({})
    await this.ctx.render('admin/goodsTypeAttribute/edit', {
      list: res[0],
      goodsTypes
    })
  }

  async doEdit() {
    const _id = this.ctx.request.body._id
    await this.ctx.model.GoodsTypeAttribute.updateOne({"_id": _id},this.ctx.request.body)
    await this.success(`/admin/goodsTypeAttribute?id=${this.ctx.request.body.cate_id}`,'修改商品类型属性成功');
  }

}
module.exports = GoodsTypeAttributeController;