//index.js
//获取应用实例
const app = getApp()
// 引入时间js
var util = require('./../../utils/util.js')
Page({
  data: {
    // 频道页
    tab: '',
    // 获取到的数据数组
    dataJson: [],
    pageNum: 1,
  },
  // 声明周期函数 - 监听页面初次渲染完成
  onReady(){
    this.getData(1, this.data.tab)
  },
  // 声明周期函数 - 监听页面加载
  onLoad: function () {
   
  },
  // 监听用户下拉动作，一般用于页面重新加载数据
  onPullDownRefresh: function () {
    this.getData(1, this.data.tab)
    wx.stopPullDownRefresh();
  },
  // 页面上拉触底事件
  onReachBottom: function () {
    console.log('我到达底部了')
    var that = this
    this.setData({
      pageNum: that.data.pageNum + 1
    })
    console.log(this.data.pageNum)
    this.getData(this.data.pageNum, this.data.tab)
  },
  // 获取数据
  getData (pageNum, tab) {
    app.fetchApi.getTopics({
      page: pageNum,
      limit: 20, 
      tab: tab 
    }).then(res => {
      this.setData({
        dataJson: this.data.dataJson.concat(
          res.data.map((item) => {
            item.create_at = util.getDateDiff(new Date(item.create_at))
            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at))
            return item
          })
        )
      })
    })
  },
  // 获取子组件发送的数据
  saveItem (e) {
    this.setData({
      dataJson: []
    })
    console.log(e)
    var i;
    switch(e.detail) {
      case '全部': 
        i = ''
        break
      case '精华':
        i = 'good'
        break
      case '分享':
        i = 'share'
        break
      case '问答':
        i = 'ask'
        break;
      case '招聘':
        i = 'job'
        break
      default:
        i = ''
    }
    console.log(i)
    this.setData({
      tab: i
    })
    this.getData(1, this.data.tab)
  },
  // 跳转到详情页
  toDetail (e) {
    console.log(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: `./../detail/detail?id=${e.currentTarget.dataset.item.id}`
    })
  }
})
