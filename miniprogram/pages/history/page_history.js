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
    Nowtime: '', //发布时间
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

  },

  //切换标签
  changetab(res) {
    console.log(typeof (res.detail.index))
    this.setData({
      tabnum: res.detail.index
    })
  },

  // 折叠面板
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  //上拉加载取回拼车数据
  getlistcar() {
    let that = this
    wx.cloud.callFunction({
      name: "getoldcar",
      data: {
        // listcar: that.data.listcar //向后端传listcar
        currentPage: that.data.currentPage
      },
      success(res) {
        console.log("取到条数了");
        let arroldcar = that.data.arroldcar.concat(res.result.data); //连接两个数组
        let length = res.result.data.length;
        that.setData({
          arroldcar: arroldcar,
        }, () => {
          wx.hideLoading()
        })

        if (length < 10) {
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
      },fail() {
        wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '加载错误，请稍后重试',
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
        currentPage: that.data.currentPage //向后端传currentPage
      },
      success(res) {
        console.log("取到条数了");
let arroldsport = this.data.arroldsport.concat(res.result.data);
let length = res.result.data.length;

that.setData({
  arroldsport:arroldsport,
})

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
      },
    })
  },

  //加载取回学习数据
  getliststudy() {
    let that = this
    wx.cloud.callFunction({
      name: "getoldstudy",
      data: {
        liststudy: that.data.liststudy //向后端传liststudy
      },
      success(res) {
        console.log("取到条数了");
        //成功后条数判断
        let listjudgestudy = that.data.liststudy - 10;
        if (res.result.data.length > listjudgestudy) {
          console.log(3)
          that.setData({
            arroldstudy: res.result.data
          })
        }
        if (res.result.data.length === 0) {
          console.log("数据库空");
          that.setData({
            arroldstudy: res.result.data,
            endstudy: false,
            loadingstudy: false
          })
        }
        if (res.result.data.length <= listjudgestudy && res.result.data.length !== 0) {
          console.log(2)
          that.setData({
            arroldstudy: res.result.data,
            endstudy: true,
            loadingstudy: false
          })
        }
      },
    })
  },

  //取回自定义数据
  getlistcus() {
    let that = this
    wx.cloud.callFunction({
      name: "getoldcustom",
      data: {
        listcus: that.data.listcus //向后端传listcus
      },
      success(res) {
        console.log("取到条数了");
        //成功后条数判断
        let listjudgecus = that.data.listcus - 10;
        if (res.result.data.length > listjudgecus) {
          console.log(3)
          that.setData({
            arroldcustomize: res.result.data
          })
        }
        if (res.result.data.length === 0) {
          console.log(2)
          that.setData({
            arroldcustomize: res.result.data,
            endcus: false,
            loadingcus: false
          })
        }
        if (res.result.data.length <= listjudgecus && res.result.data.length !== 0) {
          console.log(2)
          that.setData({
            arroldcustomize: res.result.data,
            endcus: true,
            loadingcus: false
          })
        }
      },
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
    //每次页面加载过程中调取数据并封装

    if(this.data.tabnum === 0){
      wx.cloud.callFunction({
        name: "getoldcar",
        data: {
          currentPage: that.data.currentPage
        },
        success(res) {
          that.setData({
            arroldcar: res.result.data,
          })
        },
      })
    }
    
if(this.data.tabnum === 1){
  
}
    // wx.cloud.callFunction({
    //   name: "getoldsport",
    //   data: {
    //     // listsport: that.data.listsport
    //   },
    //   success(res) {
    //     that.setData({
    //       arroldsport: res.result.data
    //     })
    //   },
    // })

    // wx.cloud.callFunction({
    //   name: "getoldstudy",
    //   data: {
    //     // liststudy: that.data.liststudy
    //   },
    //   success(res) {
    //     that.setData({
    //       arroldstudy: res.result.data
    //     })
    //   }
    // })

    // wx.cloud.callFunction({
    //   name: 'getoldcustom',
    //   data: {
    //     // listcus: that.data.listcus
    //   },
    //   success(res) {
    //     that.setData({
    //       arroldcustomize: res.result.data
    //     })
    //   }
    // })
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
      name: "getoldcar",
      data: {
        // listcar: that.data.listcar
      },
      success(res) {
        that.setData({
          arroldcar: res.result.data
        })
      },
    })

    wx.cloud.callFunction({
      name: "getoldsport",
      data: {
        // listsport: that.data.listsport
      },
      success(res) {
        that.setData({
          arroldsport: res.result.data
        })
      },
    })

    wx.cloud.callFunction({
      name: "getoldstudy",
      data: {
        // liststudy: that.data.liststudy
      },
      success(res) {
        that.setData({
          arroldstudy: res.result.data
        })
      },
    })

    wx.cloud.callFunction({
      name: "getoldcustom",
      data: {
        // listcus: that.data.listcus
      },
      success(res) {
        that.setData({
          arroldcustomize: res.result.data
        })
      },
    })

    setTimeout(() => {
      wx.stopPullDownRefresh({
        success(res) {
          console.log(1)
        },
      })
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    let currentPage = this.data.currentPage

    console.log("触底了");
    if (this.data.tabnum === 0) {
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
      if (!that.data.endsport) {
        console.log(this.data.listsport)
        console.log(2)
        that.setData({
          loadingsport: true,
          listsport: that.data.listsport + 10
        })
        setTimeout(() => {
          that.getlistsport();
        }, 500);
      }
    }
    if (this.data.tabnum === 2) {
      if (!that.data.endstudy) {
        console.log(this.data.liststudy)
        console.log(1)
        that.setData({
          loadingstudy: true,
          liststudy: that.data.liststudy + 10
        })
        setTimeout(() => {
          that.getliststudy();
        }, 500);
      }
    }
    if (this.data.tabnum === 3) {
      if (!that.data.endcus) {
        console.log(this.data.listcus)
        console.log(1)
        that.setData({
          loadingcus: true,
          listcus: that.data.listcus + 10
        })
        setTimeout(() => {
          that.getlistcus();
        }, 500);
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})