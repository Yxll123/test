const configParams = require('../../../config')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {
      // id: "",
      // name: "",
      // telephone: "",
      // detail: ""
    },
    orderGoodsList: [],//订单商品
    totalMoney: 0,
    totalNum: 0,

    buyerMessage: "",

    invoice: {
      itype: '无',
      name: '',
      no: ''
    },

    orderId:null,
    userId:null,
    flag:'0',
    canTouch:true,
    preMoney: 0,// 立减金额
    lastMoney: 0,// 优惠后金额
    isActivity: '0'//是否有满减活动（0无 1有）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 待付款过来
    if (options.flag == '0') {
      var orderId = options.orderId
      var userId = options.userId
      console.log(options)

      var that = this
      wx.request({
        url: configParams.QUERY_ORDERDETAIL,
        data: {
          userId: userId,
          id: orderId
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (res.data.code == "00000") {
            var data = res.data.info
            that.data.address.id = data.addressId
            that.data.address.name = data.consigneeName
            that.data.address.telephone = data.consigneeMobilePhone
            that.data.address.detail = data.addressProvince + data.addressCity + data.addressArea + data.addressDetailed
            
            if (data.isInvoice == "0") {
              that.data.invoice.itype = '无'
            } else if (data.isInvoice == "1") {
              that.data.invoice.itype = '个人'
            } else if (data.isInvoice == "2") {
              that.data.invoice.itype = '公司'
            }
            that.data.invoice.invoiceName = data.invoiceName
            that.data.invoice.invoiceCode = data.invoiceCode

            var totalNum = 0
            for (var i in data.xcxOrderSpuList) {
              totalNum += data.xcxOrderSpuList[i].skuCnt
            }

            // that.data.preMoney = data.discountAmt
            // that.data.lastMoney = data.payAmt

            that.setData({
              orderId: orderId,
              userId: userId,
              address: that.data.address,
              orderGoodsList: data.xcxOrderSpuList,
              totalMoney: Number(data.totalAmt),
              totalNum: totalNum,
              buyerMessage: data.orderRemarks,
              invoice: that.data.invoice,
              flag: options.flag,
              preMoney: Number(data.discountAmt),
              lastMoney:Number(data.payAmt),
              isActivity: app.globalData.isActivity
            })
          }
        },
        fail: function (res) {

        }
      })

    } else if (options.flag == '1') {
      // 提交订单页面过来
      this.setData({
        orderId: options.orderId,
        userId: options.userId,
        address: JSON.parse(options.address),
        orderGoodsList: JSON.parse(options.orderGoodsList),
        totalMoney: Number(options.totalMoney),
        totalNum: options.totalNum,
        preMoney: Number(options.preMoney),
        lastMoney: Number(options.lastMoney),
        buyerMessage: options.buyerMessage,
        invoice: JSON.parse(options.invoice),
        flag: options.flag,
        isActivity: app.globalData.isActivity
      })
    }
  },
  onUnload:function() {
    // var that = this

    // if(this.data.flag == '1') {
    //   //判断页面栈里面的页面数是否大于2
    //   if (getCurrentPages().length > 2) {
    //     //获取页面栈
    //     let pages = getCurrentPages()
    //     //给上一个页面设置状态
    //     let curPage = pages[pages.length - 2];
    //     curPage.setData({
    //       'isBack': true
    //     });
    //   }
    // }
  },
  pay:function(e) {
    if (!this.data.canTouch) {
      return
    } else {
      this.data.canTouch = false
    }

    var that = this
    wx.request({
      url: configParams.PAY_ORDER,
      data: {
        userId: that.data.userId,
        id: that.data.orderId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        
        if (res.data.code == "00000") {
          var data = res.data.info
          wx.requestPayment({
            timeStamp: data.timeStamp,
            nonceStr: data.nonce_str,
            package: 'prepay_id=' + data.prepay_id,
            signType: data.signType,
            paySign: data.paySign,
            success: function(res) {
              console.log("支付成功")
              wx.switchTab({
                url: '../mine/mine'
              })
              console.log(res)
            },
            fail: function(res) {
              console.log("支付失败：")
              console.log(res)
              wx.showToast({
                title: '支付失败',
                icon: 'none',
                duration: 2000,
                mask: true,
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
            },
            complete: function (res) {
              console.log("支付完成")
              that.data.canTouch = true
            }
          })
        }
      },
      fail: function(res) {
        that.data.canTouch = true
        console.log("fail")
        console.log(res)
      }
    })
  }
})