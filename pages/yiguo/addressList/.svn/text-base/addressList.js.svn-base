var app = getApp()
const configParams = require('../../../config')
Page({
  data: {
   addressList: [],
   flag: false
  },
  editAddress: function (e) {
    var address = e.currentTarget.dataset.address;
    console.log(address);
    wx.navigateTo({
      url: "/pages/yiguo/addAddress/addAddress?id=" + address.id + "&name="
      + address.consigneeName + "&telephone=" + address.consigneeMobilePhone + "&province=" + 
      address.addressProvince + "&city=" + address.addressCity + "&area=" + address.addressArea
      + "&isDefault=" + address.isDefault + "&detail=" + address.addressDatailed,
    })
  },
  deleteAddress: function (e){
    var that = this;
    wx.showModal({
      title: '',
      content: '您确定要删除该收货地址？',
      confirmText:"确定",
      cancelText: "取消",
      success: function(res) {
        if (res.confirm) {
          console.log(e.currentTarget.dataset.id);
          console.log(e.currentTarget.dataset);
          wx.request({
            url: configParams.DELETE_ADDRESS,
            data: {
              id: e.currentTarget.dataset.id,
              userId: wx.getStorageSync("userId")
            },
            header: {
              "Content-Type": "application/json"
            },
            method: 'POST',
            success: function (result) {
              if (result.data.code == "00000") {
                wx.showToast({
                  title: '删除成功',
                });
                setTimeout(function () {
                  // wx.navigateTo({
                  //   url: '/pages/yiguo/addressList/addressList',
                  // })
                  that.onShow();
                }, 500)
              } else {
                console.log(result.data.code + ":" + result.data.desc)
              }
            }
          })
        }
      }
    })
  },
  onLoad: function (options) {
    //页面加载
    if (options.flag) {
      this.setData({
        flag: true
      })
    } else {
      this.setData({
        flag: false
      })
    }
  },
  changeSelectedAddress :function(e) {
    console.log(this.data.flag)
    if (this.data.flag) {
      var address = this.data.addressList[e.currentTarget.dataset.index];
      var detail = address.addressDatailed;
      var pages = getCurrentPages();

      console.log(pages)
      var prevPage = pages[pages.length - 2];//上一个页面
      prevPage.setData({
        address: {
          id: address.id,
          name: address.consigneeName,
          telephone: address.consigneePhone,
          detail: detail
        }
      })
      wx.navigateBack({
        delta: 1,
      })
    } else {
      console.log("无操作");
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
    wx.request({
      url: configParams.QUERY_ADDRESSLIST,
      data: {
        "type": "0",
        "userId": app.globalData.userId
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      success: function (result) {
        if (result.data.code == "0000") {
          console.log(result.data.info)
          that.setData({
            addressList: result.data.info
          });
        } else {
          that.setData({
            addressList: []
          });
        }
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
