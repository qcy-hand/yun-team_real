// miniprogram/pages/search/page_search.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: [],
    list: 10,
    loading: false, //加载图标
    end: false, //到底文字，无更多条数时激活
    vasearch: '',
    activeNames: ['1'],

    border:false,//禁用折叠面板内/外边框
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
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
    console.log(typeof(res.detail))
    if (res.detail === '') {
      that.setData({
        vasearch: '',
        list: 10
      })
    } else {
      that.setData({
        vasearch: res.detail,
        list: 10
      })
    }
    setTimeout(() => {
      wx.cloud.callFunction({
        name: 'search',
        data: {
          search: that.data.vasearch,
          list: that.data.list
        },
        success(res) {
          let list = that.data.list - 10;
          if (res.result.data.length > list) {
            console.log(3)
            that.setData({
              article: res.result.data
            })
          }
          if (res.result.data.length <= list) {
            console.log(2)
            that.setData({
              article: res.result.data,
              end: true,
              loading: false
            })
          }
        }
      })
    }, 500);

  },
  getSearch() {
    let that = this
    wx.cloud.callFunction({
      name: 'search',
      data: {
        search: that.data.vasearch,
        list: that.data.list
      },
      success(res) {
        let list = that.data.list - 10;
        if (res.result.data.length > list) {
          console.log(3)
          that.setData({
            article: res.result.data
          })
        }
        if (res.result.data.length === 0) {
          console.log(5)
          that.setData({
            article: res.result.data,
            end: false,
            loading: false
          })
        }
        if (res.result.data.length <= list && res.result.data.length !== 0) {
          console.log(2)
          that.setData({
            article: res.result.data,
            end: true,
            loading: false
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
      name: 'search',
      data: {
        search: that.data.vasearch,
        list: that.data.list
      },
      success(res) {
       that.setData({
        article: res.result.data
       })
      }
    });
     //加载logo
    // wx.showToast({
    //   title: "加载中...",
    //   icon: "loading",
    //   mask:true,
    // });
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
      })
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("chudile")
    let that = this;
    if (!that.data.end) {
      console.log(that.data.list)
      console.log('object');
      that.setData({
        loading: true,
        list: that.data.list + 10
      })
      setTimeout(() => {
        that.getSearch();
      }, 500);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})