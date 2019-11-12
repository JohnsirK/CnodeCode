// pages/detail/detail.js
// 获取应用实例
const app = getApp()
// 引入处理时间js
const util = require('./../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 跳转过来的id
    id: '',
    // 原始数据
    dataJson: {},
    // 内容数据
    detailContent: '',
    replyContent: [],
    // 收藏动画
    collAnimation: {},
    // 取消收藏动画
    unCollAnimation: {},
    // token数据
    token: '',
    // 用户数据
    user: {}
  },
  // 跳转至用户详情页面
  hrefMe(e) {
    console.log(e)
    wx.navigateTo({
      url: `./../user/user?loginname=${e.currentTarget.dataset.name}`
    })
  },
  // 父组件接收子组件传的值，并赋值
  saveUser (e) {
    console.log(e.detail)
    this.setData({
      token: e.detail.token,
      user: e.detail
    })
  },
  // 请求数据
  getData (id, param) {
    app.fetchApi.getTopicsDetail(id, param)
      .then(res => {
        if (res.success) {
          let dt = app.towxml.toJson(res.data.content, 'markdown')
          // 转化回复里面每一个
          for (const index in res.data.replies) {
            const rep = res.data.replies[index]
            rep.content = app.towxml.toJson(rep.content)
            rep.create_at = util.getDateDiff(new Date(rep.create_at))
          }
          dt.there = 'dark'
          // 将markdown内容转换为towxml数据
          this.setData({
            dataJson: res.data,
            detailContent: dt,
            ['dataJson.create_at']: util.getDateDiff(new Date(res.data.create_at)),
            ['dataJson.last_reply_at']: util.getDateDiff(new Date(res.data.last_reply_at))
          })
          setTimeout(() => {
            wx.hideLoading()
          }, 500)
        } else {
          wx.showToast({title: '发生错误，请重试', icon: 'none'})
        }
      })
      .catch(err => {
        console.log(err)
        wx.showToast({title: '发生错误，请重试', icon: 'none'})
      })
  },
  // 点赞函数
  // token 当前用户的token
  // id = topic_id  主题的id
  clickColl (token, id) {
    app.fetchApi.postCollect({
      'accesstoken': token,
      'topic_id': id
    })
    .then(res => {
      console.log(res)
      if (res.success) {
        this.setData({
          ['dataJson.is_collect']: true
        })
        wx.showToast({
          title: '收藏成功！',
          icon: 'none'
        })
        console.log(this.data.dataJson)
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  // 取消收藏函数
  clickUnColl (token, id) {
    app.fetchApi.postDeCollect({
      'accesstoken': token,
      'topic_id': id
    })
    .then(res => {
      if (res.success) {
        this.setData({
          ['dataJson.is_collect']: false
        })
        wx.showToast({
          title: '取消收藏！',
          icon: 'none'
        })
        console.log(this.data.dataJson)
      }
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  },
  // 收藏
  isColl () {
    if(!this.data.token) {
      wx.showToast({
        title: '暂未登陆！',
        icon: 'none'
      })
      // 用此方法调用子组件的方法
      this.selectComponent('#loginDialog').showStatus()
    }
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    this.animation = animation
    animation.scale(1.6).opacity(0).step()
    this.setData({
      collAnimation: animation.export()
    })
    // 执行结束后将动画重置,否则只会显示动画执行一次
    setTimeout(() => {
      animation.scale(1).opacity(1).step()
      this.setData({
        collAnimation: animation.export()
      })
    }, 300)
    this.clickColl(this.data.token, this.data.dataJson.id)
  },
  // 取消收藏
  unColl () {
    if(!this.data.token) {
      wx.showToast({
        title: '暂未登陆！',
        icon: 'none'
      })
      return false
    }
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    this.animation = animation
    animation.scale(1.6).opacity(0).step()
    this.setData({
      unCollAnimation: animation.export()
    })
    // 执行结束后将动画重置,否则只会显示动画执行一次
    setTimeout(() => {
      animation.scale(1).opacity(1).step()
      this.setData({
        unCollAnimation: animation.export()
      })
    }, 300)
    this.clickUnColl(this.data.token, this.data.dataJson.id)
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      token: app.globalData.userInfo ? app.globalData.userInfo.token : null
    })
    console.log(this.data.token)
    this.getData(this.data.id, {
      'accesstoken': this.data.token
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})