// component/slideLeft/slideLeft.js
// 引入app.js
// globalData 为全局对象。fetchApi为全局请求对象
const {globalData, fetchApi}  = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 显示隐藏
    showState: {
      type: String
    }
  },
  // 组件实例刚刚被创建时执行,此时data还不能被赋值
  created: function () {
    
  },
  // 组件在视图层布局完成后执行
  ready: function () {
    this.setData({
      user: globalData.userInfo
    })
    console.log(this.data.user)
  },
  /**
   * 组件的初始数据
   */
  data: {
    user: null,
    // 签名
    tip: globalData.tips[parseInt(Math.random() * globalData.tips.length)],
    // login 模态框显示隐藏
    istatus: false,
    // 动画数据
    animationData: {},
    // 显示隐藏
    showState: '',
    // 判断变量
    num: 0,
    // token
    accesstoken: "",
    // 获取焦点
    isFocus: false,
    // 传值
    // 文字
    toastText: '',
    // toast是否显示
    isShow: false,
    // 导航列表
    tabList: [
      {
        text: '全部',
        icon: 'icon-quanbu'
      },
      {
        text: '精华',
        icon: 'icon-jinghua'
      },
      {
        text: '分享',
        icon: 'icon-fenxiang'
      },
      {
        text: '问答',
        icon: 'icon-wenda'
      },
      {
        text: '招聘',
        icon: 'icon-zhaopin'
      }
    ]
  },
  /**
   * 组件的方法列表
   */ 
  methods: {
    // 跳转到我们
    hrefMe(e) {
      console.log(e.currentTarget.dataset.name)
      wx.navigateTo({
        url: `./../../pages/user/user?loginname=${e.currentTarget.dataset.name}`
      })
    },
    loginStatus () {
      console.log('登录应该显示')
      // 用此方法调用子组件的方法
      this.selectComponent('#loginDialog').showStatus()
    },
    // 父组件接收子组件传的值，并赋值
    saveUser (e) {
      console.log(e.detail)
      this.setData({
        user: e.detail
      })
    },
    // 关闭侧边栏
    closeSlide() {
      this.setData({
        num: this.data.num = 0,
        showState: 'close'
      })
    },
    // 侧边栏
    changeShow(e){
      this.setData({
        num: this.data.num += 1
      })
      if (this.data.num === 2) {
        this.setData({
          num: this.data.num = 0,
          showState: 'close'
        })
      } else if(this.data.num === 1) {
        this.setData({
          showState: 'open'
        })
      } else {
        this.setData({
          showState: ''
        })
      }
      console.log(this.data.num, this.data.showState)
    },
    
    // 当前点击频道页，需要传值给父组件
    clickTab (e) {
      console.log('我是子组件发送的数据' + e.currentTarget.dataset.item)
      // 子组件通过triggerEvent事件发送给父组件数据，
      // 第一个参数为父组件需要接收的事件名，第二个参数为数据
      this.triggerEvent('parentItem', e.currentTarget.dataset.item)
      this.closeSlide()
    }
  }
})
