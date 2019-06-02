// pages/home/page.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0, //默认第一页
    active: 0, //active是van-tabar属性类型是number
    icon: {
      normal: 'https://neauhand.hhp.im/img/zy.png',
      active: 'https://neauhand.hhp.im/img/zy-b.png'
    },
    icon1: {
      normal: 'https://neauhand.hhp.im/img/ls2.png',
      active: 'https://neauhand.hhp.im/img/ls2-b.png'
    },
    icon2: {
      normal: 'https://neauhand.hhp.im/img/mine.png',
      active: 'https://neauhand.hhp.im/img/mine-b.png'
    },
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

  // 切换标签时触发
  //tabbar监听切换swiper
  onChange(event) {

    console.log(event.detail);

    this.setData({

      page: event.detail,

      currentData: event.detail

    })

  },

  //swiper滑动监听切换tabbar

  swiperChange(event) {

    console.log(event.detail.current)

    this.setData({

      active: event.detail.current

    })

  },

  // 获取数据
  get:function()
  {
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

  delete:function(e){
    let that=this;
    wx.cloud.callFunction({
      name: "delete",
      data:{
        delid:e.currentTarget.dataset.id
      },
      success(res) {
        console.log("删除成功");
        that.get();
      },
      fail(res) {
        console.log(res);
        console.log("删除失败");
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