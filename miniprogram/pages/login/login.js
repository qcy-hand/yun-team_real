// miniprogram/pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scope: true,
  },

  login() {
    let that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          that.setData({
            scope: true
          })
        } else {
          that.checkStorage()
        }
      }
    })
  },

  checkStorage() {
    let that = this
    wx.getStorage({
      key: 'key',
      success(res) {
        that.tohome()
      },
      fail(res) {
        wx.getUserInfo({
          success(res) {
            wx.setStorage({
              key: 'key',
              data: {
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl
              },
              success(res) {
                that.tohome()
              },
              fail() { }
            })
          },
          fail() { }
        })
      }
    })
  },

  getUserInfo() {
    let that = this
    wx.getUserInfo({
      success(res) {
        wx.setStorage({
          key: 'key',
          data: {
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl
          },
          success(res) {
            console.log(res)
            that.setUserInfo()
          },
          fail() {
          }
        })
      },
      fail() {
      }
    })
  },

  setUserInfo() {
    let that = this
    wx.getStorage({
      key: 'key',
      success(res) {
        wx.cloud.callFunction({
          name: 'setUserInfo',
          data: {
            nickName: res.data.nickName,
            avatarUrl: res.data.avatarUrl
          },
          success(res) {
            that.tohome()
          }
        })
      }
    })
  },

  tohome() {
    wx.reLaunch({
      url: '/pages/home/page'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.login()
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