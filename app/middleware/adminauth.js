const url = require('url')

module.exports = options => {
  return async function adminauth(ctx, next) {
    ctx.state.csrf = ctx.csrf;
    ctx.state.prevPage = ctx.request.headers['referer']
    // 未登录的用户跳去登录页
    if (ctx.session.userinfo) {
      ctx.state.userinfo = ctx.session.userinfo
      
      if(await ctx.service.admin.checkAuth()) {
        await next()
      } else {
        ctx.body = '您没有权限访问当前地址'
      }
      
    } else {
      const pathname = url.parse(ctx.request.url).pathname
      if (pathname == '/admin/login' || pathname == '/admin/verify' || pathname == '/admin/doLogin') {
        await next()
      } else {
        ctx.redirect('/admin/login')
      }
    }
  }
}