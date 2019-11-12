// 实例化
const app = getApp()
// 引入处理时间js
const util = require('./../../utils/util.js')
// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户名
    username: '',
    // 选项卡变量
    tabIndex: 0,
    // 用户信息
    userList: {},
    // 用户收藏
    userColl: []
  },
  // 改变选项卡变量
  // data-index绑定的变量。
  // event对象保存点击的对象
  // e.currentTarget.dataset保存传的值。
  changeIndex (e) {
    this.setData({
      tabIndex: e.currentTarget.dataset.index
    })
    console.log(this.data.tabIndex)
  },
  // swiper 切换
  pageChange(e) {
    this.setData({
      tabIndex: e.detail.current
    })
  },
  // 获取当前用户的个人信息
  getUserData (name) {
    app.fetchApi.getUserList(name).then(res => {
      console.log(res)
      // 循环转换每个帖子日期
      for (const index in res.data.recent_replies) {
        const rep = res.data.recent_replies[index]
        rep.last_reply_at = util.getDateDiff(new Date(rep.last_reply_at))
        
      }
      for (const index in res.data.recent_topics) {
        const rep = res.data.recent_topics[index]
        rep.last_reply_at = util.getDateDiff(new Date(rep.last_reply_at))
      }
      this.setData({
        userList: res.data,
        // 转换时间
        ['userList.create_at']: util.getDateDiff(new Date(res.data.create_at))
      })
      console.log(this.data.userList)
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取用户收藏帖子
  getSaveCollect (name) {
    app.fetchApi.getTopicCollect(name).then(res => {
      res.data.forEach(item => {
        item.create_at = util.getDateDiff(new Date(item.create_at))
        item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at))
      })
      this.setData({
        userColl: res.data
      })
      console.log(this.data.userColl)
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options代表页面传过来的参数
    this.setData({
      username: options.loginname
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getUserData(this.data.username)
    this.getSaveCollect(this.data.username)
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