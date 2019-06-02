// miniprogram/pages/search/page_search.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['拼车', '运动', '学习', '自定义'],
    objectArray: [{
        id: 0,
        name: '拼车'
      },
      {
        id: 1,
        name: '运动'
      },
      {
        id: 2,
        name: '学习'
      },
      {
        id: 3,
        name: '自定义'
      }
    ],
    Choose: 0,
  },

  //自带选择器传值
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Choose: e.detail.value
    })
  },

  //搜索内容传值
  onSearch(res) {
    this.setData({
      Sercontent: res.event.detail
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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