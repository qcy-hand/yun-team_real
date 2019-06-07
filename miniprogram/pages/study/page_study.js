// pages/car/page_car.js
import Notify from '../../vant-weapp/dist/notify/notify';
Page({
  data: {
    // 时间选择
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2029, 11, 1).getTime(),
    currentDate: new Date().getTime(),
    showTime: false,
    //返回时间转换结果
    time: '',
    Nowtime: '',
    activeNames: ['1'],
    didian_study: '',
    id_study: '',
    id_mess: '',
    beizhu: '',
    nickname:"",
    touxiang:"",
    Timestamp:"",
    arrstudy:[],

    loading: false, //加载图标
    end: false, //到底文字，无更多条数时激活
    list: 10, //初始取回条数
  },




  // 关闭时间选择器
  onClose() {
    this.setData({
      showTime: false,
    });
  },


  //  转换已选取的时间戳，
  onInput(event) {
    var a = event.detail

    function getdate(a) {
      var now = new Date(a),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate(),
        h = now.getHours(),
        n = now.getMinutes()
      return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + (h < 10 ? "0" + h : h) + ":" + (n < 10 ? "0" + n : n);
    }
    this.setData({
      showTime: false,
      time: getdate(a)
    });
  },

  Push(){
    let that = this;
    if (that.data.time === "" || that.data. didian_study === "" || that.data.id_study === "" || that.data.id_mess === "") {
      Notify({
        text: '备注以外的选项不可为空',
        duration: 1000,
        selector: '#custom-selector',
        backgroundColor: '#1989fa'
      });
    } else {
    wx.showModal({
      content: '填完啦？',
      cancelText:"再瞅瞅",
      confirmText:"对头嘞",
      confirmColor:" #669999",
      
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
      },
      fail() {
        wx.showModal({
          title: '提示',
          content: '系统错误，请稍后重试',
        })
      }
    })
    }
  },


  //获取当前时间
  Ntime() {
    let that = this;
    console.log('yidianji');

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
      return month + "-" + strDate +
        " " + hourDate + ":" + minuteDate;
    };
    this.setData({
      Nowtime: getNowDate()
    });

    function gettimestamp() {
      var timestamp = new Date().getTime();
      return timestamp;
    };
    this.setData({
      Timestamp: gettimestamp()
    });

    
    wx.cloud.callFunction({
      name: 'sendstudy',
      data: {
        type: 'study',
        time: that.data.time,
        Nowtime: that.data.Nowtime,
        didian_study: that.data.didian_study,
        id_study: that.data.id_study,
        id_mess: that.data.id_mess,
        beizhu: that.data.beizhu,
        nickname:that.data.nickname,
        touxiang:that.data.touxiang,
        Timestamp:that.data.Timestamp,
      },
      success(res) {
        wx.cloud.callFunction({
          name: "getstudy",
          data: { list: that.data.list},
          success(res) {
            that.setData({
              arrstudy: res.result.data
            })
          },
          fail() {
            wx.showModal({
              title: '提示',
              content: '系统错误，请稍后重试',
            })
          }
        })
      },
      fail() {
        wx.showModal({
          title: '提示',
          content: '系统错误，请稍后重试',
        })
      }
    })
  },


  //按钮点击显示时间选择器
  onTap() {
    this.setData({
      showTime: true
    })
  },

  // 折叠面板
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  // 
  Location_study(event) {
    // event.detail 为当前输入的值
    this.setData({
      didian_study: event.detail,
    })
  },
  Input_study(event) {
    // event.detail 为当前输入的值
    this.setData({
      id_study: event.detail,
    })
  },
  Input_mess(event) {
    // event.detail 为当前输入的值
    this.setData({
      id_mess: event.detail,
    })
  },
  Input_beizhu(event) {
    // event.detail 为当前输入的值
    this.setData({
      beizhu: event.detail,
    })
  },

 //上拉加载取回数据
 getlist() {
  let that = this
  wx.cloud.callFunction({
    name: "getstudy",
    data: {
      list: that.data.list //向后端传list
    },
    success(res) {
      console.log("取到条数了");
      //成功后条数判断
      let listjudge = that.data.list - 10;
      if (res.result.data.length > listjudge) {
        console.log(3)
        that.setData({
          arrstudy: res.result.data
        })
      }
      if (res.result.data.length <= listjudge) {
        console.log(2)
        that.setData({
          arrstudy: res.result.data,
          end: true,
          loading: false
        })
      }
    },
    fail() {
      wx.showModal({
        title: '提示',
        content: '系统错误，请稍后重试',
      })
    }
  })
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.getlist();
    wx.cloud.callFunction({
      name: "getstudy",
      data: {
        list: that.data.list //向后端传list
      },
      success(res) {
        that.setData({
          arrstudy: res.result.data
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
    let that = this;
    wx.getStorage({
      key:"key",
      success(res){
        console.log(res);
        that.setData({
          nickname:res.data.nickName,
          touxiang:res.data.avatarUrl,
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
    let that = this;
    
    wx.cloud.callFunction({
      name: "getstudy",
      data: {
        list: that.data.list //向后端传list
      },
      success(res) {
        that.setData({
          arrstudy: res.result.data
        })
      },
      fail() {
        wx.showModal({
          title: '提示',
          content: '刷新错误，请稍后重试',
        })
      }
    });
   
    setTimeout(() => {
      wx.stopPullDownRefresh({
        success(res) {
          console.log(1)
        },
        fail() {
          wx.showModal({
            title: '提示',
            content: '系统错误，请稍后重试',
          })
        }
      })
    }, 2000)
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(this.data.list)
    console.log("触底了");
    let that = this;
    if (!that.data.end) {
      console.log(1)
      that.setData({
        loading: true,
        list: that.data.list + 10
      })
      setTimeout(() => {
        that.getlist();
      }, 500);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});