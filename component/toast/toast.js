// component/toast/toast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 弹窗文字
    innerText: {
      type: String
    },
    // 弹窗是否显示
    isShow: {
      type: Boolean,
      observer: function (newVlue, oldVal) {
        if (newVlue) {
          this.setData({
            isChildShow: true
          })
          var timer = setTimeout(() => {
            this.setData({
              isChildShow: false
            })
          }, 2000)
        }
      }
    },
    duration: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isChildShow: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
