// pages/car/page_car.js

//拼车发布部分
import Notify from '../../vant-weapp/dist/notify/notify'; //信息填充不完整提示

//拼车动态部分
import Dialog from '../../vant-weapp/dist/dialog/dialog'; //删除确认弹窗

Page({
  data: {
    //拼车发布部分
    // 时间选择
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2029, 11, 1).getTime(),
    currentDate: new Date().getTime(),

    showTime: false, //时间选择器默认
    showlocation: false, //位置选择

    //拼车发布上传内容
    touxiang: "", //头像
    nickname: "", //昵称
    Nowtime: "", //发布时间
    // dateTimeStamp:"",
    time: "", //选择的时间 
    qidian: "", //起点
    zhongdian: "", //终点
    id_mess: "", //联系方式
    beizhu: "", //备注
    Timestamp: "", //时间戳 用于排序

    //拼车动态部分
    arroldcar: [], //后端回调的历史数组
    delid: "", //封装完上传到后端需要删除的id
    isCarShow: false,

    loadingcar: false, //加载图标
    endcar: false, //到底文字，无更多条数时激活
    currentPage: 0, // 取数据时的倍数

    getKind: Number
  },


  //拼车发布部分

  //按钮点击显示时间选择器
  onTap() {
    this.setData({
      showTime: true
    })
  },

  //选择起点
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
                qidian: res.name,
              })
            }
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

  //选择终点
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
                zhongdian: res.name,
              })
            }
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

  // 输入联系方式
  Input_mess(event) {
    // event.detail 为当前输入的值
    this.setData({
      id_mess: event.detail,
    })
  },
  //输入备注
  Input_beizhu(event) {
    // event.detail 为当前输入的值
    this.setData({
      beizhu: event.detail,
    })
  },

  //确定按钮事件，提交已填的内容
  Push() {
    //回调函数中不能直接使用this，需要在外面定义var that = this 然后 that.自定义的方法
    let that = this;
    if (that.data.time === "" || that.data.qidian === "" || that.data.zhongdian === "" || that.data.id_mess === "") {
      Notify({
        text: '备注以外的选项不可为空',
        duration: 1000,
        selector: '#custom-selector',
        backgroundColor: '#1989fa'
      });
    } else {
      wx.showModal({
        content: '填好啦？',
        cancelText: "再瞅瞅",
        confirmText: "对头嘞",
        confirmColor: " #669999",
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')

            that.Ntime(); //调用传值函数

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
    }
  },

  Ntime() {
    let that = this
    //传当前时间
    function getNowDate() {
    // function getNowDate(dateTimeStamp) {
    //   var minute = 1000 * 60;
    //   var hour = minute * 60;
    //   var day = hour * 24;
    //   var now = new Date().getTime();

    //   //计算时间差
    //   var diffvalue = now - dateTimeStamp;
    //   if (diffvalue < 0) {
    //     console.log("服务器创建时间获取失败");
    //     return Nowtime = "刚刚";
    //   }
    //   var dayC = diffvalue / day;
    //   var hourC = diffvalue / hour;
    //   var minC = diffvalue / minute;
    //   if (parseInt(dayC) > 1) {
    //     Nowtime = "" + parseInt(dayC) + "天前";
    //   } else if (parseInt(dayC) === 1) {
    //     Nowtime = "昨天";
    //   } else if (parseInt(hourC) >= 1) {
    //     Nowtime = "" + parseInt(hourC) + "小时前";
    //   } else if (parseInt(minC) >= 1) {
    //     Nowtime = "" + parseInt(minC) + "分钟前";
    //   } else
    //     Nowtime = "刚刚";
    //     return Nowtime;

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
      // Nowtime: getNowDate(dateTimeStamp)
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
        touxiang: that.data.touxiang,
        nickname: that.data.nickname,
        Nowtime: that.data.Nowtime,
        time: that.data.time,
        qidian: that.data.qidian,
        zhongdian: that.data.zhongdian,
        id_mess: that.data.id_mess,
        beizhu: that.data.beizhu,
        Timestamp: that.data.Timestamp,
        // dateTimeStamp:that.data.dateTimeStamp,
      },
      success(res) {
        console.log(res);
        //成功后接住数据并封装
        wx.cloud.callFunction({
          name: "getoldcar",
          data: {
            currentPage: that.data.currentPage,
            getKind: 0
          },
          success(res) {
            that.setData({
              arroldcar: res.result.data,
            })
          },
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

  //关闭位置授权弹窗
  onCloseload() {
    this.setData({
      showlocation: false,
    });
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
      fail() {
        wx.showModal({
          title: '提示',
          content: '系统错误，请稍后重试',
        })
      }
    })
  },

  //  转换已选取的时间戳，(时间选择器)
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

  // 关闭时间选择器
  onClose() {
    this.setData({
      showTime: false,
    });
  },

  //拼车动态部分
  //拼车删除历史事件
  onDelete(res) {
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
              arroldcar.splice(index, 1)
              that.setData({
                arroldcar
              })
              wx.showToast({
                title: '完成',
                icon: 'success',
                duration: 1500,
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

  //上拉加载取回拼车数据
  getlistcar() {
    console.log("object");
    let that = this
    wx.cloud.callFunction({
      name: "getoldcar",
      data: {
        currentPage: that.data.currentPage, //向后端传currentPage
        getKind: 0
      },
      success(res) {
        console.log("取到条数了");
        console.log(res);
        let arroldcar = that.data.arroldcar.concat(res.result.data) //连接两个数组
        let length = res.result.data.length
        that.setData({
          arroldcar: arroldcar
        }, () => {
          wx.hideLoading()
        })

        if (length < 10 && res.result.data.length !== 0) {
          that.setData({
            endcar: true,
            loadingcar: false
          })
        }

        //成功后条数判断
        // let listjudgecar = that.data.listcar - 10;
        // if (res.result.data.length > listjudgecar) {
        //   console.log(3)
        //   that.setData({
        //     arroldcar: res.result.data
        //   },()=>{
        //     wx.hideLoading()
        //   })
        // }
        // if (res.result.data.length === 0) {
        //   console.log(2)
        //   that.setData({
        //     arroldcar: res.result.data,
        //     endcar: false,
        //     loadingcar: false
        //   },()=>{
        //     wx.hideLoading()
        //   })
        // }
        // if (res.result.data.length <= listjudgecar && res.result.data.length !== 0) {
        //   console.log(2)
        //   that.setData({
        //     arroldcar: res.result.data,
        //     endcar: true,
        //     loadingcar: false
        //   },()=>{
        //     wx.hideLoading()
        //   })
        // }
      },
      fail() {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '加载错误，请稍后重试',
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //拼车动态部分
    wx.showLoading({
      title: "加载中...",
      mask: true,
    });
    that.getlistcar();

    //经过2000毫秒后加载图标
    // setTimeout(() => {
    //   //加载logo
    //   wx.showToast({
    //     title: "加载中...",
    //     icon: "loading",
    //     mask: true,
    //   });
    // }, 2000)

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
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // let that = this;
    // //拼车动态部分
    // wx.cloud.callFunction({
    //   name: "getoldcar",
    //   data: {
    // currentPage: that.data.currentPage
    //   },
    //   success(res) {
    //     console.log(res.result.data.length);
    //     that.setData({
    //       arroldcar: res.result.data
    //     })
    //   },
    //   fail() {
    //     wx.showModal({
    //       title: '提示',
    //       content: '刷新错误，请稍后重试',
    //     })
    //   }
    // })

    // setTimeout(() => {
    //   wx.stopPullDownRefresh({
    //     success(res) {
    //       console.log(1)
    //     },
    //   })
    // }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (res) {
    let that = this;
    let currentPage = this.data.currentPage

    //拼车动态部分
    if (!that.data.endcar) {
      console.log("触底了");
      console.log(1)
      this.setData({
        loadingcar: true,
        currentPage: ++currentPage
      }, () => {
        this.getlistcar();
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});