
/**
 * post请求公共方法
 * name:访问的接口
 * url:接口url
 * jsonData:请求数据
 * commonBack:访问接口后的通用回调
 * callback:访问成功回调
 **/
function post(name, url, jsonData, commonBack, callBack) {
  wx.request({
    url: url,
    data: jsonData,
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    success: function (res) {
      callBack && callBack(res);
    },
    fail: function (res) {
      console.log("调" + name + "接口失败");
    },
    complete: function (res) {
      commonBack && commonBack();
    }
  })
}

module.exports = {
  post: post
}