'use strict';
const path = require('path');
const fs = require('fs');

const pump = require('mz-modules/pump');

const Controller = require('egg').Controller;

class FocusController extends Controller {
  async index() {
    await this.ctx.render('admin/focus/index');
  }
  async doSingleUpload() {
    const stream = await this.ctx.getFileStream()
    const target = `app/public/admin/upload/${path.basename(stream.filename)}`
    const writeStream = fs.createWriteStream(target)

    await pump(stream,writeStream)

    this.ctx.body = {
      url: target,
      fields: stream.fields
    }
  }
}

module.exports = FocusController;
