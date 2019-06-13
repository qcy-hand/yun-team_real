// miniprogram/pages/search/page_search.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: [],
    // list: 10,
    currentPage: 0,


    loading: false, //加载图标
    end: false, //到底文字，无更多条数时激活
    vasearch: '',
    activeNames: ['1'],

    border: false, //禁用折叠面板内/外边框
  },

  //折叠面板事件
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
    console.log(typeof (res.detail))
    if (res.detail === '') {
      that.setData({
        vasearch: '',
        currentPage: 0
      })
    } else {
      that.setData({
        vasearch: res.detail,
        currentPage: 0
      })
    }
    // setTimeout(() => {
    wx.cloud.callFunction({
      name: 'search',
      data: {
        search: that.data.vasearch,
        currentPage: that.data.currentPage,
      },
      success(res) {
        console.log(res);
        let article = that.data.article.concat(res.result.data)
        let length = res.result.data.length
        that.setData({
          article: article,
        })

        if (length < 10 && res.result.data.length !== 0) {
          that.setData({
            loading: false,
            end: true
          })
        }

        // if(length === 0){
        //   that.setData({
        //     loading:false,
        //     end:false,
        //   })
        // }

        // let list = that.data.list - 10;
        // if (res.result.data.length > list) {
        //   console.log(3)
        //   that.setData({
        //     article: res.result.data
        //   })
        // }
        // if (res.result.data.length <= list) {
        //   console.log(2)
        //   that.setData({
        //     article: res.result.data,
        //     end: true,
        //     loading: false
        //   })
        // }
      }
    })
    // }, 500);

  },
  getSearch() {
    let that = this
    wx.cloud.callFunction({
      name: 'search',
      data: {
        search: that.data.vasearch,
        currentPage: that.data.currentPage,
      },
      success(res) {
        console.log(res);
        let article = that.data.article.concat(res.result.data)
        let length = res.result.data.length
        that.setData({
          article: article,
        })

        if (length < 10 && res.result.data.length !== 0) {
          that.setData({
            loading: false,
            end: true
          })
        }

        // let list = that.data.list - 10;
        // if (res.result.data.length > list) {
        //   console.log(3)
        //   that.setData({
        //     article: res.result.data
        //   })
        // }
        // if (res.result.data.length === 0) {
        //   console.log(5)
        //   that.setData({
        //     article: res.result.data,
        //     end: false,
        //     loading: false
        //   })
        // }
        // if (res.result.data.length <= list && res.result.data.length !== 0) {
        //   console.log(2)
        //   that.setData({
        //     article: res.result.data,
        //     end: true,
        //     loading: false
        //   })
        // }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    // wx.cloud.callFunction({
    //   name: 'search',
    //   data: {
    //     search: that.data.vasearch,
    //     currentPage: that.data.currentPage,
    //   },
    //   success(res) {
    //    that.setData({
    //     article: res.result.data
    //    })
    //   }
    // });
    that.getSearch()

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("chudile")
    let that = this;
    let currentPage = this.data.currentPage

    if (!that.data.end) {
      // console.log(that.data.list)
      // console.log('object');
      that.setData({
        loading: true,
        currentPage: ++currentPage
      }, () => {
        that.getSearch();
      })
    }
    //   })
    //   setTimeout(() => {
    //     that.getSearch();
    //   }, 500);
    // }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})