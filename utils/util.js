const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 获取距离现在时间
const getDateDiff = (dateTimeStamp) => {
  // 分钟数
  var minute = 1000 * 60
  // 小时数, 1小时 = 60 minute
  var hour = minute * 60
  // 天数   1天 = 24hour
  var day = hour * 24
  // 月份   1月 = 30day
  var month = day * 30
  // 年份   1年 = 365day
  var year = day * 365
  // 获取目前的时间
  var now = new Date().getTime()
  // 当前时间 - 传入时间 = 差值
  var diffValue = now - dateTimeStamp
  // 如果小于0则说明数据有误
  if (diffValue < 0) {
    return '数据出错'
  }
  // 距离当前年份
  var yearEnd = diffValue / year
  // 距离当前月份
  var monthEnd = diffValue / month
  // 距离当前几周 7 * 1为一周
  var weekEnd = diffValue / (7 * day)
  // 距离现在几天
  var dayEnd = diffValue / day
  // 距离当前几小时
  var hourEnd = diffValue / hour
  // 距离当前几分钟
  var minEnd = diffValue / minute
  // 计算结果返回值
  var result;
  if(yearEnd >= 1) {
    result = parseInt(yearEnd) + '年以前'
  } else if (monthEnd >= 1) {
    result = parseInt(monthEnd) + '个月前'
  } else if (weekEnd >= 1) {
    result = parseInt(weekEnd) + '周前'
  } else if (dayEnd >= 1) {
    result = parseInt(dayEnd) + '天前'
  } else if (hourEnd >= 1) {
    result = parseInt(hourEnd) + '小时前'
  } else if (minEnd >= 1) {
    result = parseInt(minEnd) + '分钟前'
  } else {
    result = '刚刚'
  }
  return result
}

module.exports = {
  formatTime: formatTime,
  // 时间计算
  getDateDiff: getDateDiff
}
