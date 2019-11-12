// 封装小程序 request请求和各种api
// 采用common导出方式。
// 采用es6的class类。
// 由于该js下的方法需要在全局使用。所以应当在app.js里面定义。
// 由于使用的是es 6 class的方式，所以需要new 操作符
module.exports = class FetchApi {
  // 构造函数方法
  constructor () {
    // 请求路径
    this.api = 'https://cnodejs.org/api/v1'
  }
  // 构造函数原型方法
  // 验证accesstoken 的正确性
  // 参数 {String} token 用户的accessToken
  // accesstoken String 用户的accessToken
  // return {Promise[json]} 如果匹配成功，返回用户信息，否则403
  postAccessToken(token) {
    return new Promise((resolve, reject) => {
      wx.request({
        // 请求url
        url: `${this.api}/accesstoken`,
        // 请求参数
        data: {
          accesstoken: token
        },
        // 请求方式
        method: 'POST',
        // 返回的数据格式。默认json
        dataType: 'json',
        // 请求头 默认值application/json
        header: {
          'content-type': 'application/json'
        },
        // 执行成功方法
        success(res) { 
          // resolve 是 Promise 里面执行成功的返回
          resolve(res.data)
        },
        fail (err) {
          // reject 是 Promise 里面执行失败的返回
          reject(err)
        }
      })
    })
  }
  // 获取主题
  // param        JSON      参数对象
  // page         Number    页数
  // tab          String    主题分类
  // limit        Number    每一页的主题数量
  // mdrender     String    当为false时，不渲染。默认为true，渲染出现的所有markdown格式文本
  getTopics(param) {
    return new Promise ((resolve, reject) => {
      wx.showLoading({
        title: '拼命加载中...'
      })
      wx.request({
        url: `${this.api}/topics`,
        data: param,
        method: 'GET',
        // 返回数据格式 json
        dataType: 'json',
        // 执行成功返回
        success: (res) => {
          resolve(res.data)
          wx.hideLoading()
        },
        // 执行失败
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 获取主题详情
  // id, string 当前主题id。
  // param object 查询参数，当前是否点赞等等
  getTopicsDetail(id, param) {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '拼命加载中'
      })
      wx.request({
        // 请求地址
        url: `${this.api}/topic/${id}`,
        // 查询条件
        data: param,
        // 请求方式
        method: 'GET',
        // 返回数据格式
        dataType: 'json',
        // 执行成功返回
        success: (res) => {
          resolve(res.data)
        },
        fail: (err) => {
          reject(err)
          wx.hideLoading()
        }
      })
    })
  }
  // 点赞
  // accesstoken string 用户的accesstoken
  // topic_id String  主题的id
  postCollect (param) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/topic_collect/collect`,
        // 查询条件
        data: param,
        // 请求方式
        method: 'POST',
        // 返回数据格式
        dataType: 'json',
        // 执行成功返回
        success: (res) => {
          resolve(res.data)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
  // 取消点赞
  postDeCollect (param) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/topic_collect/de_collect`,
        // 查询条件
        data: param,
        // 请求方式
        method: 'POST',
        // 返回数据格式
        dataType: 'json',
        // 执行成功后返回
        success: (res) => {
          resolve(res.data)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
  // 用户所收藏主题
  // 参数 :loginname    String  用户名
  getTopicCollect (loginname) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/topic_collect/${loginname}`,
        // 请求方式
        method: 'GET',
        // 返回数据格式
        dataType: 'json',
        // 执行成功后台返回
        success: (res) => {
          resolve(res.data)
        },
        // 执行失败后回调函数
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
  // 用户详情
  // 参数 :loginname    String 用户名
  getUserList (loginname) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.api}/user/${loginname}`,
        method: 'GET',
        // 返回数据类型
        dataType: 'json',
        // 成功执行
        success: (res) => {
          resolve(res.data)
        },
        // 失败执行
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
}