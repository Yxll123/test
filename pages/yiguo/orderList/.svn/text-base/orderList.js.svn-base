var app = getApp()
const configParams = require('../../../config')
Page({
  data: {
    current: 0,
    listgoods: [
      // {
      //   "id": "0101001",
      //   "orderStatus": "1",
      //   "totalAmt": "108.80",
      //   "xcxOrderSpuList": [{
      //     "skuId": "10010010010001",
      //     "skuName": "Zespri佳沛新西兰阳光金奇异果6个92-114g/个",
      //     "skuAmt": "111.00",
      //     "skuCnt": "2",
      //     "skuImage": "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg"
      //   }, {
      //     "skuId": "10010010010002",
      //     "skuName": "智利蓝莓2盒（约125g/盒）",
      //     "skuAmt": "177.00",
      //     "skuCnt": "1",
      //     "skuImage": "http://img09.yiguoimg.com/e/ad/2016/161011/585749449909281099_260x320.jpg",
      //   }
      //   ]
      // },
      // {
      //   "id": '0101002',
      //   "orderStatus": "2",
      //   "totalAmt": "198.00",
      //   "xcxOrderSpuList": [{
      //     "skuId": "10010010010003",
      //     "skuName": "澳大利亚脐橙12个约160g/个(北京)",
      //     "skuAmt": "178.00",
      //     "skuCnt": "3",
      //     "skuImage": "http://img12.yiguoimg.com/e/ad/2016/160914/585749449480249646_260x320.jpg"
      //   }]
      // },
      // {
      //   "id": "0101003",
      //   "orderStatus": "3",
      //   "totalAmt": "388.80",
      //   "xcxOrderSpuList": [{
      //     "skuId": "10010010010001",
      //     "skuName": "Zespri佳沛新西兰阳光金奇异果6个92-114g/个",
      //     "skuAmt": "111.00",
      //     "skuCnt": "2",
      //     "skuImage": "http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg"
      //   }, {
      //     "skuId": "10010010010002",
      //     "skuName": "智利蓝莓2盒（约125g/盒）",
      //     "skuAmt": "177.00",
      //     "skuCnt": "1",
      //     "skuImage": "http://img09.yiguoimg.com/e/ad/2016/161011/585749449909281099_260x320.jpg",
      //   }]
      // }
    ]
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var currentTab;
    var orderStatus;
    if (options.current) {
      currentTab = options.current;
    } else {
      currentTab = 0;
    }
    that.setData({
      current: currentTab
    })
    if (currentTab == 1) {
      orderStatus = "-2";
    } else if (currentTab == 2) {
      orderStatus = "0";
    } else if (currentTab == 3) {
      orderStatus = "1";
    } else if (currentTab == 4) {
      orderStatus = "2";
    } else {
      orderStatus = "";
    }
    //ajax请求数据
    wx.request({
      url: configParams.QUERY_ORDERLIST,
      data: {
        userId: wx.getStorageSync("userId"),
        orderStatus: orderStatus
      },
      header: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        that.setData({
          listgoods: res.data.info
        });
      }
    })
  },
  getOrderDetail: function (e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/yiguo/orderDetail/orderDetail?id=' + e.currentTarget.dataset.id,
    })
  },

  gotoPay: function (e) {
    console.log(e.currentTarget.dataset.id);
    console.log(wx.getStorageSync('userId'));
    wx.navigateTo({
      url: '/pages/yiguo/pay/pay?flag=' + '0' +'&orderId=' + e.currentTarget.dataset.id + '&userId=' + wx.getStorageSync('userId'),
    })
  },
  //取消订单
  cancelOrder: function (e) {
    var that = this;
    var orderId = e.currentTarget.dataset.id;
    var currentTab = e.currentTarget.dataset.current;
    console.log("orderId:" + orderId);
    console.log("current:" + currentTab);
    wx.request({
      url: configParams.CANCEL_ORDER,
      data: {
        userId: wx.getStorageSync("userId"),
        id: orderId
      },
      header: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code=="00000") {
          wx.showToast({
            title: '取消成功',
          });
          that.reloadOrderList(currentTab, that);  
        }
      }
    })
  },
  //确认收货
  confirmReceive: function(e) {
    var that = this;
    var orderId = e.currentTarget.dataset.id;
    var currentTab = e.currentTarget.dataset.current;
    console.log("orderId:" + orderId);
    console.log("current:" + currentTab);
    wx.request({
      url: configParams.CONFIRM_RECEIVER,
      data: {
        userId: wx.getStorageSync("userId"),
        id: orderId
      },
      header: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == "00000") {
          wx.showToast({
            title: '确认收货成功',
          });
          that.reloadOrderList(currentTab, that);
        }
      }
    })
  },
  //重新加载订单列表数据
  reloadOrderList: function (currentTab, that) {
    var orderStatus = "";
    if (currentTab == 1) {
      orderStatus = "-2";
    } else if (currentTab == 2) {
      orderStatus = "0";
    } else if (currentTab == 3) {
      orderStatus = "1";
    } else if (currentTab == 4) {
      orderStatus = "2";
    } else {
      orderStatus = "";
    }
    wx.request({
      url: configParams.QUERY_ORDERLIST,
      data: {
        userId: wx.getStorageSync("userId"),
        orderStatus: orderStatus
      },
      header: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        that.setData({
          listgoods: res.data.info
        });
      }
    })
  },
  //详情页跳转
  lookdetail: function (e) {
    var lookid = e.currentTarget.dataset;
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: "/pages/yiguo/detail/detail?id=" + lookid.id
    })
  },
  switchSlider: function (e) {
    var that = this;
    var currentTab = e.target.dataset.index;
    var orderStatus="";
    that.setData({
      current: currentTab
    })
    if (currentTab == 1) {
      orderStatus = "-2";
    } else if (currentTab == 2) {
      orderStatus = "0";
    } else if (currentTab == 3) {
      orderStatus = "1";
    } else if (currentTab == 4){
      orderStatus = "2";
    } else {
      orderStatus = "";
    }
    wx.request({
      url: configParams.QUERY_ORDERLIST,
      data: {
        userId: wx.getStorageSync("userId"),
        orderStatus: orderStatus
      },
      header: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        that.setData({
          listgoods: res.data.info
        });
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }

})
