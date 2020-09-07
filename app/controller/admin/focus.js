'use strict';
const path = require('path');
const fs = require('fs');

const pump = require('mz-modules/pump');
const BaseController = require('./base')
// const Controller = require('egg').Controller;

class FocusController extends BaseController {
  async index() {
    const focusRes = await this.ctx.model.Focus.find({})
    await this.ctx.render('admin/focus/index', {
      focusRes
    });
  }
  async add() {
    await this.ctx.render('admin/focus/add');
  }
  async edit() {
    const { id } = this.ctx.request.query
    const focusRes = await this.ctx.model.Focus.find({ "_id": id })
    await this.ctx.render('admin/focus/edit', {
      focusRes: focusRes[0]
    });
  }
  async doEdit() {
    let parts = this.ctx.multipart({ autoFields: true });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      let fieldname = stream.fieldname;  //file表单的名字

      //上传图片的目录
      let dir = await this.service.tools.getUploadFile(stream.filename);
      let target = dir.uploadDir;
      let writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);

      files = Object.assign(files, {
        [fieldname]: dir.saveDir
      })
    }
    
    //修改操作

    const id = parts.field.id;
    let updateResult = Object.assign(files, parts.field);
    let result = await this.ctx.model.Focus.updateOne({ "_id": id }, updateResult);

    await this.success('/admin/focus', '修改轮播图成功');

  }
  async doSingleUpload() {
    // 方案一： getFileStream
    // const stream = await this.ctx.getFileStream()
    // const target = `app/public/admin/upload/${path.basename(stream.filename)}`
    // const writeStream = fs.createWriteStream(target)

    // await pump(stream, writeStream)

    // this.ctx.body = {
    //   url: target,
    //   fields: stream.fields
    // }
    // 方案二：multipart
    let parts = this.ctx.multipart({
      autoFields: true
    })
    let files = []
    let stream

    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break
      }
      // file表单的名字
      let fieldname = stream.fieldname
      // 上传图片目录
      let dir = await this.service.tools.getUploadFile(stream.filename)
      const target = dir.uploadDir
      let writeStream = fs.createWriteStream(target)
      await pump(stream, writeStream)
      files = Object.assign(files, {
        [fieldname]: dir.saveDir
      })
      let focus = new this.ctx.model.Focus(Object.assign(files, parts.field))
      let result = await focus.save()
      await this.success('/admin/focus', '增加轮播图成功')

    }
  }
  async multi() {
    await this.ctx.render('admin/focus/multi')
  }
  async doMultiUpload() {
    const parts = this.ctx.multipart({ autoFields: true })
    const files = []
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {            //注意如果没有传入图片直接返回   
        break;
      }
      const fieldname = stream.fieldname;
      const target = `app/public/admin/upload/${path.basename(stream.filename)}`
      const writeStream = fs.createWriteStream(target)

      await pump(stream, writeStream)
      files.push({
        [fieldname]: target
      })
    }
    this.ctx.body = {
      files: files,
      fields: parts.field
    }
  }
}

module.exports = FocusController;
