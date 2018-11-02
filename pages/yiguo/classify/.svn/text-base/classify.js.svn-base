var app = getApp()
const configParams = require('../../../config')
const util = require('../../../utils/util.js');
const requestUtils = require('../../../utils/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classify:[
      {
        "id":"1",
        "name":"智能生活",
        "isSlt":"0",
        "goodsItem":[
          {
            "id": "003x001",
            "goodsName":"爱必浓鸟屋音响灯爱必浓鸟屋音响灯",
            "imageUrl":"",
            "isSlt":"0"
          },
          {
            "id": "003x002",
            "goodsName": "爱必浓mini智能音响爱必浓鸟屋音响灯",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "003x003",
            "goodsName": "爱必浓小鸟夜灯",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "003x004",
            "goodsName": "爱必浓无线充电台灯",
            "imageUrl": "",
            "isSlt": "0"
          }
        ]
      },
      {
        "id": "2",
        "name": "香薰生活",
        "isSlt": "0",
        "goodsItem": [
          {
            "id": "004x001",
            "goodsName": "爱必浓香薰音响机",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "003x002",
            "goodsName": "爱必浓甜橙味5ML精油",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "004x001",
            "goodsName": "爱必浓香薰音响机",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "003x002",
            "goodsName": "爱必浓甜橙味5ML精油",
            "imageUrl": "",
            "isSlt": "0"
          }
        ]
      },
      {
        "id": "3",
        "name": "居家生活",
        "isSlt": "0",
        "goodsItem": [
          {
            "id": "004x001",
            "goodsName": "爱必浓香薰音响机",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "003x002",
            "goodsName": "爱必浓甜橙味5ML精油",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "004x001",
            "goodsName": "爱必浓香薰音响机",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "003x002",
            "goodsName": "爱必浓甜橙味5ML精油",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "004x001",
            "goodsName": "爱必浓香薰音响机",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "003x002",
            "goodsName": "爱必浓甜橙味5ML精油",
            "imageUrl": "",
            "isSlt": "0"
          }
        ]
      },
      {
        "id": "4",
        "name": "个人随身",
        "isSlt": "0",
        "goodsItem": [
          {
            "id": "004x001",
            "goodsName": "爱必浓香薰音响机",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "003x002",
            "goodsName": "爱必浓甜橙味5ML精油",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "004x001",
            "goodsName": "爱必浓香薰音响机",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "003x002",
            "goodsName": "爱必浓甜橙味5ML精油",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "004x001",
            "goodsName": "爱必浓香薰音响机",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "003x002",
            "goodsName": "爱必浓甜橙味5ML精油",
            "imageUrl": "",
            "isSlt": "0"
          }
        ]
      },
      {
        "id": "5",
        "name": "收纳储藏",
        "isSlt": "0",
        "goodsItem": [
          {
            "id": "004x001",
            "goodsName": "爱必浓香薰音响机",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "003x002",
            "goodsName": "爱必浓甜橙味5ML精油",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "004x001",
            "goodsName": "爱必浓香薰音响机",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "003x002",
            "goodsName": "爱必浓甜橙味5ML精油",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "004x001",
            "goodsName": "爱必浓香薰音响机",
            "imageUrl": "",
            "isSlt": "0"
          },
          {
            "id": "003x002",
            "goodsName": "爱必浓甜橙味5ML精油",
            "imageUrl": "",
            "isSlt": "0"
          }
        ]
      }
    ],
    currentViewIdx:0,// 标志左侧分类选择的索引
    scrollIntoView:0,// 右侧分类位置
    // clickTrigger:false
    functionId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    wx.setNavigationBarTitle({
      title: options.name,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

    this.setData({
      functionId: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    for (var i in this.data.classify) {
      query.select('#view_' + i).boundingClientRect();
    }
    query.exec(function (res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      console.log(res);
      //取高度
      console.log(res[0].height);
      if (res.length > 0) {
        var firstH = res[0].height;
        let classifyGodds = [];
        for (var i = 0; i < res.length; i++) {
          if(i != 0) {
            firstH += res[i].height;
          }
          classifyGodds.push(firstH);
        }
        console.log(classifyGodds);
        that.setData({
          classifyGodds: classifyGodds
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    requestUtils.post("查询分类及商品", configParams.QUERY_CLASSIFY + '/' + this.data.functionId, '', null, (res) => {
      console.log(res);
      if (res.data.code == "0000") {
        this.setData({
          classify: res.data.info
        })
      }
    });
  },
  bindscroll:function(e) {
    if (this.data.clickTrigger) {
      console.log("点击左侧，触发滚动");
      this.data.clickTrigger = false;
      return;
    }
    var length = e.detail.scrollTop;
    var classifyGodds = this.data.classifyGodds;
    for (var i in classifyGodds) {
      if ((length+300) < classifyGodds[i]) {
        this.setData({
          currentViewIdx:i
        })
        console.log(length + " " + i + " " + classifyGodds[i]);
        return;
      }
    }
  },
  chooseCat:function(e) {
    var idx = e.currentTarget.dataset.idx;
    this.data.clickTrigger = true;
    console.log(idx);
    this.setData({
      currentViewIdx:idx,
      scrollIntoView:idx
    })
  },
  goodDetail:function(e) {
    console.log(e);
    var spuId = e.currentTarget.dataset.id;
    if (id == null || id == "") {
      return
    }
    wx.navigateTo({
      url: '../detail/detail?spuId=' + id,
      success: function (res) {
        console.log(res)
      }
    })
  }
})