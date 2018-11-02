// pages/yiguo/saleTime/saleTime.js
var app = getApp()
const configParams = require('../../../config')
const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: "抢购进行中",
    h: "00",
    m: "00",
    s: "00"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onLoad: function () {
    var that = this;
    var leftTime = (new Date(2018, 5 - 1, 7, 10, 22, 20)) - (new Date()); //计算剩余的毫秒数
    if (leftTime > 0) {
      this.data.intervarID = setInterval(function () {
        leftTime = (new Date(2018, 5 - 1, 7, 10, 22, 20)) - (new Date()); //计算剩余的毫秒数
        var hours = parseInt(leftTime / 1000 / 60 / 60, 10); //计算剩余的小时
        var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
        var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        that.setData({
          h: hours,
          m: minutes,
          s: seconds
        })
        if (leftTime <= 0) {
          clearInterval(that.data.intervarID);
        }
      }, 1000
      )
      function checkTime(i) { //将0-9的数字前面加上0，例1变为01
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
    }

    // 下拉刷新单独写调用接口，不能使用此方法
    var that = this
    // 调后台接口，获取首页数据
    wx.request({
      url: configParams.HOME_GOODS_URL,
      data: {
        skuType: "0"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log("=============首页商品==============")
        console.log(res)
        if (res.data.code == "00000") {
          that.data.hotGoods = []

          let actGoods = []
          let noActGoods = []

          var data = res.data.info
          for (var i = 0; i < data.length; i++) {
            var xcxSpuSkuList = data[i].xcxSpuSkuList
            for (var j = 0; j < xcxSpuSkuList.length; j++) {
              xcxSpuSkuList[j]["spuName"] = data[i].spuName
              var imageList = xcxSpuSkuList[j].xcxImageBaseSkuBaseList
              if (imageList != null && imageList.length > 0) {
                xcxSpuSkuList[j].imgUrl = imageList[0].imageUrl
              }

              var actList = xcxSpuSkuList[j].xcxSkuActivityList
              if (actList != null && actList.length > 0) {
                for (var a = 0; a < actList.length; a++) {
                  if (actList[a].activityType == "02") {
                    // 限时特惠,原价和活动价取新的
                    xcxSpuSkuList[j].skuShopPrice = actList[a].skuActivityPrice
                    xcxSpuSkuList[j]["saleCnt"] = actList[a].skuSaleCnt
                    xcxSpuSkuList[j]["endDate"] = actList[a].surplusSecond

                    // 参加首页特惠活动商品
                    actGoods.push(xcxSpuSkuList[j])
                  }
                }
              } else {
                // 没参加活动
                noActGoods.push(xcxSpuSkuList[j])
              }
              // that.data.hotGoods.push(xcxSpuSkuList[j])
            }
          }

          if (actGoods.length > 0) {
            that.data.hotGoods = actGoods
            that.data.isSpecialPriceAct = "1"
            console.log(actGoods[0].endDate)
            that.data.special_total_second = parseInt(actGoods[0].endDate) * 1000

            console.log("开始计时时间：" + Date.parse(new Date()))
            specialSpriceActCountdown(that)

            that.data.clock = '1'
          } else {

            that.data.hotGoods = noActGoods
            that.data.isSpecialPriceAct = "0"
            that.data.special_total_second = 0
          }
          that.setData({
            hotGoods: that.data.hotGoods,
            isSpecialPriceAct: that.data.isSpecialPriceAct,
            special_total_second: that.data.special_total_second
          })

          console.log(that.data.hotGoods)
        }
      },
      fail: function (res) {
        console.log(res)
        console.log("获取首页商品失败")
      }
    })
  },

  onPullDownRefresh: function () {
    var that = this
    // 调后台接口，获取首页数据
    wx.request({
      url: configParams.HOME_GOODS_URL,
      data: {
        skuType: "0"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log("=============首页商品==============")
        console.log(res)
        if (res.data.code == "00000") {
          that.data.hotGoods = []

          let actGoods = []
          let noActGoods = []

          var data = res.data.info
          for (var i = 0; i < data.length; i++) {
            var xcxSpuSkuList = data[i].xcxSpuSkuList
            for (var j = 0; j < xcxSpuSkuList.length; j++) {
              xcxSpuSkuList[j]["spuName"] = data[i].spuName
              var imageList = xcxSpuSkuList[j].xcxImageBaseSkuBaseList
              if (imageList.length > 0) {
                xcxSpuSkuList[j].imgUrl = imageList[0].imageUrl
              }

              var actList = xcxSpuSkuList[j].xcxSkuActivityList
              if (actList != null && actList.length > 0) {
                for (var a = 0; a < actList.length; a++) {
                  if (actList[a].activityType == "02") {
                    // 限时特惠,原价和活动价取新的
                    xcxSpuSkuList[j].skuShopPrice = actList[a].skuActivityPrice
                    xcxSpuSkuList[j]["saleCnt"] = actList[a].skuSaleCnt
                    xcxSpuSkuList[j]["endDate"] = actList[a].surplusSecond

                    // 参加首页特惠活动商品
                    actGoods.push(xcxSpuSkuList[j])
                  }
                }
              } else {
                // 没参加活动
                noActGoods.push(xcxSpuSkuList[j])
              }
              // that.data.hotGoods.push(xcxSpuSkuList[j])
            }
          }

          if (actGoods.length > 0) {
            that.data.hotGoods = actGoods
            that.data.isSpecialPriceAct = "1"
            that.data.special_total_second = parseInt(actGoods[0].endDate) * 1000

            if (that.data.clock == '0') {
              that.data.clock = '1'
              specialSpriceActCountdown(that)
            }

          } else {
            if (that.data.clock == '1') {
              that.data.clock = '0'
              clearTimeout(that.data.clockTimer)
            }
            that.data.hotGoods = noActGoods
            that.data.isSpecialPriceAct = "0"
            that.data.special_total_second = 0
          }
          that.setData({
            hotGoods: that.data.hotGoods,
            isSpecialPriceAct: that.data.isSpecialPriceAct,
            special_total_second: that.data.special_total_second
          })

          console.log(that.data.hotGoods)
        }
      },
      fail: function (res) {
        console.log(res)
        console.log("获取首页商品失败")
      }
    })

    wx.request({
      url: configParams.HOME_BANNER_URL,
      data: {
        imageType: "01"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        // console.log(res.data)
        if (res.data.code == "00000") {
          that.setData({
            bannerList: res.data.info
          })
        }
      },
      fail: function (res) {
        console.log("获取首页轮播图失败")
      }
    })

    // 掉后台接口，查询是否有优惠活动
    // 调后台接口，获取首页数据
    wx.request({
      url: configParams.HOME_ACTIVITIES_URL,
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        if (res.data.code == '00000') {
          var data = res.data.info
          if (data.isDisCount == '1') {
            if (data.rangeList.length == data.priceList.length) {
              let act = []
              for (var i in data.rangeList) {
                var content = '满' + data.rangeList[i] + '减' + data.priceList[i]
                act.push(content)
              }
              that.setData({
                act: act
              })

              app.globalData.isActivity = '1'
              app.globalData.actRange = data.rangeList
              app.globalData.actIntensity = data.priceList
              app.globalData.act = act
            }

          } else {
            app.globalData.isActivity = '0'
            app.globalData.actRange = []
            app.globalData.actIntensity = []
          }
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })

    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 2000)
  },
  onShareAppMessage: function (options) {
    return {
      title: '健康生活，从饮食开始',
      path: '/pages/yiguo/index/index',
      success: function (res) {
        console.log("成功")
      },
      fail: function (res) {
        console.log("失败")
      }
    }
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