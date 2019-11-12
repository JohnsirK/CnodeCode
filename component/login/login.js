// 引入app
const app = getApp()
// component/login/login.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  }, 

  /**
   * 组件的初始数据
   */
  data: {
    // login 模态框显示隐藏
    loginStatus: false,
    // token
    accesstoken: "",
    // 获取焦点
    isFocus: false,
    // 文字
    toastText: '',
    // toast是否显示
    isShow: false,
    // 用户信息
    saveUser: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 执行动画
    // 隐藏遮罩
    hideStatus () {
      this.setData({
        loginStatus: false
      })
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease'
      })
      this.animation = animation 
      animation.opacity(0).translate(38, 100, 0).step()
      this.setData({
        animationData: animation.export()
      })
    },
    // 显示遮罩
    showStatus () {
      this.setData({
        loginStatus: true
      })
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease'
      })
      this.animation = animation 
      animation.opacity(1).translate(38, 150, 0).step()
      this.setData({
        animationData: animation.export()
      })
    },
    // accesstoken实现双向绑定
    // 必须在input 上面添加data-value属性。属性值等于accesstoken变量。
    // 同时通过bindinput事件，键盘输入时触发。
    inputedit (e) {
      // 获取事件参数， 通过事件参数获取input所对应的全局属性属性名
      // 获取input的当前值。通过value获取用户所输入的内容
      var value = e.detail.value
      this.setData({
        accesstoken: value
      })
    },
    // 验证token合法性
    isToken (token) {
      // 拦截器发送中
      wx.showLoading({
        title: '正在登录中...'
      })
      app.fetchApi.postAccessToken(token).then(res => {
        wx.hideLoading()
        if (res.success == false) {
          setTimeout(() => {
            this.setData({
              isShow: true, 
              toastText: res.error_msg,
              isFocus: true
            })
          }, 300) 
        } else {
          setTimeout(() => {
            this.setData({
              isShow: true, 
              toastText: res.loginname + '，欢迎您！',
            })
          }, 300)
          this.hideStatus()
          res['token'] = this.data.accesstoken || token
          // 存储user用户信息
          wx.setStorageSync('userinfo', {...res})
          // 登录成功也需要改变全局userInfo的数据。不然其他页面也会是未登录状态
          app.globalData.userInfo = {...res}
          // 登录成功需要将用户信息实时传给父组件
          // saveUser为父组件接收数据的事件名称
          this.triggerEvent('saveUser', {...res})
        }
        this.setData({
          accesstoken: ""
        })
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
        setTimeout(() => {
          this.setData({
            isShow: true, 
            toastText: 'token不合法或者token输入错误！',
            isFocus: true
          })
        }, 300)
        this.setData({
          accesstoken: ""
        })
      })
    },
    // 登录
    loginAccess () {
      this.setData({
        isShow: false,
        isFocus: false
      })
      this.isToken(this.data.accesstoken)
    },
    // 扫码登录
    scanCode () {
      wx.scanCode({
        success: (res) => {
          console.log(res)
          this.isToken(res.result)
        }
      })
    }
  }
})
