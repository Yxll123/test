var app = getApp();
var util = require('../../../utils/util.js');
const requestUtils = require('../../../utils/request.js');
const configParams = require('../../../config');

// 计算总件数，和总价
function calculateTotal(list, that) {
  var cartList = list
  var totalMoney = 0
  var totalNum = 0
  for (var i in cartList) {
    var cartOne = cartList[i]
    if (cartOne.isCheck == '1') {
      totalNum += Number(cartOne.goodsCnt)
      totalMoney += util.accMul(cartOne.price, cartOne.goodsCnt)
    }
  }
  that.data.totalMoney = totalMoney
  that.data.totalNum = totalNum
}

function judgeIsAllSelected(cartList, that) {
  // 判断购物车是否所有可以购买的商品都选中
  for(var i in cartList) {
    var cartGoods = cartList[i];
    if (cartGoods.canBuy && cartGoods.isCheck == '0') {
      // 能买的商品没有选中
      that.data.allSelected = false;
      return false;
    }
  }
  that.data.allSelected = true;
  return true;
}



Page({
  data: {
    // 每次打开页面，都需重新赋值
    cartList: [],//购物车列表
    totalMoney: 0,// 已选择价格合计
    totalNum: 0,// 已选择商品总数量
    allSelected: false,//商品全选

    delShow: { //记录开启着的删除按钮
      isOpen: false,
      idx:''
    },

    preMoney: 0,// 立减金额
    lastMoney:0,// 优惠后金额
    
    editStatus: false,//编辑框,开着其余事件都不能点
    isActivity:'0'//是否有满减活动（0无 1有）
  },
  onLoad: function (options) {
  },
  onReady: function () {
  },
  onShow: function () {
    requestUtils.post("查询用户通用购物车", configParams.GET_USER_CART, {userId: app.globalData.userId}, null, (res) => {
      console.log(res);
      if(res.data.code == '0000') {
        var cartList = res.data.info;
        calculateTotal(cartList, this);
        judgeIsAllSelected(cartList, this);

        this.data.delShow.isOpen = false;
        this.setData({
          cartList: cartList,
          totalMoney: this.data.totalMoney,
          totalNum: this.data.totalNum,
          allSelected: this.data.allSelected,
          delShow: this.data.delShow
        })
      }
    });
  },
  onHide: function () {

  },
  selectAll: function () {
    // 全选按钮
    var data = {};
    data.type = '1';// 全部操作
    data.userId = app.globalData.userId;//用户id
    
    if (this.data.allSelected) {
      // 全部取消勾选
      data.isCheck = '0';
      requestUtils.post("全部勾选", configParams.UPDATE_CART_SELECT, data, null, (res) => {
        // console.log(res);
        if(res.data.code == '0000') {
          var cartList = this.data.cartList;

          for (var i in cartList) {
            cartList[i].isCheck = '0';
          }

          this.setData({
            cartList: this.data.cartList,
            totalMoney: 0,
            totalNum: 0,
            allSelected: false
          })
        }
      });
    } else {
      // 全部选上
      data.isCheck = '1';

      requestUtils.post("全部勾选", configParams.UPDATE_CART_SELECT, data, null, (res) => {
        if(res.data.code == '0000') {
          // 重新刷新数据
          requestUtils.post("查询用户通用购物车", configParams.GET_USER_CART, { userId: app.globalData.userId }, null, (res) => {
            console.log(res);
            if (res.data.code == '0000') {
              var cartList = res.data.info;
              calculateTotal(cartList, this);
              // judgeIsAllSelected(cartList, this);
              this.setData({
                cartList: cartList,
                totalMoney: this.data.totalMoney,
                totalNum: this.data.totalNum,
                allSelected: true
              })
            }
          });
        }
      });
    }
  },
  selectOne: function (e) {
    // 1、判断是取消还是勾选上
    var goods = this.data.cartList[e.currentTarget.dataset.idx];
    
    var data = {};
    data.type = '0';// 单个操作
    data.cartId = goods.id;
    if (goods.isCheck == '1') {
      // 取消勾选
      data.isCheck = '0';
    } else if (goods.isCheck == '0') {
      // 勾选上
      if (!goods.canBuy) {
        wx.showToast({
          title: goods.goodsStatusMsg,
          icon: 'none',
          duration: 1500,
          mask: true,
          success: function (res) { }
        });
        return;
      }
      data.isCheck = '1';
    } else {
      return;
    }

    requestUtils.post("勾选商品", configParams.UPDATE_CART_SELECT, data, null, (res)=>{
      if(res.data.code == '0000') {
        console.log(res);
        goods.isCheck = data.isCheck;
        calculateTotal(this.data.cartList, this);
        judgeIsAllSelected(this.data.cartList, this);
        this.setData({
          cartList: this.data.cartList,
          totalMoney: this.data.totalMoney,
          totalNum: this.data.totalNum,
          allSelected: this.data.allSelected
        })
      }
    });
  },
  // 清空购物车
  emptyCart: function () {
    var data = {};
    data.type = '1';
    data.userId = app.globalData.userId;
    requestUtils.post("清空购物车", configParams.DELETE_COMMON_CART, data, null, (res) => {
      if(res.data.code == '0000') {
        this.setData({
          cartList: [],
          totalMoney: 0,
          totalNum: 0,
          allSelected: false
        })
      }
    });
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    var cart = this.data.cartList;
    if (this.data.delShow.isOpen) {
      cart[this.data.delShow.idx].delFlag = '0';
      this.data.delShow.isOpen = false;
      this.setData({
        startX: e.changedTouches[0].clientX,
        startY: e.changedTouches[0].clientY,
        cartList: cart,
        delShow: this.data.delShow
      })
    } else {
      this.setData({
        startX: e.changedTouches[0].clientX,
        startY: e.changedTouches[0].clientY,
      })
    }
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this;
    var idx = e.currentTarget.dataset.idx; //当前索引
    var startX = that.data.startX; //开始X坐标
    var startY = that.data.startY; //开始Y坐标
    var touchMoveX = e.changedTouches[0].clientX; //滑动变化坐标
    var touchMoveY = e.changedTouches[0].clientY; //滑动变化坐标
    //获取滑动角度
    var angle = that.angle({
      X: startX,
      Y: startY
    }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    //滑动超过30度角 return
    if (Math.abs(angle) > 30) return;

    var cart = that.data.cartList;
    if (touchMoveX > startX) //右滑
      // cart[fIdx].goodsList[sIdx].delFlag = '0'
      return;
    else //左滑
      cart[idx].delFlag = '1'

    that.data.delShow.isOpen = true;
    that.data.delShow.idx = idx;

    //更新数据
    that.setData({
      cartList: cart,
      delShow: that.data.delShow
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del: function (e) {
    console.log(e);
    var idx = e.currentTarget.dataset.idx;
    
    var goodsId = this.data.cartList[idx].id;
    var data = {};
    data.type = '0';
    data.cartId = goodsId;
    requestUtils.post("清空购物车", configParams.DELETE_COMMON_CART, data, null, (res) => {
      if (res.data.code == '0000') {

        this.data.cartList.splice(idx, 1);
        calculateTotal(this.data.cartList, this);
        judgeIsAllSelected(this.data.cartList, this);
        this.setData({
          cartList: this.data.cartList,
          totalMoney: this.data.totalMoney,
          totalNum: this.data.totalNum,
          allSelected: this.data.allSelected
        })
      }
    });
  },
  // 更改购买数量
  buyNumChange: function (e) {
    console.log(e.currentTarget);
    var num = parseInt(e.detail.value);
    var idx = e.currentTarget.dataset.idx;
    var goods = this.data.cartList[idx];

    if(num == 0) {
      //删除
      var data = {};
      data.type = '0';
      data.cartId = goods.id;
      requestUtils.post("清空购物车", configParams.DELETE_COMMON_CART, data, null, (res) => {
        if (res.data.code == '0000') {

          this.data.cartList.splice(idx, 1);
          calculateTotal(this.data.cartList, this);
          judgeIsAllSelected(this.data.cartList, this);
          this.setData({
            cartList: this.data.cartList,
            totalMoney: this.data.totalMoney,
            totalNum: this.data.totalNum,
            allSelected: this.data.allSelected
          })
        }
      });
    }  else {
      var data = {};
      data.cartId = goods.id;
      data.skuId = goods.skuId;
      data.goodsCnt = num;
      requestUtils.post("更改商品数量", configParams.UPDATE_CART_GOODS, data, null, (res) => {
        if (res.data.code == "0000") {
          console.log(res.data.info);
          var result = res.data.info;
          if (result.success) {
            goods.goodsCnt = result.modifyCnt;
            goods.goodsStatusMsg = result.msg;
            goods.canBuy = true;
          } else {
            // 更新失败，不改变数量
            goods.goodsStatusMsg = result.msg;
            goods.canBuy = false;
            goods.isCheck = '0';
          }

          calculateTotal(this.data.cartList, this);
          judgeIsAllSelected(this.data.cartList, this);
          this.setData({
            cartList: this.data.cartList,
            totalMoney: this.data.totalMoney,
            totalNum: this.data.totalNum,
            allSelected: this.data.allSelected
          })
        }
      });
    }
  },
  // 加/减购买数量
  buyNumRoP: function (e) {
    var flag = e.currentTarget.dataset.flag;
    var index = e.currentTarget.dataset.idx;
    var goods = this.data.cartList[index];
    
    var goodsCnt = goods.goodsCnt;
    if (flag == 'reduce') {
      if (goods.goodsCnt == 1) {
        // 删除商品
        var data = {};
        data.type = '0';
        data.cartId = goods.id;
        requestUtils.post("清空购物车", configParams.DELETE_COMMON_CART, data, null, (res) => {
          if (res.data.code == '0000') {

            this.data.cartList.splice(index, 1);
            calculateTotal(this.data.cartList, this);
            judgeIsAllSelected(this.data.cartList, this);
            this.setData({
              cartList: this.data.cartList,
              totalMoney: this.data.totalMoney,
              totalNum: this.data.totalNum,
              allSelected: this.data.allSelected
            })
          }
        });
        return;
      }
      goodsCnt -= 1;

    } else {
      if (goods.goodsCnt == 999) {
        return;
      }
      goodsCnt += 1;
    }

    var data = {};
    data.cartId = goods.id;
    data.skuId = goods.skuId;
    data.goodsCnt = goodsCnt;
    requestUtils.post("更改商品数量", configParams.UPDATE_CART_GOODS, data, null, (res) => {
      if(res.data.code == "0000") {
        console.log(res.data.info);
        var result = res.data.info;
        if (result.success) {
          goods.goodsCnt = result.modifyCnt;
          goods.goodsStatusMsg = result.msg;
          goods.canBuy = true;
        } else {
          // 更新失败，不改变数量
          goods.goodsStatusMsg = result.msg;
          goods.canBuy = false;
          goods.isCheck = '0';
        }

        calculateTotal(this.data.cartList, this);
        judgeIsAllSelected(this.data.cartList, this);
        this.setData({
          cartList: this.data.cartList,
          totalMoney: this.data.totalMoney,
          totalNum: this.data.totalNum,
          allSelected: this.data.allSelected
        })
      }
    });
  },
  goodDetail: function (e) {

    var data  = e.currentTarget.dataset
    if (this.data.editStatus) {
      return;
    }
    var id = e.currentTarget.dataset.goodId
    wx.navigateTo({
      url: '../detail/detail?spuId=' + data.spuId + '&skuId=' + data.skuId
    })
  },
  addOrder: function (e) {

    let orderGoods = []
    let lastCart = []
    var cartList = this.data.cartList
    for (var i in cartList) {
      if (cartList[i].selected) {
        orderGoods.push(cartList[i])
      } else {
        lastCart.push(cartList[i])
      }
    }

    if (orderGoods.length > 0) {
      wx.navigateTo({
        url: '../submit/submit?goods=' + JSON.stringify(orderGoods) + '&totalMoney=' + this.data.totalMoney + '&totalNum=' + this.data.totalNum + '&lastCart=' + JSON.stringify(lastCart) + '&flag=' + '0' + '&preMoney=' + this.data.preMoney + '&lastMoney=' + this.data.lastMoney
      })
    }
  },
})