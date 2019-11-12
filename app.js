//app.js
// 引入request请求文件。因为该文件包含全局请求。
const FetchApi = require("./utils/request")
// 引入Towxml 用于将markdown转换为wxml格式
const Towxml = require("./towxml/main")
App({
  // 在此处注册FetchApi以供全局使用。由于采用class 方式创建，所以需要new
  fetchApi: new FetchApi(),
  // 小程序初始化应用对象时调用。即每次冷启动的时候会调用一次。热启动不会被调用
  onLaunch: function () {
    // 判断Storage里面有没有用户信息存在。
    this.getInfo()
  },
  // 实例化towxml对象，供小程序其他页面使用
  towxml: new Towxml(),
  // 全局对象。可以在里面声明所有页面通用的数据
  globalData: {
    // 用户信息
    userInfo: null,
    // 首页需要默认显示的数据
    // tips 签名
    tips: [
      '要想学会递归，首先学会递归。',
      '世界上有10种人，一种懂二进制，一种不懂二进制。',
      'Hello World',
      'C语言很容易让你犯错误；C++看起来好一些，但当你用它时，你会发现会死的更惨。',
      '解决问题大多数都很容易；找到问题出在哪里却很难。',
      '给与足够的眼球，所有的Bugs都很容易发现。',
      '任何优秀的大软件里面都是一个优秀的小程序。',
      '真正的程序员从来不注释他们的代码。如果你做不到这样，也就说明你不能使你的程序易于理解。',
      '世上只有两种编程语言：一种是总是被人骂的，一种是从来没人用的。',
      '开发的越早，程序花费你的时间越长。',
      '优秀的判断力来自经验，但经验来自于错误的判断。',
      '我们这个世界的一个问题是，蠢人信誓旦旦，智人满腹狐疑。',
      '最初的90%的代码用去了最初90%的开发时间。余下的10%的代码用掉另外90%的开发时间。 –  比尔-盖茨',
      '软件在能够复用前必须先能用。'
    ],
    // 头像
    barImg: [
      'http://p86t9neoe.bkt.clouddn.com/slider_bg0.png',
      'http://p86t9neoe.bkt.clouddn.com/slider_bg1.png',
      'http://p86t9neoe.bkt.clouddn.com/slider_bg2.png',
      'http://p86t9neoe.bkt.clouddn.com/slider_bg3.png',
      'http://p86t9neoe.bkt.clouddn.com/slider_bg4.png',
      'http://p86t9neoe.bkt.clouddn.com/slider_bg5.png',
      'http://p86t9neoe.bkt.clouddn.com/slider_bg6.png',
      'http://p86t9neoe.bkt.clouddn.com/slider_bg7.png'
    ],
    // 接口相关
    cnode: {
      // 接口
      api: 'https://cnodejs.org/api/v1',
      // tab 栏目类
      tab: {
        ask: '问答',
        share: '分享',
        job: '招聘',
        good: '精华',
        index: '首页'
      }
    }
  },
  // 获取用户信息
  getInfo () {
    if(wx.getStorageSync('userinfo')) {
      this.globalData.userInfo = wx.getStorageSync('userinfo')
    }
  }
})