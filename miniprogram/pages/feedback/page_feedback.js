// pages/feedback/page_feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feedinfo: '',
    Nowtime: '',
    text: '',
   
  },
  // Input_feedback(event) {
  //   // event.detail 为当前输入的值
  //   this.setData({
  //     feedinfo: event.detail,
  //   })
  // },

  //提交按钮事件
  Push() {
    //回调函数中不能直接使用this，需要在外面定义var that = this 然后 that.自定义的方法
    let that = this;
    wx.showModal({
      content: '感谢您的支持与反馈！',
      showCancel:false,
      confirmText: "确定",
      confirmColor: " #669999",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.Ntime();
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //获取当前时间
  Ntime() {
    let that = this
    function getNowDate() {
      var date = new Date(),
        month = date.getMonth() + 1,
        strDate = date.getDate(),
        hourDate = date.getHours(),
        minuteDate = date.getMinutes()
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hourDate >= 0 && hourDate <= 9) {
        hourDate = "0" + hourDate;
      }
      if (minuteDate >= 0 && minuteDate <= 9) {
        minuteDate = "0" + minuteDate;
      }
      return  month + "-" + strDate +
        " " + hourDate + ":" + minuteDate;
     
    }

    this.setData({
      Nowtime: getNowDate()
    });

    //向数据库传数据
    wx.cloud.callFunction({
      name: 'sendfeedback',
      data: {
        feedinfo:that.data.feedinfo,
        Nowtime: that.data.Nowtime,
        nickname: that.data.nickname,
        touxiang: that.data.touxiang,
      },
      success(res) {
        console.log(res);
      }
    })
  },

  //失去焦点时获取里面评论内容
  bindTextAreaBlur: function (e) {
    // console.log(e.detail.value)
    this.setData({
      feedinfo: e.detail.value,
    })
  },


  // //点击按钮时得到里面的值
  // fabiao: function (e) {
  //   this.setData({
  //     focus: 'false',
  //     concent1: this.data.concent,
  //   })
  //   console.log(this.data.concent)
  // },

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
    let that = this
    wx.getStorage({
      key: 'key',
      success(res) {
        console.log(res)
        that.setData({
          nickname: res.data.nickName,
          touxiang: res.data.avatarUrl,
        })
      }
    })
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