const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invoiceType: [
      {
        name: '无',
        selected: false
      },
      {
        name: '个人',
        selected: false
      },
      {
        name: '公司',
        selected: false
      }
    ],
    invoice: {
      itype: '',
      name: '',
      no: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var typeName = options.itype
    var name = options.name
    var no = options.no

    var invoiceType = this.data.invoiceType
    for (var i in invoiceType) {
      if (invoiceType[i].name == typeName) {
        invoiceType[i].selected = true;
        continue
      }
    }
    this.data.invoice.itype = typeName
    this.data.invoice.name = name
    this.data.invoice.no = no
    this.setData({
      invoiceType: this.data.invoiceType,
      invoice: this.data.invoice
    })

  },
  onShow: function () {

  },
  selectType:function(e) {

    var invoiceType = this.data.invoiceType
    for (var i in invoiceType) {
      if (e.currentTarget.dataset.typeIdx == i) {
        invoiceType[i].selected = true
        this.data.invoice.itype = invoiceType[i].name
      } else {
        invoiceType[i].selected = false
      }
    }

    this.setData({
      invoiceType: this.data.invoiceType,
      invoice: this.data.invoice
    })
  },
  inputName: function (e) {
    var value = e.detail.value
    this.data.invoice.name = value
    this.setData({
      invoice: this.data.invoice
    })
  },
  inputNo:function(e) {
    var value = e.detail.value
    this.data.invoice.no = value
    this.setData({
      invoice: this.data.invoice
    })
  },
  confirm:function() {

    if (this.data.invoice.itype == '无') {
      this.data.invoice.name ='';
      this.data.invoice.no = '';
    }
    if (this.data.invoice.itype == '个人') {
      if (this.data.invoice.name == '') {
        wx.showToast({
          title: '请填写完整信息',
          icon: 'none',
          duration: 1000,
        })
        return;
      }
      this.data.invoice.no = '';
      
    } else if (this.data.invoice.itype == '公司' && (this.data.invoice.name == '' || this.data.invoice.no == '')) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 1000,
      })
      return;
    }

    if (util.utf16toEntities(this.data.invoice.name) || util.utf16toEntities(this.data.invoice.no)) {
      return;
    }

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //上一个页面
    var prevPage = pages[pages.length - 2]; //上一个页面

    var invoice = this.data.invoice;
    console.log(invoice);
    prevPage.setData({
      invoice: invoice
    })

    wx.navigateBack({
      delta: 1,
    })
  }
})