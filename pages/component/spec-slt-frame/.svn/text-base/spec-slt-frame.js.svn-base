const configParams = require('../../../config')
const util = require('../../../utils/util.js');
const requestUtils = require('../../../utils/request.js');
var app = getApp();

// 初始化设置选中的规格选项
function initSpecStatus(currentSku, goodsSpecList) {
  // skude规格组合
  var skuSpecGroup = currentSku.specValueGroup;
  if (skuSpecGroup == null || skuSpecGroup == "") {
    return;
  }
  var skuSpecGroupList = skuSpecGroup.split("|");
  skuSpecGroupList.pop();// 删除最后一个空字符
  if (skuSpecGroupList.length != goodsSpecList.length) {
    return;
  }
  // console.log(skuSpecGroupList);
  for (var i in skuSpecGroupList) {
    // 这个sku的一种规格的规格值id
    var skuOneSpecId = skuSpecGroupList[i];

    // 这个规格的所有规格值
    var specValue = goodsSpecList[i].item
    for (var j in specValue) {
      if (skuOneSpecId == specValue[j].id) {
        // 当前这个规格值是选中的，设置为选中
        specValue[j].sltStatus = '1';
        goodsSpecList[i].checked = true;
        break; // 跳出内循环
      }
    }
  }
}

/*
* 设置红色和M号选中后，验证其余颜色选项能否和M号组合，验证其余尺寸能否和红色组合，
*   需要先设置一个有效的组合
*/
function setAllSpecStatus(goodsSpec, goodsSkuList) {
  // 商品所有的规格和规格值
  if (goodsSpec == null || goodsSpec.length == 0) {
    return;
  }
  if (goodsSkuList == null || goodsSkuList.length == 0) {
    return;
  }
  
  for (var i in goodsSpec) {
    // 第i种规格
    var oneSpec = goodsSpec[i];
    // 第i种规格的值集合
    var oneSpecValues = oneSpec.item;

    for (var j in oneSpecValues) {
      // 所有规格种类组成
      var specGroup = "";

      // 循环所有i种规格的所有未选中规格值
      var specValueObj = oneSpecValues[j];
      if (specValueObj.sltStatus == '1') {
        // 换其余未选中值来验
        continue;
      }

      // 和其余种规格的选中的规格值组合
      for (var m in goodsSpec) {
        if(i == m) {
          specGroup += specValueObj.id + "|";
        } else {
          var otherSpec = goodsSpec[m];
          var otherSpecValues = otherSpec.item;

          // 其余种规格选中的规格值
          for (var n in otherSpecValues) {
            if (otherSpecValues[n].sltStatus == '1') {
              specGroup += otherSpecValues[n].id + "|";
              break;
            }
          }
        }
      }

      // 记录specValueObj是否能够和其余选中的组合
      var canGroup = false;

      // 判断sku集中是否有这种组合
      if (!valideSpecGroup(specGroup, goodsSkuList)) {
        // 当前这种组合不存在sku
        // 得到第i种规格j指向的这个规格值不能和其余种类选中的规格值组合
        specValueObj.sltStatus = '2';
      } else {
        specValueObj.sltStatus = '0';
      }
    }
  }
}

function changeSpecStatus(that, fIndex, sIndex, goodsSpec, goodsSkuList) {
  if (goodsSpec == null || goodsSpec.length == 0 || goodsSpec.length <= fIndex) {
    return;
  }
  if (goodsSkuList == null || goodsSkuList.length == 0) {
    return;
  }

  // 选中的规格种类
  var oneSpecObj = goodsSpec[fIndex];
  if (oneSpecObj.item.length <= sIndex) {
    return;
  }

  if (oneSpecObj.item[sIndex].sltStatus == '1') {
    // 该规格值选中着
    return;
  } else if (oneSpecObj.item[sIndex].sltStatus == '0') {
    // 该规格值未选中,判断规格值与其余种类选中的规格值组合是否有效
    var groupStr = "";
    for (var i in goodsSpec) {
      if(i == fIndex) {
        groupStr += oneSpecObj.item[sIndex].id + "|";
      } else {
        var otherSpecObj = goodsSpec[i];
        for (var j in otherSpecObj.item) {
          if (otherSpecObj.item[j].sltStatus == '1') {
            groupStr += otherSpecObj.item[j].id + "|";
            break;
          }
        }
      }
    }
    // 判断组合是否有效
    for (var p in goodsSkuList) {
      if (goodsSkuList[p].specValueGroup == groupStr) {
        // 组合有效
        for (var n in oneSpecObj.item) {
          if (n == sIndex) {
            oneSpecObj.item[n].sltStatus = '1'
          } else {
            oneSpecObj.item[n].sltStatus = '0'
          }
        }

        setAllSpecStatus(goodsSpec, goodsSkuList);
        var currentSku = goodsSkuList[p];
        that.setData({
          goods: currentSku,
          goodsSpec: goodsSpec
        })
        return;
      }
    }
    // 组合无效
  } 
  // 选择的规格值与其余选中的规格值组合无效
  // 找出一个有效的组合自动拼装
  for (var m in goodsSkuList) {
    var valueIdList = goodsSkuList[m].specValueGroup.split("|");
    valueIdList.pop();
    if (valueIdList[fIndex] == oneSpecObj.item[sIndex].id) {
      // 当前循环的sku规格值包含用户选种的选项，取这个sku被用户选中
      if (valueIdList.length != goodsSpec.length) {
        return;
      }

      for (var z in valueIdList) {
        var oneSpecValueList = goodsSpec[z].item;
        for (var b in oneSpecValueList) {
          if (valueIdList[z] == oneSpecValueList[b].id) {
            oneSpecValueList[b].sltStatus = '1';
            goodsSpec[z].checked = true;
          } else {
            oneSpecValueList[b].sltStatus = '0';
          }
        }
      }

      setAllSpecStatus(goodsSpec, goodsSkuList);
      var currentSku = goodsSkuList[m];
      that.setData({
        goods: currentSku,
        goodsSpec: goodsSpec
      })
      return;
    }
  }

}

function valideSpecGroup(specGroup, goodsSkuList) {
  for (var p in goodsSkuList) {
    if (goodsSkuList[p].specValueGroup == specGroup) {
      return true;
    }
  }
  return false;
}


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spuId:String,// spuId
    spuName: String,
    goodsDesc: String,
    isLimitArea:String,// 是否有购买地域的限制
    frameType: Number // 弹框类型（0:加入购物车+立即购买 1:加入购物车 2:立即购买）
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowFrame: false,
    buyNum: 1, //购买商品数量
    goods: Object, // 商品sku对象
    goodsSpec: Array, // 商品规格列表(规格值状态：0未选中 1选中 2不可选)
    goodsSkuList: Array,// 商品所有sku
    propertyList:Array// 商品属性列表
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    _closeBuyWin: function() {
      this.setData({
        isShowFrame: false
      })
    },
    _openBuyWin: function() {
      requestUtils.post("查询商品的规格，属性", configParams.GOODS_SLTVALUE_URL + "/" + this.data.spuId, '', null, (res) => {
        if(res.data.code == "0000") {
          console.log(res.data.info);
          // 商品所有的sku
          var goodsSkuList = res.data.info.skuList;
          if (goodsSkuList == null || goodsSkuList.length == 0) {
            return;
          }
          // 当前商品的规格组合(去第一个商品作为当前商品)
          var currentSku = goodsSkuList[0];
          // 商品所有的规格选项
          var goodsSpecList = res.data.info.specList;
          // console.log(goodsSkuList);
          // console.log(goodsSpecList);

          // 规格选择选项，是否选中状态初始化
          initSpecStatus(currentSku, goodsSpecList);
          setAllSpecStatus(goodsSpecList, goodsSkuList);
          console.log(goodsSpecList);

          var propertyList = res.data.info.propertyList;
          for(var k in propertyList) {
            propertyList[k].checked = true;
            propertyList[k].item[0].sltStatus = '1';
          }

          this.setData({
            isShowFrame: true,
            goods: currentSku,
            buyNum:1,
            goodsSpec: goodsSpecList,
            goodsSkuList: goodsSkuList,
            propertyList: propertyList
          })
        }
      });
    },
    _selectSpecify: function(e) {
      console.log(this.data.goods);
      var fIndex = e.currentTarget.dataset.fidx;
      var sIndex = e.currentTarget.dataset.sidx;

      var goodsSpecList = this.data.goodsSpec;
      var goodsSkuList = this.data.goodsSkuList;

      changeSpecStatus(this, fIndex, sIndex, goodsSpecList, goodsSkuList);

    },
    _selectProperty:function(e) {
      var fIndex = e.currentTarget.dataset.fidx;
      var sIndex = e.currentTarget.dataset.sidx;

      var propertyList = this.data.propertyList;
      if (propertyList[fIndex].item[sIndex].sltStatus == '1') {
        return;
      }
      for (var i in propertyList[fIndex].item) {
        if (i == sIndex) {
          propertyList[fIndex].item[i].sltStatus = '1';
        } else {
          propertyList[fIndex].item[i].sltStatus = '0';
        }
      }

      this.setData({
        propertyList: this.data.propertyList
      })
    },
    _buyNumChange: function(e) {
      console.log(this.data.goods);
      var v = parseInt(e.detail.value)
      if (v == 0) {
        v = 1
      }
      this.setData({
        buyNum: v,
      })
    },
    _buyNumRoP: function(e) {
      var flag = e.currentTarget.dataset.flag
      if (flag == 'reduce') {
        if (this.data.buyNum > 1) {
          this.data.buyNum--
            this.setData({
              buyNum: this.data.buyNum
            })
        }
      } else {
        if (this.data.buyNum < 999) {
          this.data.buyNum++
            this.setData({
              buyNum: this.data.buyNum
            })
        }
      }
    },
    // 加入购物车
    _addShopCart: function(e) {
      // 加入购物，重新写
      if(this.data.goods == null) {
        return;
      }

      if (this.data.goods.stock <= 0) {
        wx.showToast({
          title: '商品库存不足',
          icon: 'none',
          duration: 1500,
          mask: true
        })
        return;
      }


      var propertiesDesc = "";
      // 判断规格有没有全选
      var goodsSpec = this.data.goodsSpec;
      for (var i in goodsSpec) {
        var specValues = goodsSpec[i].item;
        var isSlt = false;
        for (var j in specValues) {
          if (specValues[j].sltStatus == '1') {
            // propertiesDesc += specValues[j].id + "+";
            isSlt = true;
            break;
          }
        }

        if(!isSlt) {
          wx.showToast({
            title: '选择规格',
            icon: 'none',
            duration:1500,
            mask: true
          })
          return;
        }
      }

      var propertyList = this.data.propertyList;
      for (var m in propertyList) {
        var isSlt = false;
        var valueList = propertyList[m].item;
        for (var n in valueList) {
          if (valueList[n].sltStatus == '1') {
            propertiesDesc += valueList[n].id + "|";
            isSlt = true;
            break;
          }
        }

        if (!isSlt) {
          wx.showToast({
            title: '选择规格',
            icon: 'none',
            duration: 1500,
            mask: true
          })
          return;
        }
      }

      propertiesDesc = propertiesDesc.substr(0, propertiesDesc.length-1);

      var data = {};
      data.userId = app.globalData.userId;
      data.spuId = this.data.spuId;
      data.skuId = this.data.goods.skuId;
      data.propertyIdGroup = propertiesDesc;
      data.goodsCnt = this.data.buyNum;

      requestUtils.post("加入通用购物车", configParams.INSERT_COMMON_CART, data, null, (res) => {
        console.log(res);
        if(res.data.code == "0000") {
          wx.showToast({
            title: '成功加入购物车',
            icon: 'success',
            duration: 1500,
            mask: true
          });
          this._closeBuyWin();
        } else {
          wx.showToast({
            title: res.data.desc,
            icon: 'none',
            duration: 1500,
            mask: true
          })
        }
      });
    },
    // 立即购买
    _immediateBuy: function(e) {
      // 立即购买重新写
      if (this.data.goods == null) {
        return;
      }

      if (this.data.goods.stock <= 0) {
        wx.showToast({
          title: '商品库存不足',
          icon: 'none',
          duration: 1500,
          mask: true
        })
        return;
      }

      var propertiesDesc = "";
      // 判断规格有没有全选
      var goodsSpec = this.data.goodsSpec;
      for (var i in goodsSpec) {
        var specValues = goodsSpec[i].item;
        var isSlt = false;
        for (var j in specValues) {
          if (specValues[j].sltStatus == '1') {
            propertiesDesc += specValues[j].specValueName + "+";
            isSlt = true;
            break;
          }
        }

        if (!isSlt) {
          wx.showToast({
            title: '选择规格',
            icon: 'none',
            duration: 1500,
            mask: true
          })
          return;
        }
      }

      var propertyList = this.data.propertyList;
      for (var m in propertyList) {
        var isSlt = false;
        var valueList = propertyList[m].item;
        for (var n in valueList) {
          if (valueList[n].sltStatus == '1') {
            propertiesDesc += valueList[n].propertyValueName + "+";
            isSlt = true;
            break;
          }
        }

        if (!isSlt) {
          wx.showToast({
            title: '选择规格',
            icon: 'none',
            duration: 1500,
            mask: true
          })
          return;
        }
      }

      propertiesDesc = propertiesDesc.substr(0, propertiesDesc.length - 1);
      

      var goods = this.data.goods;

      var orderGoodsList = [];
      var orderGoods = {};
      orderGoods.spuId = this.data.spuId;
      orderGoods.name = this.data.spuName;
      orderGoods.goodsCnt = this.data.buyNum;
      orderGoods.price = goods.price;
      orderGoods.propertyValueGroup = propertiesDesc;
      orderGoods.skuId = goods.skuId;
      orderGoods.skuPicture = goods.skuPicture;

      orderGoods.isLimitArea = this.data.isLimitArea;

      console.log(orderGoods);
      orderGoodsList.push(orderGoods);

      var totalMoney = util.accMul(orderGoods.price, orderGoods.goodsCnt);
      
      wx.navigateTo({
        url: '../../yiguo/submit/submit?goods=' + JSON.stringify(orderGoodsList) + '&totalMoney=' + totalMoney,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  }
})