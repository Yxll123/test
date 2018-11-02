// pages/yiguo/submit/submit.js
var app = getApp()
const configParams = require('../../../config')
const util = require('../../../utils/util.js');


// 计算商铺满减
function calculateDiscount(that, isActivity, actRange, actIntensity) {
  if (isActivity == '1' && actRange.length > 0, actIntensity.length > 0) {

    for (var i = actRange.length - 1; i >= 0; i--) {
      if (that.data.totalMoney >= Number(actRange[i])) {
        that.data.preMoney = Number(actIntensity[i])
        that.data.lastMoney = that.data.totalMoney - that.data.preMoney
        return
      }
    }
    that.data.preMoney = 0
    that.data.lastMoney = that.data.totalMoney
  } else {
    that.data.preMoney = 0
    that.data.lastMoney = that.data.totalMoney
  }
}

Page({
  data: {
    orderGoodsList: [],//订单商品
    totalMoney: 0,
    
    address: {
      id: "",
      name: "",
      telephone: "",
      detail: ""
    },
    
    
    totalNum: 0,

    buyerMessage: "",

    invoice: {
      itype: '无',
      name: '',
      no: ''
    },

    lastCart:[],//剩余购物车商品
    isBack:false,//是否返回上一层
    flag:'1',//0从购物车跳来,1立即购买跳来
    canTouch:true,
    preMoney: 0,// 立减金额
    lastMoney: 0,// 优惠后金额
    isActivity: '0'//是否有满减活动（0无 1有）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    console.log(JSON.parse(options.goods));
    console.log(options.totalMoney)

    this.setData({
      orderGoodsList: JSON.parse(options.goods),
      totalMoney: options.totalMoney
    })

    var that = this
    wx.request({
      url: configParams.QUERY_DEFAULT_ADDRESS,
      data: {
        userId: app.globalData.userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        if (res.data.code == "00000") {
          var data = res.data.info
          that.data.address.id = data.id
          that.data.address.name = data.consigneeName
          that.data.address.telephone = data.consigneeMobilePhone
          that.data.address.detail = data.addressProvince + data.addressCity + data.addressArea + data.addressDatailed

          that.setData({
            address: that.data.address
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // if(this.data.isBack) {
    //   wx.navigateBack({
    //     delta: 1,
    //   })
    // }
  },
  // 发票抬头
  invoiceChange: function () {
    wx.navigateTo({
      url: "../invoice/invoice?itype=" + this.data.invoice.itype + "&name=" + this.data.invoice.name + "&no=" + this.data.invoice.no,
    })
  },
  submitOrder: function (e) {
    if (this.data.address.id == "") {
      wx.showToast({
        title: '请添加收货地址',
        icon: 'none',
        duration: 1000,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      return
    }

    if (!this.data.canTouch) {
      return
    } else {
      this.data.canTouch = false
    }

    wx.showToast({
      title: '数据提交中',
      icon: 'loading',
      duration: 10000,
      mask: true,
    })

    var that = this
    var userId = app.globalData.userId
    let xcxOrderSpuList = []
    for (var i in this.data.orderGoodsList) {
      var good = {}
      good.spuId = that.data.orderGoodsList[i].spuId
      good.skuId = that.data.orderGoodsList[i].id
      good.spuName = that.data.orderGoodsList[i].spuName
      good.skuName = that.data.orderGoodsList[i].skuName
      good.skuCnt = that.data.orderGoodsList[i].buyNum
      good.skuAmt = that.data.orderGoodsList[i].skuShopPrice
      good.skuImage = that.data.orderGoodsList[i].imgUrl
      xcxOrderSpuList.push(good)
    }

    var isInvoice = ''
    var invoiceName = ''
    var invoiceCode = ''
    if (this.data.invoice.itype == "无") {
      isInvoice = '0'
    } else if (this.data.invoice.itype == "个人") {
      isInvoice = '1'
      invoiceName = this.data.invoice.name
      invoiceCode = ''
    } else if (this.data.invoice.itype == "公司") {
      isInvoice = '2'
      invoiceName = this.data.invoice.name
      invoiceCode = this.data.invoice.no
    }

    var message = that.data.buyerMessage
    console.log(message)
    if(util.utf16toEntities(message)){
      that.data.canTouch = true
      return
    }

    wx.request({
      url: configParams.ADD_ORDER,
      data: {
        userId: userId,
        totalCnt: that.data.orderGoodsList.length,
        totalAmt: that.data.totalMoney,
        isDiscount: app.globalData.isActivity,
        discountAmt: that.data.preMoney,
        payAmt: that.data.lastMoney,
        isInvoice: isInvoice,
        invoiceName: invoiceName,
        invoiceCode: invoiceCode,
        addressId: that.data.address.id,
        orderRemarks: message,
        xcxOrderSpuList: xcxOrderSpuList
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        if(res.data.code == "00000"){
          var id = res.data.info.id

          if (that.data.flag == '0') {
            try {
              console.log("重置购物车")
              wx.setStorageSync('cart', that.data.lastCart)
            } catch (e) {
              console.log(e)
            }
          }

          wx.redirectTo({
            url: '../pay/pay?flag=' + '1' + '&orderId=' + id + '&userId=' + userId + '&address=' + JSON.stringify(that.data.address) + '&orderGoodsList=' + JSON.stringify(xcxOrderSpuList) + '&totalMoney=' + that.data.totalMoney + '&totalNum=' + that.data.totalNum + '&buyerMessage=' + that.data.buyerMessage + '&invoice=' + JSON.stringify(that.data.invoice) + '&preMoney=' + that.data.preMoney + '&lastMoney=' + that.data.lastMoney
          })
        }
      },
      fail: function (res) { },
      complete: function (res) {
        that.data.canTouch = true
      },
    })
  },
  buyerInput: function (e) {
    // console.log(this.data.buyerMessage)
    // 输入框聚焦
    this.setData({
      buyerMessage: e.detail.value
    })
    console.log(this.data.buyerMessage)
  }
})