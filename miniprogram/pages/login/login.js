// miniprogram/pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scope: true,
  },

  //页面加载过程中调用该函数
  login() {
    let that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          console.log("weishouquan");
          that.setData({
            scope: true//用户如果没授权，则显示登陆按钮。再由登陆按钮调用获取信息的函数
          })
        } else {
          console.log("yishouquan");
          that.checkStorage()//已授权，调用check
        }
      }
    })
  },
  
  //获取信息的函数
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
            console.log("yihuancun");
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


  checkStorage() {
    let that = this
    wx.getStorage({
      key: 'key',
      success(res) {
        console.log("yicheckhuoqu");
        that.tohistory()
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
                console.log("cunchuwancheng")
                that.tohistory()
              },
              fail() { }
            })
          },
          fail() { }
        })
      }
    })
  },

 //从本地缓存中异步获取指定 key 的内容
  setUserInfo() {
    let that = this
    wx.getStorage({
      key: 'key',
      success(res) {
        console.log(res)
        wx.cloud.callFunction({//上传到后端
          name: 'setUserInfo',
          data: {
            nickName: res.data.nickName,
            avatarUrl: res.data.avatarUrl
          },
          success(res) {
            console.log("yishangchuan");
            that.tohistory()
          }
        })
      }
    })
  },

  tohistory() {
    wx.reLaunch({
      url: '/pages/history/page_history'
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