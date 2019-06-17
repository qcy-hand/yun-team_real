// miniprogram/pages/admin-delete/admin-delete.js

import Dialog from '../../vant-weapp/dist/dialog/dialog';

Page({
  /**
     * 页面的初始数据
     */
  data: {
    article: [],
    currentPage: 0,

    loading: false, //加载图标
    end: false, //到底文字，无更多条数时激活
    vasearch: '',
    activeNames: ['1'],

    border: false, //禁用折叠面板内/外边框
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

//转换发布时间显示格式
NowDate(dateTimeStamp) {
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var now = new Date().getTime();

  // 计算时间差
  var diffvalue = now - dateTimeStamp;
  let result = ''
  if (diffvalue < 0) {
    console.log("服务器创建时间获取失败");
    return result = "刚刚";
  }
  var dayC = diffvalue / day;
  var hourC = diffvalue / hour;
  var minC = diffvalue / minute;
  if (parseInt(dayC) > 1) {
    result = "" + parseInt(dayC) + "天前";
  } else if (parseInt(dayC) === 1) {
    result = "昨天";
  } else if (parseInt(hourC) >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (parseInt(minC) >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else {
    result = "刚刚";
  }
  return result;
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
        let ret = res.result.data
        ret.forEach(element => {
          // console.log(element);
          let interlTime = that.NowDate(element.Timestamp)
          element.interlTime = interlTime
          // console.log(interlTime);
        });
      
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
      }
    })
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
        let ret = res.result.data
        ret.forEach(element => {
          // console.log(element);
          let interlTime = that.NowDate(element.Timestamp)
          element.interlTime = interlTime
          // console.log(interlTime);
        });
       
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
      }
    })
  },


  onClose(res) {
    console.log(res);
    let index = res.currentTarget.dataset.index
    let article = this.data.article
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
              article.splice(index, 1)
              that.setData({
                article
              })
              wx.showToast({
                title: '完成',
                icon: 'success',
                duration: 2000,
              });
              instance.close();
            },
            fail() {
              wx.showModal({
                title: '提示',
                content: '系统错误，请稍后重试',
              })
            }
          })

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
      that.setData({
        loading: true,
        currentPage: ++currentPage
      }, () => {
        that.getSearch();
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})