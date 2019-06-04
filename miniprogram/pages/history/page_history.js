// pages/card/page_card.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  onClose(event) {
    // console.log(event);
    let that = this;
    const {
      position,
      instance
    } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        wx.showModal({
          content: '确定删除？',
          cancelText: "取消",
          confirmText: "确定",
          confirmColor: " #669999",
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.delete();
              wx.showToast({
                title: '成功',
                icon: 'success',
                // duration: 2000,
              });
            } else if (res.cancel) {
              console.log('用户点击取消');
              console.log(res);
              instance.close();
            }
          }
        });
       
        break;
    }
  },


  delete(e) {
    console.log(e);
    let that = this;
    wx.cloud.callFunction({
      name: "delete",
      data: {
        delid: e.currentTarget.dataset.id
      },
      success(res) {
        that.get();
      }
    })
  },

  //删除事件
  // delete(e) {
  //   console.log(e);
  //   let that = this;
  //   wx.showModal({
  //     content: '确定删除？',
  //     cancelText: "取消",
  //     confirmText: "确定",
  //     confirmColor: " #669999",
  //     success(res) {
  //       if (res.confirm) {
  //         console.log('用户点击确定')
  //         console.log("删除成功");
  //         wx.cloud.callFunction({
  //           name: "delete",
  //           data: {
  //             delid: e.currentTarget.dataset.id
  //           },
  //         });
  //         wx.showToast({
  //           title: '成功',
  //           icon: 'success',
  //           duration: 2000,
  //         });
  //         that.get();
  //       } else if (res.cancel) {
  //         console.log('用户点击取消');
  //         console.log(res);
  //         console.log("删除失败");
  //       }
  //     }

  //   });
  // },

  // 获取数据
  get() {
    let that = this;
    wx.cloud.callFunction({
      name: "getoldcar",
      data: {},
      success(res) {
        that.setData({
          arroldcar: res.result.data
        })
      }
    })

    wx.cloud.callFunction({
      name: "getoldsports",
      data: {},
      success(res) {
        that.setData({
          arroldsport: res.result.data
        })
      }
    })

    wx.cloud.callFunction({
      name: "getoldstudy",
      data: {},
      success(res) {
        that.setData({
          arroldstudy: res.result.data
        })
      }
    })

    wx.cloud.callFunction({
      name: "getoldcustomize",
      data: {},
      success(res) {
        that.setData({
          arroldcustomize: res.result.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get();
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