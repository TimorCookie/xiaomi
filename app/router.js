'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/admin/login', controller.admin.login.index);
  router.get('/admin/loginOut', controller.admin.login.loginOut);
  router.post('/admin/doLogin', controller.admin.login.doLogin);

  // 删除
  router.get('/admin/delete', controller.admin.base.delete)
  // 验证码
  router.get('/admin/verify', controller.admin.base.verify);
  // admin 管理员相关路由
  router.get('/admin', controller.admin.main.index);
  router.get('/admin/welcome', controller.admin.main.welcome);
  router.get('/admin/manager', controller.admin.manager.index);
  router.get('/admin/manager/add', controller.admin.manager.add);
  router.post('/admin/manager/doAdd', controller.admin.manager.doAdd);
  router.get('/admin/manager/edit', controller.admin.manager.edit);
  router.post('/admin/manager/doEdit', controller.admin.manager.doEdit);
  // admin 角色相关路由
  router.get('/admin/role', controller.admin.role.index);
  router.get('/admin/role/add', controller.admin.role.add);
  router.post('/admin/role/doAdd', controller.admin.role.doAdd);
  router.get('/admin/role/edit', controller.admin.role.edit);
  router.post('/admin/role/doEdit', controller.admin.role.doEdit);
  router.get('/admin/role/auth', controller.admin.role.auth);
  router.post('/admin/role/doAuth', controller.admin.role.doAuth);
  // admin 权限相关路由
  router.get('/admin/access', controller.admin.access.index);
  router.get('/admin/access/add', controller.admin.access.add);
  router.post('/admin/access/doAdd', controller.admin.access.doAdd);
  router.get('/admin/access/edit', controller.admin.access.edit);
  router.post('/admin/access/doEdit', controller.admin.access.doEdit);
  // 公共的ajax请求
  router.get('/admin/changeStatus', controller.admin.base.changeStatus);
  router.get('/admin/editNum', controller.admin.base.editNum);
  // 轮播图
  router.get('/admin/focus', controller.admin.focus.index);
  router.get('/admin/focus/add', controller.admin.focus.add);
  router.get('/admin/focus/edit', controller.admin.focus.edit);
  router.post('/admin/focus/doEdit', controller.admin.focus.doEdit);
  router.get('/admin/focus/multi', controller.admin.focus.multi);
  router.post('/admin/focus/doSingleUpload', controller.admin.focus.doSingleUpload);
  router.post('/admin/focus/doMultiUpload', controller.admin.focus.doMultiUpload);

  // 商品类型
  router.get('/admin/goodsType', controller.admin.goodsType.index)
  router.get('/admin/goodsType/add', controller.admin.goodsType.add)
  router.post('/admin/goodsType/doAdd', controller.admin.goodsType.doAdd)
  router.get('/admin/goodsType/edit', controller.admin.goodsType.edit)
  router.post('/admin/goodsType/doEdit', controller.admin.goodsType.doEdit)

  // 商品属性类型
  router.get('/admin/goodsTypeAttribute', controller.admin.goodsTypeAttribute.index)
  router.get('/admin/goodsTypeAttribute/add', controller.admin.goodsTypeAttribute.add)
  router.post('/admin/goodsTypeAttribute/doAdd', controller.admin.goodsTypeAttribute.doAdd)
  router.get('/admin/goodsTypeAttribute/edit', controller.admin.goodsTypeAttribute.edit)
  router.post('/admin/goodsTypeAttribute/doEdit', controller.admin.goodsTypeAttribute.doEdit)
};
