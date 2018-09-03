export function dateToString (date) {
  // <--将时间对象转换为字符串 ‘yyy-mm-dd hh:mm’-->
  // https://blog.csdn.net/hushilin001/article/details/76301368/   导入js文件及使用
  if (date === null || date === '') {
    date = ''
    return date
  }
  var year = date.getFullYear()
  var month = parseInt(date.getMonth()) + 1
  var day = parseInt(date.getDate())
  var hours = date.getHours()
  var minutes = date.getMinutes()
  if (minutes < 10) {
    minutes = minutes + '0'
  }
  date = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
  return date
}
