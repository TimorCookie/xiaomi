module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const AccessSchema = new Schema({
    //模块名称
    module_name: { type: String },
    //操作名称   
    action_name: { type: String },
    //节点类型 :  1、表示模块   2、表示菜单     3、操作
    type: { type: Number },
    // 对应的url
    url: { type: String },
    //此module_id和当前模型的_id关联     module_id= 0 表示模块
    module_id: {
      type: Schema.Types.Mixed
    },
    sort: {
      type: Number,
      default: 100
    },
    description: { type: String },
    status: {
      type: Number,
      default: 1
    },
    add_time: {
      type: Number,
      default: new Date().getTime()
    }
  })

  const AccessModel = mongoose.model('Access', AccessSchema, 'access')
  return AccessModel
}