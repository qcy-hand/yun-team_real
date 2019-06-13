// pages/home/page.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scroll_height: 0,
  },

  //点击事件
  tz_car: function () {
    wx.navigateTo({
      url: '../car/page_car'
    });
  },

  tz_sport: function () {
    wx.navigateTo({
      url: '../sport/page_sport'
    });
  },

  tz_study: function () {
    wx.navigateTo({
      url: '../study/page_study'
    });
  },
  tz_customize: function () {
    wx.navigateTo({
      url: '../customize/page_customize'
    });
  },
  tz_search: function () {
    wx.navigateTo({
      url: '../search/page_search'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //经过2000毫秒后加载图标
    // setTimeout(() => {
    //   //加载logo
    // wx.showToast({
    //   title: "加载中...",
    //   icon: "loading",
    //   mask:true,
    // });
    // }, 2000)

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
   
    // setTimeout(() => {
    //   wx.stopPullDownRefresh({
    //     success(res) {
    //       console.log(1)
    //     },
    //     fail() {
    //       wx.showModal({
    //         title: '提示',
    //         content: '系统错误，请稍后重试',
    //       })
    //     }
    //   })
    // }, 500)
    
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
