var app = getApp()
const configParams = require('../../../config')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //收货人姓名
    consigneeName: "",
    //收货人电话
    consigneeMobilePhone: "",
    //收货人地址
    consigneeAddress: "",
    //买家留言
    orderRemarks: "",
    //发票类型
    invoiceType: "",
    //发票抬头
    invoiceName: "",
    //发票纳税人识别号
    invoiceCode: "",
    //订单原价
    totalAmt: "",
    //是否优惠标志
    isDisCount: "",
    //实际支付价格
    payAmt: "",
    //折扣价格
    discountAmt: "",
    //订单商品数
    totalCnt: "",
    //订单状态
    orderStatus: "",
    //下单时间
    createDate: "",
    //快递类型
    expressType: "",
    //快递单号
    expressCode: "",
    //商品列表
    goodsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var orderId = options.id;
    console.log(orderId);
    wx.request({
      url: configParams.QUERY_ORDERDETAIL,
      data: {
        userId: wx.getStorageSync("userId"),
        id: orderId
      },
      header: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        if (res.data.code == "00000") {
          var orderInfo = res.data.info;
          that.setData({
            id: orderInfo.id,
            consigneeName: orderInfo.consigneeName,
            consigneeMobilePhone: orderInfo.consigneeMobilePhone,
            consigneeAddress: orderInfo.addressProvince + orderInfo.addressCity + orderInfo.addressArea + orderInfo.addressDetailed,
            orderRemarks: orderInfo.orderRemarks,
            invoiceType: orderInfo.isInvoice,
            invoiceName: orderInfo.invoiceName,
            invoiceCode: orderInfo.invoiceCode,
            totalAmt: orderInfo.totalAmt,
            isDiscount: orderInfo.isDiscount,
            payAmt: orderInfo.payAmt,
            discountAmt: orderInfo.discountAmt,
            totalCnt: orderInfo.totalCnt,
            orderStatus: orderInfo.orderStatus,
            createDate: orderInfo.createDate,
            expressType: orderInfo.expressType,
            expressCode: orderInfo.expressCode,
            goodsList: orderInfo.xcxOrderSpuList
          })
        }
      }
    })
  },
  //去支付
  gotoPay: function (e) {
    console.log(e.currentTarget.dataset.id);
    console.log(wx.getStorageSync('userId'));
    wx.navigateTo({
      url: '/pages/yiguo/pay/pay?flag=' + '0' + '&orderId=' + e.currentTarget.dataset.id + '&userId=' + wx.getStorageSync('userId'),
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
        if (res.data.code == "00000") {
          wx.showToast({
            title: '取消成功',
          });
          that.setData({
            orderStatus: "-1"
          });
        }
      }
    })
  },
  //确认收货
  confirmReceive: function (e) {
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
          that.setData({
            orderStatus: "2"
          });
        }
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
})