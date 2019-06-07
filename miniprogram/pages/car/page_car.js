// pages/car/page_car.js

Page({
  data: {
    // 时间选择
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2029, 11, 1).getTime(),
    currentDate: new Date().getTime(),
    showTime: false,
    showlocation:false,
    scope: true,
    //返回时间转换结果
    max: false,
    activeNames: ['1'],
    time: '',
    qidian: '',
    zhongdian: '',
    Nowtime: '',
    id_mess: '',
    beizhu: '',
    nickname: "",
    touxiang: '',
    Timestamp: "",

    loading: false, //加载图标
    end: false, //到底文字
    list: 10, //初始取回条数
  },



  // 关闭时间选择器
  onClose() {
    this.setData({
      showTime: false,
    });
  },

//关闭位置授权弹窗
onCloseload() {
  this.setData({
    showlocation: false,
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

  //确定按钮事件
  Push() {
    //回调函数中不能直接使用this，需要在外面定义var that = this 然后 that.自定义的方法
    let that = this;
    wx.showModal({
      content: '填好啦？',
      cancelText: "再瞅瞅",
      confirmText: "对头嘞",
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


  Ntime() {
    let that = this
    //传当前时间
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

    //传时间戳
    function gettimestamp() {
      var timestamp = new Date().getTime();
      return timestamp;
    };
    this.setData({
      Timestamp: gettimestamp()
    });

    //向数据库传数据
    wx.cloud.callFunction({
      name: 'sendcar',
      data: {
        type: 'car',
        time: that.data.time,
        qidian: that.data.qidian,
        zhongdian: that.data.zhongdian,
        id_mess: that.data.id_mess,
        beizhu: that.data.beizhu,
        Nowtime: that.data.Nowtime,
        nickname: that.data.nickname,
        touxiang: that.data.touxiang,
        Timestamp: that.data.Timestamp,
      },
      success(res) {
        console.log(res);
        //成功后接住数据并封装
        wx.cloud.callFunction({
          name: "getcar",
          data: {},
          success(res) {
            that.setData({
              arrcar: res.result.data
            })
          }
        })
      }
    })
  },

  //上滑加载完成后判比信息条数
  // loadingup(res){
  //   console.log(res);
  //   let list1 = that.data.list - 10;
  //   if(res.result.data.length){}


  // },

  //按钮点击显示时间选择器
  onTap() {
    this.setData({
      showTime: true
    })
  },

  getUserLocationstart() {
    let that = this
    wx.getSetting({
      success(res) {
        console.log(res.authSetting['scope.userLocation'])
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              console.log(2)
            },
            fail() {
              console.log('1');
              that.setData({
                showlocation: true
              })
            }
          })
        } else {
          //地址选择
          wx.chooseLocation({
            type: 'wgs84',
            success(res) {
              that.setData({
                didian: res.name,
              })
            }
          })
        }
      }
    })
  },



  getUserLocationover() {
    let that = this
    wx.getSetting({
      success(res) {
        console.log(res.authSetting['scope.userLocation'])
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              console.log(2)
            },
            fail() {
              console.log('1');
              that.setData({
                showlocation: true
              })
            }
          })
        } else {
          //地址选择
          wx.chooseLocation({
            type: 'wgs84',
            success(res) {
              that.setData({
                didian: res.name,
              })
            }
          })
        }
      }
    })
  },

  //引导跳转设置页面
  Opensetting() {
    wx.openSetting({
      success(res) {
        console.log(res.authSetting)
        res.authSetting = {
          "scope.userInfo": true,
          "scope.userLocation": true
        }
      },
      fail(err) {
        console.log(err);
      }
    })
  },

  // 折叠面板
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  // 
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.cloud.callFunction({
      name: "getcar",
      data: {},
      success(res) {
        console.log(res);
        that.setData({
          arrcar: res.result.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
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
    let that = this;
    wx.cloud.callFunction({
      name: "getcar",
      data: {},
      success(res) {
        that.setData({
          arrcar: res.result.data
        })
      }
    });

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
    // let that = this;
    // if(!that.data.end){

    // }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});