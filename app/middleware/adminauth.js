const url = require('url')

module.exports = options => {
  return async function adminauth(ctx, next) {
    ctx.state.csrf = ctx.csrf;
    // 未登录的用户跳去登录页
    const pathname = url.parse(ctx.request.url).pathname
    if (pathname == '/admin/login' || pathname == '/admin/verify' || pathname == 'doLogin') {
      await next()
    } else {
      ctx.redirect('/admin/login')
    }
  }
}