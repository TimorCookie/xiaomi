'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // console.log(ctx.model.Admin)
    // const user = new ctx.model.Admin({
    //   username: "xiaomi",
    //   password: "123456",
    //   mobile: "17621251706",
    //   email: "timokie@126.com",
    //   status: 1,
    //   is_super: 1
    // })
    // const res = await user.save()
    // console.log(res)
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
