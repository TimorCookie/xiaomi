$(function () {

  app.init();
  app.delete();
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
  }
}

