$(function () {

  app.init();
  app.delete();
  app.resizeIframe()
})


var app = {


  init: function () {
    this.toggleAside();

  },
  delete: function () {
    $('.delete').click(function () {

      var flag = confirm('您确定要删除吗?');

      return flag;

    })
  },
  toggleAside: function () {

    $('.aside h4').click(function () {
      if($(this).find('span').hasClass('nav_close')){

        $(this).find('span').removeClass('nav_close').addClass('nav_open');
      }else{

        $(this).find('span').removeClass('nav_open').addClass('nav_close');
      }
      $(this).siblings('ul').slideToggle();
    })
  },

  changeStatus: function (el, model, attr, id) {


    $.get('/admin/changeStatus', { model: model, attr: attr, id: id }, function (data) {
      console.log(model, attr, id)
      if (data.success) {
        if (el.src.indexOf('yes') != -1) {
          el.src = '/public/admin/images/no.gif';
        } else {
          el.src = '/public/admin/images/yes.gif';
        }
      }
    })
  },
  editNum: function (el, model, attr, id) {
    // 获取当前值
    var value = $(el).html()
    var input = $("<input value=''/>")

    // 把input放在span里
    $(el).html(input)
    // 让 input 获取焦点
    $(input).trigger('focus').val(value)
    // 点击input时阻止冒泡
    $(input).click(function () {
      return false
    })
    $(input).blur(function () {
      var num = $(this).val();
      $(el).html(num)
      // 更改数据库
      $.get('/admin/editNum', {
        model: model, attr: attr, id: id, num: num
      }, function (data) {
        console.log(data)
      })
    })
  },
  // 设置iframe高度
  resizeIframe:function(){
    var heights = document.documentElement.clientHeight-100
    if(document.getElementById('rightMain')) {
      document.getElementById('rightMain').height = heights  
    }
	},
}

$(window).resize(function(){

	app.resizeIframe();
})