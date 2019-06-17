// pages/car/page_car.js
//学习发布部分
import Notify from '../../vant-weapp/dist/notify/notify';//信息填充不完整提示

//学习动态部分
import Dialog from '../../vant-weapp/dist/dialog/dialog'; //删除确认弹窗

Page({
  data: {
    //学习发布部分
    // 时间选择
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2029, 11, 1).getTime(),
    currentDate: new Date().getTime(),

    showTime: false,//时间选择器默认

    //学习发布上传内容
    touxiang: "",//头像
    nickname: "",//昵称
    time: '',//选择活动时间
    didian_study: '',//学习地点
    id_study: '',//学习项目
    id_mess: '',//联系方式
    beizhu: '',//备注
    Timestamp: "",//时间戳

    //学习动态部分
    arroldstudy: [],//后端回调学习历史数组
    delid: "", //封装完上传到后端需要删除的id
    isCarShow: false,

    loadingstudy: false, //加载图标
    endstudy: false, //到底文字，无更多条数时激活
    currentPage: 0, // 取数据时的倍数
    // liststudy: 10, //学习初始取回条数

    getKind: 0
  },

  //学习发布部分
  //按钮点击显示时间选择器
  onTap() {
    this.setData({
      showTime: true
    })
  },

  // 学习地点
  Location_study(event) {
    // event.detail 为当前输入的值
    this.setData({
      didian_study: event.detail,
    })
  },

  //学习项目
  Input_study(event) {
    // event.detail 为当前输入的值
    this.setData({
      id_study: event.detail,
    })
  },
  //联系方式
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

  Push() {
    let that = this;
    if (that.data.time === "" || that.data.didian_study === "" || that.data.id_study === "" || that.data.id_mess === "") {
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
          wx.showToast({
            title: '系统错误，请稍后重试!',
            duration: 1000
          })
        }
      })
    }
  },

  //时间相关
  Ntime() {
    let that = this;
    //向数据库传数据
    wx.cloud.callFunction({
      name: 'sendstudy',
      data: {
        type: 'study',
        touxiang: that.data.touxiang,
        nickname: that.data.nickname,
        Nowtime: that.data.Nowtime,
        time: that.data.time,
        didian_study: that.data.didian_study,
        id_study: that.data.id_study,
        id_mess: that.data.id_mess,
        beizhu: that.data.beizhu,
        Timestamp: new Date().getTime(),
      },
      success(res) {
        wx.cloud.callFunction({
          name: "getoldstudy",
          data: {
            currentPage: that.data.currentPage,
            getKind: 0
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
              arroldstudy: res.result.data
            })
          },
        })
      },
      fail() {
        wx.showToast({
          title: '系统错误，请稍后重试!',
          duration: 1000
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

  // 关闭时间选择器
  onClose() {
    this.setData({
      showTime: false,
    });
  },

  //  转换已选取的时间戳，
  onInput(event) {

    if (event.type == 'input') { return }
    else {
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
    }
  },

  //学习动态部分
  //学习删除历史部分
  onDelete(res) {
    console.log(res);
    let index = res.currentTarget.dataset.index
    let arroldstudy = this.data.arroldstudy
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
              arroldstudy.splice(index, 1)
              that.setData({
                arroldstudy,
              })
              wx.showToast({
                title: '完成',
                icon: 'success',
                duration: 1500,
              });
              instance.close();
            },
            fail() {
              wx.showToast({
                title: '系统错误，请稍后重试!',
                duration: 1000
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

  getliststudy() {
    let that = this
    wx.cloud.callFunction({
      name: "getoldstudy",
      data: {
        currentPage: that.data.currentPage, //向后端传currentPage
        getKind: 0
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

        let arroldstudy = that.data.arroldstudy.concat(res.result.data)//连接两个数组
        let length = res.result.data.length
        that.setData({
          arroldstudy: arroldstudy
        }, () => {
          wx.hideLoading()
        })

        if (length < 10 && res.result.data.length !== 0) {
          that.setData({
            endstudy: true,
            loadingstudy: false
          })
        }



        //成功后条数判断
        // let listjudgestudy = that.data.liststudy - 10;
        // if (res.result.data.length > listjudgestudy) {
        //   console.log(3)
        //   that.setData({
        //     arroldstudy: res.result.data
        //   })
        // }
        // if (res.result.data.length === 0) {
        //   console.log("数据库空");
        //   that.setData({
        //     arroldstudy: res.result.data,
        //     endstudy: false,
        //     loadingstudy: false
        //   })
        // }
        // if (res.result.data.length <= listjudgestudy && res.result.data.length !== 0) {
        //   console.log(2)
        //   that.setData({
        //     arroldstudy: res.result.data,
        //     endstudy: true,
        //     loadingstudy: false
        //   })
        // }
      }, fail() {
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //加载logo
    wx.showLoading({
      title: "加载中...",
      mask: true,
    })
    //学习动态部分
    that.getliststudy();

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

    // //学习动态部分
    // wx.cloud.callFunction({
    //   name: "getoldstudy",
    //   data: {
    //     liststudy: that.data.liststudy
    //   },
    //   success(res) {
    //     that.setData({
    //       arroldstudy: res.result.data
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
  onReachBottom: function () {
    let that = this;
    let currentPage = this.data.currentPage
    //学习动态部分
    if (!that.data.endstudy) {
      console.log(1)
      that.setData({
        loadingstudy: true,
        currentPage: ++currentPage
      }, () => {
        this.getliststudy();
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});