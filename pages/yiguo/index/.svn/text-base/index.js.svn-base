// 首页
//获取应用实例
var app = getApp()
const configParams = require('../../../config')
const util = require('../../../utils/util.js');
const requestUtils = require('../../../utils/request.js');

Page({
  data: {
    // 最新整理
    // swiper
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    // 首页功能模块
    funModules: [],
    // 热卖商品
    hotGoods: [],
    // 轮播图数据
    bannerList: [],
    // 商品价格图标
    priceIcon: "￥",
    
    
    /*-------- 商品规格栏参数 ----------*/
    goodsInfo: {}, // 选中的商品数据    

    
   
  },
  onLoad: function () {
    wx.authorize({ scope: "scope.userLocation" });
    // 首页轮播图
    requestUtils.post("首页轮播图", configParams.HOME_BANNER_URL, '', null, (res) => {
      // console.log(res);
      if(res.data.code == '0000') {
        this.setData({
          bannerList: res.data.info
        })
      } else {
        console.log(res.data.desc);
      }
    });

    // 首页功能模块
    requestUtils.post("首页功能模块", configParams.HOME_FUNC_URL, '', null, (res) => {
      if(res.data.code == "0000") {
        this.setData({
          funModules: res.data.info
        })
      }
    });

    // 热卖商品
    requestUtils.post("首页热卖商品", configParams.HOME_GOODS_URL, '', null, (res) => {
      console.log(res);
      if(res.data.code == "0000") {
        this.setData({
          hotGoods: res.data.info
        });
      }
    });
  },
  onShareAppMessage: function (options) {
    
  },
  // 快速购买
  showBuyWin: function(event) {
    // // console.log(event)
    var goodsInfo = this.data.hotGoods[event.currentTarget.dataset.goodIdx];

    this.setData({
      goodsInfo:goodsInfo
    });

    this.selectComponent("#specSltFrame")._openBuyWin();
  },
  // 商品详情
  goodDetail: function(event) {
    // 只传spuId

    var id = event.currentTarget.dataset.spuId
    console.log(event)
    if (id == null || id == "") {
      return
    }
    wx.navigateTo({
      url: '../detail/detail?spuId=' + id,
      success: function(res) {
        console.log(res)
      }
    })
  },
  moduleDetail:function(e) {
    var index = e.currentTarget.dataset.idx;

    var singleModule = this.data.funModules[index];
    console.log(singleModule);

    var link = "../classify/classify";

    
    wx.navigateTo({
      url: link + "?id=" + singleModule.id + "&name=" + singleModule.name,
      success: function(res) {}
    })
  }
})
