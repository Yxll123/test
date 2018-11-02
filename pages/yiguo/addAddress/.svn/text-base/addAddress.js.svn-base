var app = getApp()
const configParams = require('../../../config')
Page({
  data: {
    id: "",
    name: "",
    telephone: "",
    address: {
      community: null,
      detail: null,
      longitude: null,
      latitude: null
    },
    doorNumber:"",
    isDefault: true,
    isAuthorized: true
  },

  onLoad: function (options) {
    console.log(options);
    var that = this;

    //设置是否授权的标识
    var isAuthorized;
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userLocation']) {
          console.log("未授权")
          isAuthorized = false;
        } else {
          console.log("已授权")
          isAuthorized = true;
        }
        that.setData({
          isAuthorized: isAuthorized
        })
      }
    })

    // var id = "";
    // var name = "";
    // var telephone = "";
    // var detailAddress = "";
    // var isDefault = "";
    // if (options.id) {
    //   id = options.id;
    // } else {
    //   id = "";
    // }
    // if (options.name) {
    //   name = options.name;
    // } else {
    //   name = "";
    // }
    // if (options.telephone) {
    //   telephone = options.telephone;
    // } else {
    //   telephone = "";
    // }
    // if (options.detail) {
    //   detailAddress = options.detail;
    // } else {
    //   detailAddress = "";
    // }
    // if (options.isDefault) {
    //   if (options.isDefault == 1) {
    //     isDefault = true;
    //   } else {
    //     isDefault = false;
    //   }
    // } else {
    //   isDefault = true;
    // }
    // that.setData({
    //   id: id,
    //   name: name,
    //   telephone: telephone,
    //   detailAddress: detailAddress,
    //   isDefault: isDefault
    // })
  },

  chooseAddress: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.data.address.flag = true;
        that.data.address.detail = res.address;
        that.data.address.community = res.name;
        that.data.address.longitude = res.longitude;
        that.data.address.latitude = res.latitude;

        that.setData({
          address: that.data.address
        })
      },
    })
  },

  settingCallback: function(e) {
    console.log(e);
    if (e.detail.authSetting["scope.userLocation"]) {
      this.setData({
        isAuthorized: true
      })
    } else {
      this.setData({
        isAuthorized: false
      })
    }
  },

  submitAddressInfo: function (e) {
    var value = e.detail.value;
    var name = value.name.trim();
    var telephone = value.telephone.trim();
    var detail = value.detail.trim();
    var doorNumber = value.doorNumber.trim();
    var regRule = /[\ud800-\udbff][\udc00-\udfff]/g;
    if (!name) {
      wx.showModal({
        title: '提示',
        content: '请输入收货人姓名',
        showCancel: false,
        confirmText: "确定"
      })
    } else if (name.match(regRule)){
      wx.showModal({
        title: '提示',
        content: '不支持输入表情符号',
        showCancel: false,
        confirmText: "确定"
      })
    } else if (!telephone) {
      wx.showModal({
        title: '提示',
        content: '请输入收货人联系电话',
        showCancel: false,
        confirmText: "确定"
      })
    } else if (!detail) {
      wx.showModal({
        title: '提示',
        content: '请选择收货地址',
        showCancel: false,
        confirmText: "确定"
      })
    } else if (!doorNumber) {
      wx.showModal({
        title: '提示',
        content: '请输入详细的街道门牌信息',
        showCancel: false,
        confirmText: "确定"
      })
    } else if (doorNumber.match(regRule)){
      wx.showModal({
        title: '提示',
        content: '不支持输入表情符号',
        showCancel: false,
        confirmText: "确定"
      })
    } else {
      var that= this;
      wx.showLoading({
        title: '加载中',
        mask: true,
        success: function(res) {}
      })
      //ID为空，表示增加，调用增加接口;ID不为空，表示编辑，调用编辑接口
      if (!value.id) {
        console.log("调用增加接口")
        wx.request({
          url: configParams.ADD_ADDRESS,
          data: {
            userId: app.globalData.userId,
            consigneeName: name,
            consigneePhone: telephone,
            addressDatailed: detail,
            doorNumber: doorNumber,
            isDefault: "0",
            addressCommunity: that.data.address.community,
            longitude: that.data.address.longitude,
            latitude: that.data.address.latitude
          },
          header: {
            "Content-Type": "application/json"
          },
          method: 'POST',
          success: function (result) {
            wx.hideLoading();
            if (result.data.code == "0000") {
              wx.showToast({
                title: '添加成功',
              });
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 500)
            } else {
              console.log(result.data.code + ":" + result.data.desc)
            }
          },
          fail: function (result) {
            wx.hideLoading();
            console.log("添加失败");
            console.log(result);
          },
          complete: function (result) {
            console.log("添加完成");
          }
        })
      } else {
        console.log("调用编辑接口");

      }
    }
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
