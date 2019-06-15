// pages/card/page_card.js

Page({
  /**
   * 页面的初始数据
   */
  data: {

    tabnum: 0, //tab索引

    activeNames: ['1'], //折叠面板
    border: false, //禁用折叠面板内/外边框

    //拼车发布上传内容
    touxiang: '', //头像
    nickname: "", //昵称

    time: '', //选择的时间 
    qidian: '', //起点
    zhongdian: '', //终点
    id_mess: '', //联系方式
    beizhu: '', //备注
    Timestamp: "", //时间戳 用于排序

    arroldcar: [], //后端回调的历史数组
    arroldsport: [], //后端回调的历史数组
    arroldstudy: [], //后端回调的历史数组
    arroldcustomize: [], //后端回调的历史数组
    delid: "", //封装完上传到后端需要删除的id
    isCarShow: false,

    loadingcar: false, //加载图标
    endcar: false, //到底文字，无更多条数时激活
    // listcar: 10, //拼车初始取回条数

    loadingsport: false, //加载图标
    endsport: false, //到底文字，无更多条数时激活
    // listsport: 10, //运动初始取回条数

    loadingstudy: false, //加载图标
    endstudy: false, //到底文字，无更多条数时激活
    // liststudy: 10, //学习初始取回条数

    loadingcus: false, //加载图标
    endcus: false, //到底文字，无更多条数时激活
    // listcus: 10, //自定义初始取回条数
    currentPage: 0, // 取数据时的倍数

    getKind: Number, //后端决定渲染个人或者所有人的参数

  },

  turnTo() {
    wx.navigateTo({
      url: '../search/page_search'
    });
  },

  //切换标签
  changetab(res) {
    console.log("标签已切换")

    let that = this;
    this.setData({
      tabnum: res.detail.index,
      currentPage: 0,
      endcar:false
    })
    // if (this.data.tabnum === 0) {
    //   wx.cloud.callFunction({
    //     name: "getoldcar",
    //     data: {
    //       currentPage: that.data.currentPage
    //     },
    //     success(res) {
    //       that.setData({
    //         arroldcar: res.result.data,
    //       })
    //     },
    //   })
    // }
    if (this.data.tabnum === 0) {
      wx.cloud.callFunction({
        name: "getoldcar",
        data: {
          currentPage: that.data.currentPage,
          getKind: 1
        },
        success(res) {
          let ret = res.result.data
          ret.forEach(element => {
            let interlTime = that.NowDate(element.Timestamp)
            element.interlTime = interlTime
          });
          that.setData({
                  arroldcar: res.result.data,
                }, () => {
                  wx.hideLoading();

    console.log(that.data.currentPage);
                })
        }, fail() {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '加载错误，请刷新重试',
          })
        }
      })
    }
    if (this.data.tabnum === 1) {
      wx.showLoading({
        title: "加载中...",
        mask: true,
      });
      
      this.getlistsport()
    }

    if (this.data.tabnum === 2) {
      wx.showLoading({
        title: "加载中...",
        mask: true,
      });
      this.getliststudy()
    }

    if (this.data.tabnum === 3) {
      wx.showLoading({
        title: "加载中...",
        mask: true,
      });
      this.getlistcus()
    }
  },


  // 折叠面板
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
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


  //上拉加载取回拼车数据
  getlistcar() {
    let that = this
    wx.cloud.callFunction({
      name: "getoldcar",
      data: {
        // listcar: that.data.listcar //向后端传listcar
        currentPage: that.data.currentPage,
        getKind: 1
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

        let arroldcar = that.data.arroldcar.concat(res.result.data); //连接两个数组
        let length = res.result.data.length;
        that.setData({
          arroldcar: arroldcar,
        }, () => {
          wx.hideLoading();
          wx.stopPullDownRefresh();
        })

        if (length < 10 && res.result.data.length !== 0) {
          that.setData({
            loadingcar: false,
            endcar: true,

          })
        }

        //成功后条数判断
        // let listjudgecar = that.data.listcar - 10;
        // if (res.result.data.length > listjudgecar) {
        //   console.log(3)
        //   that.setData({
        //     arroldcar: res.result.data
        //   })
        // }
        // if (res.result.data.length === 0) {
        //   console.log(2)
        //   that.setData({
        //     arroldcar: res.result.data,
        //     endcar: false,
        //     loadingcar: false
        //   })
        // }
        // if (res.result.data.length <= listjudgecar && res.result.data.length !== 0) {
        //   console.log(2)
        //   that.setData({
        //     arroldcar: res.result.data,
        //     endcar: true,
        //     loadingcar: false
        //   })
        // }
      },
      fail() {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        wx.showModal({
          title: '提示',
          content: '加载错误，请刷新重试',
        })
      }
    })
  },

  //上拉加载取回运动数据
  getlistsport() {
    let that = this
    wx.cloud.callFunction({
      name: "getoldsport",
      data: {
        currentPage: that.data.currentPage, //向后端传currentPage
        getKind: 1
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

        let arroldsport = that.data.arroldsport.concat(res.result.data);
        let length = res.result.data.length;

        that.setData({
          arroldsport: arroldsport,
        }, () => {
          wx.hideLoading();
          wx.stopPullDownRefresh();
        })

        if (length < 10 && res.result.data.length !== 0) {
          that.setData({
            loadingsport: false,
            endsport: true
          })
        }
      },
      fail() {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        wx.showModal({
          title: '提示',
          content: '加载错误，请刷新重试',
        })
      }
    })
  },

  //加载取回学习数据
  getliststudy() {
    let that = this
    wx.cloud.callFunction({
      name: "getoldstudy",
      data: {
        // liststudy: that.data.liststudy //向后端传liststudy
        currentPage: that.data.currentPage,
        getKind: 1
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

        let arroldstudy = that.data.arroldstudy.concat(res.result.data);
        let length = res.result.data.length;

        that.setData({
          arroldstudy: arroldstudy,
        }, () => {
          wx.hideLoading();
          wx.stopPullDownRefresh();
        })

        if (length < 10 && res.result.data.length !== 0) {
          that.setData({
            loadingstudy: false,
            endstudy: true
          })
        }
      },
      fail() {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        wx.showModal({
          title: '提示',
          content: '加载错误，请刷新重试',
        })
      }
    })
  },

  //取回自定义数据
  getlistcus() {
    let that = this
    wx.cloud.callFunction({
      name: "getoldcustom",
      data: {
        currentPage: that.data.currentPage, //向后端传currentPage
        getKind: 1
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

        let arroldcustomize = that.data.arroldcustomize.concat(res.result.data) //连接两个数组
        let length = res.result.data.length
        that.setData({
          arroldcustomize: arroldcustomize
        }, () => {
          wx.hideLoading();
          wx.stopPullDownRefresh();
        })

        if (length < 10 && res.result.data.length !== 0) {
          that.setData({
            endcus: true,
            loadingcus: false
          })
        }
      },
      fail() {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        wx.showModal({
          title: '提示',
          content: '加载错误，请刷新重试',
        })
      }
    })
  },

  //调用授权判断
  hislogin() {
    let that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          console.log("weishouquan");
          that.tologin() //用户如果没授权，则进入login登陆界面
        } else {
          console.log("yishouquan");
          that.checkStorage() //已授权，调用check
        }
      }
    })
  },

  //检测缓存
  checkStorage() {
    let that = this
    wx.getStorage({
      key: 'key',
      success(res) {
        console.log("yicheckhuoqu");
      },
      fail(res) {
        wx.getUserInfo({
          success(res) {
            wx.setStorage({
              key: 'key',
              data: {
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl
              },
              success(res) {
                console.log("cunchuwancheng")
              },
              fail() {}
            })
          },
          fail() {}
        })
      }
    })
  },

  //去登陆页面
  tologin() {
    wx.reLaunch({
      url: '/pages/login/login'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //页面加载过程中调用函数进行授权判断
    that.hislogin();

    // //加载logo
    // wx.showLoading({
    //   title: "加载中...",
    //   mask: true,
    // });
    // that.getlistcar();

    // //经过500毫秒后加载图标
    // setTimeout(() => {
    //   //加载logo
    // wx.showToast({
    //   title: "加载中...",
    //   icon: "loading",
    //   mask:true,
    // });
    // }, 500)

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
    let that = this;
    //加载logo
    wx.showLoading({
      title: "加载中...",
      mask: true,
    });
    that.setData({
      currentPage:0,
      endcar:false,
      endsport:false,
      endstudy:false,
      endcus:false
    })
    if (this.data.tabnum === 0) {
      wx.cloud.callFunction({
        name: "getoldcar",
        data: {
          currentPage: that.data.currentPage,
          getKind: 1
        },
        success(res) {
          let ret = res.result.data
          ret.forEach(element => {
            let interlTime = that.NowDate(element.Timestamp)
            element.interlTime = interlTime
          });
          that.setData({
                  arroldcar: res.result.data,
                }, () => {
                  wx.hideLoading();

    console.log(that.data.currentPage);
                })
        }, fail() {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '加载错误，请刷新重试',
          })
        }
      })
    }
    if (this.data.tabnum === 1) {
      wx.cloud.callFunction({
        name: "getoldsport",
        data: {
          currentPage: that.data.currentPage,
          getKind: 1
        },
        success(res) {
          let ret = res.result.data
          ret.forEach(element => {
            let interlTime = that.NowDate(element.Timestamp)
            element.interlTime = interlTime
          });
          that.setData({
                  arroldsport: res.result.data,
                }, () => {
                  wx.hideLoading();

    console.log(that.data.currentPage);
                })
        }, fail() {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '加载错误，请刷新重试',
          })
        }
      })
    }
    if (this.data.tabnum === 2) {
      wx.cloud.callFunction({
        name: "getoldstudy",
        data: {
          currentPage: that.data.currentPage,
          getKind: 1
        },
        success(res) {
          let ret = res.result.data
          ret.forEach(element => {
            let interlTime = that.NowDate(element.Timestamp)
            element.interlTime = interlTime
          });
          that.setData({
                  arroldstudy: res.result.data,
                }, () => {
                  wx.hideLoading();

    console.log(that.data.currentPage);
                })
        }, fail() {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '加载错误，请刷新重试',
          })
        }
      })
    }
    if (this.data.tabnum === 3) {
      wx.cloud.callFunction({
        name: "getoldcustom",
        data: {
          currentPage: that.data.currentPage,
          getKind: 1
        },
        success(res) {
          let ret = res.result.data
          ret.forEach(element => {
            let interlTime = that.NowDate(element.Timestamp)
            element.interlTime = interlTime
          });
          that.setData({
                  arroldcustomize: res.result.data,
                }, () => {
                  wx.hideLoading();

    console.log(that.data.currentPage);
                })
        }, fail() {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '加载错误，请刷新重试',
          })
        }
      })
    }
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
    if (this.data.tabnum === 0) {
      wx.cloud.callFunction({
        name: "getoldcar",
        data: {
          currentPage: that.data.currentPage,
          getKind: 1
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
            arroldcar: res.result.data,
          },() => {
            wx.stopPullDownRefresh();
          })
        },
      })
    }

    if (this.data.tabnum === 1) {
      console.log(1);
      wx.cloud.callFunction({
        name: "getoldsport",
        data: {
          currentPage: that.data.currentPage,
          getKind: 1
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
          },() => {
            wx.stopPullDownRefresh();
          })
        },
      })
    }
    if (this.data.tabnum === 2) {
      console.log(2);
      wx.cloud.callFunction({
        name: "getoldstudy",
        data: {
          currentPage: that.data.currentPage,
          getKind: 1
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
          }, () => {
            wx.stopPullDownRefresh();
          })
        },
      })
    }
    if (this.data.tabnum === 3) {
      wx.cloud.callFunction({
        name: 'getoldcustom',
        data: {
          currentPage: that.data.currentPage,
          getKind: 1
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
            arroldcustomize: res.result.data
          },() => {
            wx.stopPullDownRefresh();
          })
        }
      })
    }

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
    console.log(this.data.currentPage)
    let that = this;
    let currentPage = this.data.currentPage

    console.log("触底了");
    if (this.data.tabnum === 0) {
      console.log(that.data.currentPage);
      if (!that.data.endcar) {
        that.setData({
          loadingcar: true,
          currentPage: ++currentPage
        }, () => {
          this.getlistcar()
        })
      }
    }

    if (this.data.tabnum === 1) {
      console.log(that.data.currentPage);
      if (!that.data.endsport) {
        this.setData({
          loadingsport: true,
          currentPage: ++currentPage
        }, () => {
          this.getlistsport()
        })
      }
    }
    if (this.data.tabnum === 2) {
      console.log(that.data.currentPage);
      if (!that.data.endstudy) {
        that.setData({
          loadingstudy: true,
          currentPage: ++currentPage
        }, () => {
          this.getliststudy();
        })
      }
    }
    if (this.data.tabnum === 3) {
      console.log(that.data.currentPage);
      if (!that.data.endcus) {
        this.setData({
          loadingcus: true,
          currentPage: ++currentPage
        }, () => {
          this.getlistcus();
        })
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})