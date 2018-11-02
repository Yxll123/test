const url = require('./config')

function login(th) {
  var that = th
  wx.login({
    success: function (res) {
      wx.request({
        url: url.GET_OPENID_URL + "/" + res.code,
        data: {},
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (res.data.code == "0000") {
            var openId = res.data.info.wxOpenid
            var userId = res.data.info.id

            that.globalData.openId = openId
            that.globalData.userId = userId

            try {
              wx.setStorageSync('abnOpenId', openId)
              wx.setStorageSync('abnUserId', userId)
            } catch (e) {
              console.log(e)
            }
          }
        },
        fail: function (res) {
          console.log("调用获取openId的接口失败")
        },
      })
    },
    fail:function(res) {
      console.log(res)
    }
  })
}

App({
  onLaunch: function (options) {
    console.log("===APP onLaunch===");

    var openId = wx.getStorageSync('abnOpenId');
    var userId = wx.getStorageSync('abnUserId');
    if (openId == '' || userId == '') {
      login(this)
    } else {
      this.globalData.openId = openId
      this.globalData.userId = userId
      
      var that = this
      wx.checkSession({
        success: function (res) {
          console.log("登录态未过期");
          wx.request({
            url: url.GET_USER_URL + "/" + userId,
            data: {},
            header: {
              'content-type': 'application/json'
            },
            method: 'POST',
            dataType: 'json',
            success: function(res) {
              if (res.data.code != "0000" || res.data.info == null) {
                login(that);
              }
            },
            fail: function(res) {
              // 只有ip:port访问不通，才进入fail回调
              console.log("调用获取用户信息接口失败")
            }
          })
        },
        fail: function (res) {
          login(that)
        }
      })
    }
  },
  onShow: function (options) {
    // Do something when show.
  },
  onHide: function () {
    // Do something when hide.
  },
  onError: function (msg) {
    console.log(msg)
  },
  globalData: {
    openId:'',
    userId:''
  }
})