// pages/mine/page_mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  toadmin(){
    wx.cloud.callFunction({
      name: 'checkadmin',
      data:{},
      success(res){
        if(res.result.data.length === 0){
          wx.showModal({
            title: '提示',
            content: '您无权限进入哦～',
            showCancel: false
          })
        }
        if(res.result.data.length !== 0){
          wx.navigateTo({
            url:'/pages/admin/admin'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
 //加载logo
 wx.showToast({
  title: "加载中...",
  icon: "loading",
  mask:true,
});
//缓用户昵称头像
wx.getStorage({
  key: "key",
  success(res) {
    console.log(res);
    that.setData({
      nickname: res.data.nickName,
      touxiang: res.data.avatarUrl,
    })
  }
})

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
    
    setTimeout(() => {
      wx.stopPullDownRefresh({
        success(res) {
          console.log(1)
        },
        fail() {
          wx.showModal({
            title: '提示',
            content: '系统错误，请稍后重试',
          })
        }
      })
    }, 500)
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