// pages/car/page_car.js

//运动发布部分
import Notify from '../../vant-weapp/dist/notify/notify'; //信息填充不完整提示

//运动动态部分
import Dialog from '../../vant-weapp/dist/dialog/dialog'; //删除确认弹窗

Page({
  data: {
    //运动发布部分
    // 时间选择
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2029, 11, 1).getTime(),
    currentDate: new Date().getTime(),

    showTime: false, //时间选择器默认
    showlocation: false, //位置选择

    //运动发布上传内容
    touxiang: '', //头像
    nickname: "", //昵称
    // Nowtime: '', //发布时间
    time: '', //选择活动时间
    didian: '', //地点
    id_sport: '', //运动项目
    id_mess: '', //联系方式
    beizhu: '', //备注
    Timestamp: "", //时间戳

    //运动动态部分
    arroldsport: [], //后端回调的历史数组
    delid: "", //封装完上传到后端需要删除的id
    isCarShow: false,

    loadingsport: false, //加载图标
    endsport: false, //到底文字，无更多条数时激活
    currentPage: 0, // 取数据时的倍数

    getKind:0
  },

  //运动发布部分
  //按钮点击显示时间选择器
  onTap() {
    this.setData({
      showTime: true
    })
  },

  //地点位置授权判断及选择
  getUserLocation() {
    let that = this
    wx.getSetting({
      success(res) {
        console.log(res.authSetting['scope.userLocation'])
        if (!res.authSetting['scope.userLocation']) { //用authsetting进行授权判断
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
            },
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

  // 项目输入框
  Input_sport(event) {
    // event.detail 为当前输入的值
    this.setData({
      id_sport: event.detail,
    })
  },
  //联系方式输入框
  Input_mess(event) {
    // event.detail 为当前输入的值
    this.setData({
      id_mess: event.detail,
    })
  },
  //备注
  Input_beizhu(event) {
    // event.detail 为当前输入的值
    this.setData({
      beizhu: event.detail,
    })
  },

  //确定按钮事件，提交已填的内容
  Push() {
    let that = this;
    if (that.data.time === "" || that.data.didian === "" || that.data.id_sport === "" || that.data.id_mess === "") {
      Notify({
        text: '备注以外的选项不可为空',
        duration: 1000,
        selector: '#custom-selector',
        backgroundColor: '#1989fa'
      });
    } else {
      wx.showModal({
        content: '发布咯？',
        cancelText: "再瞅瞅",
        confirmText: "要得",
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


  Ntime() {
    let that = this;
    //向数据库传数据
    wx.cloud.callFunction({
      name: "sendsport",
      data: {
        type: "sport",
        touxiang: that.data.touxiang,
        nickname: that.data.nickname,
        Nowtime: that.data.Nowtime,
        time: that.data.time,
        didian: that.data.didian,
        id_sport: that.data.id_sport,
        id_mess: that.data.id_mess,
        beizhu: that.data.beizhu,
        Timestamp: new Date().getTime(),
      },
      success(res) {
        console.log(res);
        wx.cloud.callFunction({
          name: "getoldsport",
          data: {
            currentPage: that.data.currentPage,
            getKind:0
          },
          success(res) {
            let ret = res.result.data
            ret.forEach(element => {
              // console.log(element);
              let interlTime = that.NowDate(element.Timestamp)
              element.interlTime = interlTime
              // console.log(interlTime);
            });

            that.setData({
              arroldsport: res.result.data
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

  //运动动态部分
  //运动删除历史事件
  onDelete(res) {
    console.log(res);
    let index = res.currentTarget.dataset.index
    let arroldsport = this.data.arroldsport
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
          message: '删除咯？',
          closeOnClickOverlay: true,
        }).then(() => {
          console.log('用户点击确定')
          wx.cloud.callFunction({
            name: "delete",
            data: {
              delid: res.currentTarget.dataset.id
            },
            success(res) {
              arroldsport.splice(index, 1)
              that.setData({
                arroldsport,
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

  //上拉加载取回运动数据
  getlistsport() {
    let that = this
    wx.cloud.callFunction({
      name: "getoldsport",
      data: {
        currentPage: that.data.currentPage, //向后端传currentPage
        getKind:0
      },
      success(res) {
        console.log("取到条数了");
        let ret = res.result.data
        ret.forEach(element => {
          // console.log(element);
          let interlTime = that.NowDate(element.Timestamp)
          element.interlTime = interlTime
          // console.log(interlTime);
        });

        let arroldsport = that.data.arroldsport.concat(res.result.data)//连接两个数组
        let length = res.result.data.length
        that.setData({
          arroldsport: arroldsport
        }, () => {
          wx.hideLoading()
        })

        if (length < 10 && res.result.data.length !== 0) {
          that.setData({
            endsport: true,
            loadingsport: false
          })
        }

        //成功后条数判断
        // let listjudgesport = that.data.listsport - 10;
        // if (res.result.data.length > listjudgesport) {
        //   console.log(3)
        //   that.setData({
        //     arroldsport: res.result.data
        //   })
        // }
        // if (res.result.data.length === 0) {
        //   console.log("数据库空");
        //   that.setData({
        //     arroldsport: res.result.data,
        //     endsport: false,
        //     loadingsport: false
        //   })
        // }
        // if (res.result.data.length <= listjudgesport && res.result.data.length !== 0) {
        //   console.log(2)
        //   that.setData({
        //     arroldsport: res.result.data,
        //     endsport: true,
        //     loadingsport: false
        //   })
        // }
      },fail() {
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
    //运动动态部分
    wx.showLoading({
      title: "加载中...",
      mask: true,
    });
    that.getlistsport();
   
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
    // let that = this;
    // //运动动态部分
    // wx.cloud.callFunction({
    //   name: "getoldsport",
    //   data: {
    //     listsport: that.data.listsport
    //   },
    //   success(res) {

    //     that.setData({
    //       arroldsport: res.result.data
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
    //     fail() {
    //       wx.showModal({
    //         title: '提示',
    //         content: '系统错误，请稍后重试',
    //       })
    //     }
    //   })
    // }, 1000)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    let currentPage = this.data.currentPage;

    //运动动态部分
    if (!that.data.endsport) {
      console.log(2)
      this.setData({
        loadingsport: true,
        currentPage:++currentPage
      },()=>{
        this.getlistsport()
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});