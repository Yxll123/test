const configParams = require('../../../config');
const util = require('../../../utils/util.js');
var app = getApp();
const requestUtils = require('../../../utils/request.js');



Page({
  data:{
    // swiper
    indicatorDots: true,
    isautoplay: true,
    interval: 4000,
    duration: 500,
    priceIcon:'￥',

    goodDetailBanner:[],
    goodIntroduceList:[],// 详情图列表
    videoList:[],// 视频
    swiperCurrent: 0, //记录swiper当前滑块的index
    videoShow: false, //展示video



    goodDetail: {}, // 商品数据(图片，名称，单价，规格列表)
    goodTransFee:'无运费',

    buyLabType: '',// 0:加入+立即，1：加入购物车，2：立即购买
  },
  onLoad:function(options){
    // 根据spuId查询商品信息
    var spuId = options.spuId;
    // 1、轮播图
    requestUtils.post("查询商品详情基础信息", configParams.GET_GOODS_BASE + '/' + spuId, '', null, (res) => {
      if(res.data.code == "0000") {
        console.log(res.data);

        if (res.data.info == null) {
          this.setData({
            goodDetail: {},
            goodDetailBanner: []
          })
          return;
        }
        // 轮播图片对象
        var goodsImage = res.data.info.goodsImage;
        var imageList = [{},{},{}];
        if (goodsImage != null) {
          imageList = goodsImage.imageUrl.split("|");
        }

        this.setData({
          goodDetail: res.data.info,
          goodDetailBanner: imageList
        })
      }
    });

    //2、视频
    requestUtils.post("查询商品详情视频", configParams.GET_GOODS_VIDEO + '/' + spuId, '', null, (res) => {
      console.log(res);
      if (res.data.code == "0000") {
        if (res.data.info != null) {
          this.setData({
            goodIntroduceList: res.data.info
          })
        }
      }
    });

    // 3、详情图
    requestUtils.post("查询商品详情图", configParams.GET_GOODS_IMAGES + '/' + spuId, '', null, (res) => {
      console.log(res);
      if(res.data.code == "0000") {
        if(res.data.info != null) {
          var imageList = res.data.info.split("|");
          this.setData({
            goodIntroduceList: imageList
          })
        }
      }
    });
  },
  onShareAppMessage:function(res) {

  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
    console.log(e.detail.current + " " + this.data.swiperCurrent);
  },
  videoFinish: function () {
    // 视频播放完成后，隐藏视频，并且开启自动滚动
    this.setData({
      videoShow: false,
      isautoplay: true
    })
  },
  stopVideo: function () {

    var videoContext = wx.createVideoContext("myVideo", this);
    videoContext.pause();
    this.setData({
      videoShow: false,
      isautoplay: true
    })
  },
  startVideo: function () {
    var videoContext = wx.createVideoContext("myVideo", this);
    videoContext.play();
    this.setData({
      videoShow: true,
      isautoplay: false
    })
  },
  jumpCartPage: function() {
    // 跳转购物车页面
    wx.switchTab({
      url: '../cart/cart'
    })
  },
  jumpHomePage:function() {
    wx.switchTab({
      url: '../index/index',
      success: function(res) {}
    })
  },
  contactShop:function() {
    wx.makePhoneCall({
      phoneNumber: '4009905281',
      success: function(res) {}
    })
  },
  showBuy: function(e) {
    console.log(e.currentTarget.dataset.openType)
    this.videoContext = wx.createVideoContext("goodsVideo");
    this.videoContext.pause();
    var type = e.currentTarget.dataset.openType
    if(type == 'buy') {
      this.data.buyLabType = '2'
    } else if (type == 'addcart') {
      this.data.buyLabType = '1'
    }
    this.setData({
      buyLabType: this.data.buyLabType,
    })

    this.selectComponent("#specSltFrame")._openBuyWin();
  },
  // 预览banner图
  previewImg: function(e) {
    var index = e.currentTarget.dataset.imgIndex;
    var goodNanner = this.data.goodDetailBanner
    let pics = []
    for (var i in goodNanner) {
      pics.push(goodNanner[i].imageUrl)
    }
    console.log(pics)
    wx.previewImage({
      current: goodNanner[index].imageUrl, // 当前显示图片的http链接
      urls: pics // 需要预览的图片http链接列表
    })
  }
})
