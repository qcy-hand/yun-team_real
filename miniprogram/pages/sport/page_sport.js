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
    //返回时间转换结果
    activeNames: ['1'],
    time: '',
    didian: '',
    Nowtime: '',
    id_sport: '',
    id_mess: '',
    beizhu: '',
    nickname:"",
    touxiang: '',
    Timestamp:"",
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
      }
    })

  },

  //获取当前时间
  Ntime() {
    let that = this ;
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
    }
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
      name: "sendsport",
      data:{
        type:"sport",
        time: that.data.time,
        didian: that.data.didian,
        Nowtime: that.data.Nowtime,
        id_sport: that.data.id_sport,
        id_mess: that.data.id_mess,
        beizhu: that.data.beizhu,
        nickname:that.data.nickname,
        touxiang:that.data.touxiang,
        Timestamp:that.data.Timestamp,
      },
      success(res){
        console.log(res);
        wx.cloud.callFunction({
          name:"getsport",
          data:{},
          success(res){
            that.setData({
              arrsport:res.result.data
            })
          }
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

  //起点地址选择
  chooseLocationStart() {
    let that = this
    wx.chooseLocation({
      type: 'wgs84',
      success(res) {
        that.setData({
          didian: res.name,

        })
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
  Input_sport(event) {
    // event.detail 为当前输入的值
    this.setData({
      id_sport: event.detail,
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.cloud.callFunction({
      name:"getsport",
      data:{},
      success(res){
        that.setData({
          arrsport:res.result.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.cloud.callFunction({
      name:"getsport",
      data:{},
      success(res){
        that.setData({
          arrsport:res.result.data
        })
      }
    })
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
      name:"getsport",
      data:{},
      success(res){
        that.setData({
          arrsport:res.result.data
        })
      }
    });
    
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
});