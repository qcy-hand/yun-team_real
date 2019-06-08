// miniprogram/pages/admin-cau/admin-cau.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorize: '',
    unauthorize: '',
    radio: '1'
  },
  onChange(event) {
    this.setData({
      radio: event.detail
    });
  },
  clear() {
    let that = this
    if (this.data.radio === '1') {
      wx.showModal({
        title: '提示',
        content: '是否清除最近七天的所有数据？',
        success(res) {
          if (res.confirm) {
            wx.cloud.callFunction({
              name: 'clear',
              data: {
                radio: that.data.radio,
                date: new Date().getTime()
              },
              success(res) {
                wx.showModal({
                  title: '提示',
                  content: '成功清除了'+res.result.stats.removed+'条数据',
                  showCancel: false,
                  success(res) {

                  }
                })
              }
            })
          }
        }
      })
    }
    if (this.data.radio === '2') {
      wx.showModal({
        title: '提示',
        content: '是否清除最近十五天的所有数据？',
        success(res) {
          if (res.confirm) {
            wx.cloud.callFunction({
              name: 'clear',
              data: {
                radio: that.data.radio,
                date: new Date().getTime()
              },
              success(res) {
                wx.showModal({
                  title: '提示',
                  content: '成功清除了'+res.result.stats.removed+'条数据',
                  showCancel: false,
                  success(res) {

                  }
                })
               }
            })
          }
        }
      })
    }
    if (this.data.radio === '3') {
      wx.showModal({
        title: '提示',
        content: '是否清除最近三十天的所有数据？',
        success(res) {
          if (res.confirm) {
            wx.cloud.callFunction({
              name: 'clear',
              data: {
                radio: that.data.radio,
                date: new Date().getTime()
              },
              success(res) {
                wx.showModal({
                  title: '提示',
                  content: '成功清除了'+res.result.stats.removed+'条数据',
                  showCancel: false,
                  success(res) {

                  }
                })
              }
            })
          }
        }
      })
    }

  },
  changevalue(res) {
    this.setData({
      authorize: res.detail
    })
  },
  changevalue1(res) {
    this.setData({
      unauthorize: res.detail
    })
  },
  authorize() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定授权此用户为管理人员？',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'authorize',
            data: {
              authorize: 1,
              nickName: that.data.authorize
            },
            success(res) {
              if (res.result.stats.updated === 0) {
                wx.showModal({
                  title: '提示',
                  content: '为查询到该用户，请检查昵称。',
                  showCancel: false,
                  success(res) { }
                })
              }
              if (res.result.stats.updated !== 0) {
                wx.showModal({
                  title: '提示',
                  content: '授权成功。',
                  showCancel: false,
                  success(res) { }
                })
              }
            }
          })
        }
      }
    })

  },

  unauthorize() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否确认取消此用户的授权？',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'authorize',
            data: {
              authorize: 0,
              nickName: that.data.unauthorize
            },
            success(res) {
              if (res.result.stats.updated === 0) {
                wx.showModal({
                  title: '提示',
                  content: '昵称错误或此用户并未授权，请检查。',
                  showCancel: false,
                  success(res) { }
                })
              }
              if (res.result.stats.updated !== 0) {
                wx.showModal({
                  title: '提示',
                  content: '取消授权成功。',
                  showCancel: false,
                  success(res) { }
                })
              }
            }
          })
        }
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