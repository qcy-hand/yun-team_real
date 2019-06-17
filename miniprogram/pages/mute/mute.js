// miniprogram/pages/mute/mute.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var time = options.time
    var nowtime = options.now
    var now = new Date().getTime()
    if (time == 1) {
      this.setData({
        type: 24,
        // 86400000
      })
      if(now - nowtime >= 86400000){
        wx.cloud.callFunction({
          name:'mute',
          data:{type:5},
          success(res){
            console.log(res)
            wx.reLaunch({
              url: "../history/page_history"
            })
          }
        })
      }
    }
    if (time == 2) {
      this.setData({
        type: 36,
        // 129600000
      })
      if(now - nowtime >= 129600000){
        wx.cloud.callFunction({
          name:'mute',
          data:{type:5},
          success(res){
            console.log(res)
            wx.reLaunch({
              url: "../history/page_history"
            })
          }
        })
      }
    }
    if (time == 3) {
      this.setData({
        type: 48,
        // 172800000,
      })
      if(now - nowtime >= 172800000){
        wx.cloud.callFunction({
          name:'mute',
          data:{type:5},
          success(res){
            console.log(res)
            wx.reLaunch({
              url: "../history/page_history"
            })
          }
        })
      }
    }
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