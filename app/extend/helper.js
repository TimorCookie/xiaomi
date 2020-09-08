const sd = require('silly-datetime')

module.exports={
  formateDate(params) {
    return sd.format(new Date(params), 'YYYY-MM-DD HH:mm')
  }
}