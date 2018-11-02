// pages/component/modal-food/modal-food.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spuId: String, // 货品id
    spuName: String, // 货品名
    specList: Array // 货品所有的组合
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    skuList: [], // 货品对应的所有sku
    hadSelectedSkuId: [] // 已经加入购物车的skuId
  },

  attached: function (e) {
    var specList = [{
      "specName": "规格",
      "item": [{
        "id": "sku01",
        "name": "大杯"
      }, {
        "id": "sku02",
        "name": "小杯"
      }]
    },
    {
      "specName": "冷热",
      "item": [{
        "id": "sku01",
        "name": "热"
      }, {
        "id": "sku02",
        "name": "温热"
      }, {
        "id": "sku02",
        "name": "常热"
      }, {
        "id": "sku02",
        "name": "去冰"
      }, {
        "id": "sku02",
        "name": "少冰"
      }, {
        "id": "sku02",
        "name": "多冰"
      }]
    },
    {
      "specName": "甜度",
      "item": [{
        "id": "sku01",
        "name": "无糖"
      }, {
        "id": "sku02",
        "name": "少糖"
      }, {
        "id": "sku02",
        "name": "半糖"
      }, {
        "id": "sku02",
        "name": "多糖"
      }, {
        "id": "sku02",
        "name": "全糖"
      }]
    },
    {
      "specName": "加料",
      "item": [{
        "id": "sku01",
        "name": "常规"
      }, {
        "id": "sku02",
        "name": "珍珠"
      }, {
        "id": "sku02",
        "name": "椰果234234"
      }, {
        "id": "sku02",
        "name": "西米露露露露露"
      }]
    }
    ];
    this.setData({
      specList: specList
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _modalShow: function () {
      console.log(this.properties);
      this.setData({
        isShow: !this.data.isShow
      })
    }
  }
})
