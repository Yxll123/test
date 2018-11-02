var app = getApp()
const configParams = require('../../../config')
const util = require('../../../utils/util.js');

function closeBuyWin(that) {
  that.setData({
    chooseModal: 'none',
    goodInfo: {},
    goodSpec: [],
    selected_index: null,
    selected_sku: '',
    minusStatus: 'disabled'
  })
}

Page({
  data: {
    // 热卖商品
    hotGoods: [],
    // 商品价格图标
    priceIcon: "￥",
    /*-------- 商品规格栏参数 ----------*/
    chooseModal: 'none', // 显示/隐藏  
    goodInfo: {}, // 商品数据(图片，名称，单价，规格列表)
    goodSpec: [],// 商品规格列表
    selected_index: null,// 选择规格的下标
    selected_sku: '',// 选择规格的skuId
    minusStatus: 'disabled',// 初始减号置灰
    cartLabType: '',
    buyLabType: '',

    errMsg: "",
    iv: "",
    encryptedData: ""
  },
  getPhoneNumber: function (e) {
    // this.setData({
    //   errMsg: e.detail.errMsg,
    //   iv: e.detail.iv,
    //   encryptedData: e.detail.encryptedData
    // })
    var that = this;
    wx.request({
      url: 'http://10.108.86.19:8080/eskj_service_dsgj/eskj/fzjy/xcxUserBase/analysisWxUserMobilePhone',
      data: {
        userId: wx.getStorageSync("userId"),
        userWxOpenid: wx.getStorageSync("openId"),
        encryptedData: e.detail.encryptedData,
        initialVector: e.detail.iv
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      success: function (result) {
        console.log(result);
      }
    })
  },
  onLoad: function (options) {
    var that = this
    // 调后台接口，获取首页数据
    wx.request({
      url: configParams.HOME_GOODS_URL,
      data: {
        skuType: "1"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        if(res.data.code == "00000"){
          var data = res.data.info
          for (var i = 0; i < data.length; i++) {
            var xcxSpuSkuList = data[i].xcxSpuSkuList
            for (var j = 0; j < xcxSpuSkuList.length; j++) {
              xcxSpuSkuList[j]["spuName"] = data[i].spuName;
              var imageList = xcxSpuSkuList[j].xcxImageBaseSkuBaseList;
              if (imageList.length > 0) {
                xcxSpuSkuList[j].imgUrl = imageList[0].imageUrl;
              }
              that.data.hotGoods.push(xcxSpuSkuList[j])
            }
          }
          that.setData({
            hotGoods: that.data.hotGoods
          })
          console.log(that.data.hotGoods)
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  // 快速购买
  showBuy: function (event) {
    console.log(event)
    var goodInfo = this.data.hotGoods[event.currentTarget.dataset.goodIdx]
    goodInfo["buyNum"] = 1
    // 现在是商品展示已经带有规格
    this.setData({
      chooseModal: 'block',
      goodInfo: goodInfo
    })
    console.log(this.data.goodInfo)
  },
  closeBuyWin: function () {
    // 规格页参数还原
    closeBuyWin(this)
  },
  selectSpecify: function (e) {
    // 选择商品的规格
    console.log("点击事件参数==" + e.currentTarget.dataset)
    console.log("原规格值==" + this.data.goodSpecify)
    console.log("原选择值==" + this.data.selected_index + '/' + this.data.selected_spu)
    var spu_key = e.currentTarget.dataset.spuKey
    var idx = e.currentTarget.dataset.arrIndex
    if (this.data.selected_index != null) {
      // 将原先选取的去掉
      this.data.goodSpecify[this.data.selected_index].isSelect = false
    }
    this.data.goodSpecify[idx].isSelect = true
    this.setData({
      selected_index: idx,
      selected_spu: spu_key,
      goodSpecify: this.data.goodSpecify
    })

    console.log(this.data.goodSpecify)
    console.log(this.data.selected_index + '/' + this.data.selected_spu)
  },
  buyNumChange: function (e) {
     var v = parseInt(e.detail.value)
    if (v == 0) {
      v = 1
    }
    this.data.goodInfo.buyNum = v
    if (v != '1') {
      this.setData({
        minusStatus: '',
        goodInfo: this.data.goodInfo
      })
    } else {
      this.setData({
        minusStatus: 'disabled',
        goodInfo: this.data.goodInfo
      })
    }
  },
  buyNumRoP: function (e) {
    var flag = e.currentTarget.dataset.flag
    if (flag == 'reduce') {
      if (this.data.goodInfo.buyNum > 1) {
        if (this.data.goodInfo.buyNum == 2) {
          this.data.minusStatus = 'disabled'
        }
        this.data.goodInfo.buyNum--
        this.setData({
          minusStatus: this.data.minusStatus,
          goodInfo: this.data.goodInfo
        })
      }
    } else {
      if (this.data.goodInfo.buyNum < 999) {
        if (this.data.goodInfo.buyNum == 1) {
          this.data.minusStatus = ''
        }
        this.data.goodInfo.buyNum++
        this.setData({
          minusStatus: this.data.minusStatus,
          goodInfo: this.data.goodInfo
        })
      }
    }
  },
  // 加入购物车
  addShopCart: function (e) {
    var skuId = e.currentTarget.dataset.skuId
    console.log(skuId + " " + this.data.buyNum)

    if (this.data.goodInfo.id == skuId) {

      var goodInfo = this.data.goodInfo;
      goodInfo["selected"] = false
      console.log(goodInfo)

      // 获取购物车的缓存数组（没有数据，则赋予一个空数组）
      var arr = wx.getStorageSync('cart') || [];
      // 如果购物车有数据
      if (arr.length > 0) {
        // 遍历购物车数组
        for (var j in arr) {
          // 判断购物车内的item的id，和事件传递过来的id，是否相等
          if (arr[j].id == skuId) {
            // 购物车已有该商品
            arr[j].buyNum += goodInfo.buyNum
            try {
              wx.setStorageSync('cart', arr)

              wx.showToast({
                title: '已成功添加到购物车',
                icon: 'none',
                duration: 1000,
                mask: true
              })
              closeBuyWin(this)
            } catch (e) {
              console.log(e)
            }
            return
          }
        }
      }
      arr.push(goodInfo);
      try {
        wx.setStorageSync('cart', arr)
        wx.showToast({
          title: '已成功添加到购物车',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        closeBuyWin(this)
      } catch (e) {
        console.log(e)
      }
    }

  },
  // 立即购买
  immediateBuy: function (e) {
    var goodInfo = this.data.goodInfo
    if (goodInfo.id == e.currentTarget.dataset.skuId) {
      var orderGoods = []
      orderGoods.push(goodInfo)
      if (orderGoods.length > 0) {
        var totalNum = goodInfo.buyNum
        var totalMoney = util.accMul(totalNum, goodInfo.skuShopPrice)

        wx.navigateTo({
          url: '../submit/submit?goods=' + JSON.stringify(orderGoods) + '&totalMoney=' + totalMoney + '&totalNum=' + totalNum + '&flag=' + '1',
        })

        closeBuyWin(this)
      }
    }
  },
  // 商品详情
  goodDetail: function (event) {
    var ids = event.currentTarget.dataset
    console.log(event)
    if (ids.spuId == '' || ids.skuId == '') {
      return
    }
    wx.navigateTo({
      url: '../detail/detail?spuId=' + ids.spuId + '&skuId=' + ids.skuId,
      success: function (res) {
        console.log(res)
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
