// pages/home/page.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    
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
    let that = this;
    wx.cloud.callFunction({
      name:"getcar",
      data: {},
      success(res) {
        that.setData({
          arrcar: res.result.data
        })
      }
    });
    
    wx.cloud.callFunction({
      name:"getsport",
      data:{},
      success(res){
        that.setData({
          arrsport:res.result.data
        })
      }
    });
    

    wx.cloud.callFunction({
      name: "getstudy",
      data: {},
      success(res) {
        that.setData({
          arrstudy: res.result.data
        })
      }
    });
   
    wx.cloud.callFunction({
      name: 'getcustomize',
      data: {},
      success(res) {
        that.setData({
          arrcustomize: res.result.data
        })
      }
    })

    setTimeout(() => {
      wx.stopPullDownRefresh({
        success(res) {
          console.log(1)
        }
      })
    }, 1000)
    
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
