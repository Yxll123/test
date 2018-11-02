var app = getApp()
const configParams = require('../../../config')
Page({
  data: {
    userInfo: {},
    mine_list: [
      {
        "status": "1",
        "pic_url": "/images/icons/ic_pay.png",
        "title": "待付款",
        "number": ""
      },
      {
        "status": "2",
        "pic_url": "/images/icons/ic_deliver.png",
        "title": "待发货",
        "number": ""
      },
      {
        "status": "3",
        "pic_url": "/images/icons/ic_take.png",
        "title": "待收货",
        "number": ""
      },
      {
        "status": "4",
        "pic_url": "/images/icons/ic_complete.png",
        "title": "已完成",
        "number": ""
      }
    ],
  },
  // 页面初始化 options为页面跳转所带来的参数
  onLoad: function (options) {
  //   var that = this;
  //   //先查询用户是否已经授权获取用户信息
  //   wx.getSetting({
  //     success(setRes) {
  //       if (!setRes.authSetting['scope.userInfo']) {
  //         //如果未授权，则先进行授权
  //         wx.authorize({
  //           scope: 'scope.userInfo',
  //           success() {
  //             //检查登录态，未过期直接获取用户信息，过期先登录再获取用户信息
  //             console.log("授权成功");
  //             that.checkSessionAndGetUserInfo(that);
  //           }
  //         })
  //       } else {
  //         //如果已经授权，则检查登录态、获取用户信息
  //         console.log("已授权");
  //         that.checkSessionAndGetUserInfo(that);
  //       }
  //     }
  //   })
  // },
  // //检查登录态并获取用户信息
  // checkSessionAndGetUserInfo: function (that) {
  //   wx.checkSession({
  //     success: function () {
  //       //登录态未过期，直接获取用户信息
  //       wx.getUserInfo({
  //         success: function (res) {
  //           that.setData({
  //             userInfo: res.userInfo
  //           })
  //         }
  //       })
  //     },
  //     fail: function () {
  //       //登录态已过期，重新登录再获取用户信息
  //       wx.login({
  //         success: function (loginRes) {
  //           console.log(loginRes);
  //           //登录成功，获取用户信息，并调接口更新session_key
  //           wx.getUserInfo({
  //             success: function (res) {
  //               that.setData({
  //                 userInfo: res.userInfo
  //               })
  //             }
  //           });
            // wx.request({
            //   url: 'http://10.108.86.40:7080/eskj_service_dsgj/eskj/fzjy/xcxUserBase/registerUserByWXAuthorization',
            //   data: {
            //     userWxCode: loginRes.code
            //   },
            //   header: {
            //     "Content-Type": "application/json"
            //   },
            //   method: 'POST',
            //   success: function (result) {
            //     console.log(result);
            //     wx.setStorageSync("openId", result.data.info.userWxOpenid);
            //     wx.setStorageSync("userId", result.data.info.id);
            //   }
            // })
    //       }
    //     })
    //   }
    // })
  },
  navigatorToOrder: function (e) {
    console.log(e.currentTarget.dataset.status);
    wx.navigateTo({
      url: '/pages/yiguo/orderList/orderList?current=' + e.currentTarget.dataset.status,
    })
  },
  makePhoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '400-990-5281',
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    //调用接口获取各状态订单的提醒数字
    var that = this;
    var userId = wx.getStorageSync("userId");
    console.log(userId+"======");
    wx.request({
      url: configParams.QUERY_CONER,
      data: {
        userId: wx.getStorageSync("userId")
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      success: function (result) {
        if (result.data.code=="00000") {
          console.log(result);
          var resultInfo = result.data.info;
          that.setData({
            'mine_list[0].number': resultInfo.orderStatusNoPay,
            'mine_list[1].number': resultInfo.orderStatusWaitDelivery,
            'mine_list[2].number': resultInfo.orderStatusWaitReceiver,
            'mine_list[3].number': 0
          })
        }
      }
    })
    

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})