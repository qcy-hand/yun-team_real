// miniprogram/pages/search/page_search.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    article:[],
  },

  //自带选择器传值
  bindPickerChange: function (e) {
    if (e.detail.value === '0') {
      this.setData({
        Choose: e.detail.value,
        car: 1,
        sport: 0,
        study: 0,
        customize: 0
      })
    }
  },

  //搜索内容传值
  onSearch(res) {
    let that = this 
    console.log(res.detail)
    wx.cloud.callFunction({
      name: 'search',
      data: { search : res.detail},
      success(res) {
        console.log(res)
        that.setData({
          article: res.result.data
        })
      }
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