// pages/card/page_card.js
import Dialog from '../../vant-weapp/dist/dialog/dialog';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    arroldcar: [],
    arroldsport: [],
    arroldstudy: [],
    arroldcustomize: [],
    delid: "",
  },

  onClose(res) {
    console.log(res);
    let index = res.currentTarget.dataset.index
    let arroldcar = this.data.arroldcar
    let that = this
    console.log(index);
    const {
      position,
      instance
    } = res.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除？',
          closeOnClickOverlay: true,
        }).then(() => {
          console.log('用户点击确定')
          wx.cloud.callFunction({
            name: "delete",
            data: {
              delid: res.currentTarget.dataset.id
            },
            success(res) {
              arroldcar.splice(index,1)
              that.setData({
                arroldcar
              })
              instance.close();
            }
          })
          wx.showToast({
            title: '完成',
            icon: 'success',
            duration: 2000,
          });
        }).catch(() => {
          console.log('用户点击取消');
          instance.close();
        });;
        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      name: "getoldsport",
      data: {},
      success(res) {
        console.log(res);
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
      name: "getoldcustom",
      data: {},
      success(res) {

        that.setData({
          arroldcustomize: res.result.data
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
      name: "getoldsport",
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
      name: "getoldcustom",
      data: {},
      success(res) {
        console.log(res);
        that.setData({
          arroldcustomize: res.result.data
        })
      }
    })

    setTimeout(() => {
      wx.stopPullDownRefresh({
        success(res) {
          console.log(1)
        }
      })
    }, 2000)
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