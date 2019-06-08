// miniprogram/pages/admin-notice/admin-notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showNotice: false,
    texta: '',
    text: ''
  },
  onChange(event) {
    let that = this
    // 需要手动对 checked 状态进行更新
    wx.showModal({
      title: '提示',
      content: '是否更改通告栏的显示状态？',
      success(res) {
        if (res.confirm) {
          that.setData({ showNotice: event.detail });
          wx.cloud.callFunction({
            name: 'notice',
            data: {
              find: 1, // find = 1 时代表控制全局通告栏的显示状态
              showNotice: that.data.showNotice
            },
            success(res) {
              if (res.result.stats.updated === 1) {
                wx.showModal({
                  title: '提示',
                  content: '更改成功！',
                  showCancel: false,
                  success(res) {}
                })
              }
            }
          })
        }
      }
    })
  },
  onChangeContent(event){
    this.setData({
      texta: event.detail
    })
  },

  sendContent(){
    let that = this
    wx.showModal({
      text:'提示',
      content:'是否更改通告栏内容？',
      success(res){
        if(res.confirm){
          wx.cloud.callFunction({
            name:'notice',
            data:{
              find:2, //find = 2 时表示改变通告栏的内容
              text: that.data.texta
            },
            success(res){
              if (res.result.stats.updated === 1) {
                wx.showModal({
                  title: '提示',
                  content: '更改成功！',
                  showCancel: false,
                  success(res) {}
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
    let that = this
    wx.cloud.callFunction({
      name:'notice',
      data:{
        find: 3 //find = 3时表示获取通告栏的状态与内容
      },
      success(res){
        console.log(res)
        that.setData({
          showNotice: res.result.data[0].showNotice,
          text: res.result.data[0].text
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