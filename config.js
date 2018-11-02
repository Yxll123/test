/**
 * 小程序配置文件
 */
//var HOST = "http://10.108.86.17:9093";
 //var HOST = "http://10.108.26.144:7080/eskj_service_dsgj/eskj/fzjy";
// var HOST = "http://47.98.46.75:8080/eskj_service_dsgj/eskj/fzjy";
// var HOST = "http://10.108.26.132:8080/eskj_service_dsgj/eskj/fzjy";

// var HOST = "https://www.aibinong.cn/eskj_service_dsgj/eskj/fzjy";

var config = {

  HOST,

  GET_OPENID_URL: `${HOST}/user/userLogin`,

  GET_USER_URL: `${HOST}/user/queryIsRegister`,

  // 首页banner
  HOME_BANNER_URL: `${HOST}/index/queryBroadcast`,

  // 首页功能模块
  HOME_FUNC_URL: `${HOST}/index/queryFuncModules`,

  // 首页接口
  HOME_GOODS_URL: `${HOST}/goods/queryHotGoods`,
  
  // 查规格
  GOODS_SLTVALUE_URL: `${HOST}/goods/queryGoodsSkus`,

  // 查询商品详情加轮播图
  GET_GOODS_BASE: `${HOST}/goods/querySpuBaseInfo`,

  GET_GOODS_IMAGES: `${HOST}/goods/querySpuDetailsImages`,

  GET_GOODS_VIDEO: `${HOST}/goods/querySpuVideo`,

  GET_USER_CART: `${HOST}/commonCart/queryCart`,

  INSERT_COMMON_CART: `${HOST}/commonCart/insertCart`,

  UPDATE_CART_SELECT: `${HOST}/commonCart/updateSelectStatus`,

  DELETE_COMMON_CART: `${HOST}/commonCart/deleteCart`,

  // 更改购物车商品数量
  UPDATE_CART_GOODS: `${HOST}/commonCart/updateGoodsCnt`,

  QUERY_CLASSIFY: `${HOST}/category/categoryAndGoods`,

  QUERY_ADDRESSLIST: `${HOST}/address/queryUserAddress`,
  
  ADD_ADDRESS: `${HOST}/address/insertUserAddress`,

  QUERY_DEFAULT_ADDRESS: `${HOST}/address/queryUserDefaultAddress`,




  HOME_ACTIVITIES_URL: `${HOST}/xcxUserOrder/queryDiscountConfig`,

  GOOD_DETAIL: `${HOST}/xcxImageBase/querySpuSynInfo`,

  ADD_ORDER: `${HOST}/xcxUserOrder/insertUserConfirmOrder`,

  PAY_ORDER: `${HOST}/xcxUserOrder/payUserConfirmOrder`,

  QRY_ORDER_DETAIL: `${HOST}/xcxUserOrder/queryOrderDetailed`,

  QUERY_CONER: `${HOST}/xcxUserOrder/queryOrderCorner`,

  QUERY_ORDERLIST: `${HOST}/xcxUserOrder/queryOrderList`,

  CANCEL_ORDER: `${HOST}/xcxUserOrder/updateOrderStatusUserCancel`,

  CONFIRM_RECEIVER: `${HOST}/xcxUserOrder/updateOrderStatusConfirmReceiver`,

  DELETE_ADDRESS: `${HOST}/xcxUserAddress/deleteUserAddress`,





  

  UPDATE_ADDRESS: `${HOST}/xcxUserAddress/updateUserAddress`,

  QUERY_ORDERDETAIL: `${HOST}/xcxUserOrder/queryOrderDetailed`,

  // 商品规格页接口
  GOOD_SPECIFY_URL: `${HOST}/`
}

module.exports = config

/**
 * 所有的class名使用：'xx-yy-cc'形式 
 * 所有变量名使用：xxYyCc形式
 * 
 * // 
 * list.forEach(function(arr){
      console.log(arr.id.toString())
      console.log(id)
      if(id==arr.id){
        that.setData({
          detailgood:arr
        })
      }
    })
 */
