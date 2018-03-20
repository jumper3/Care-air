// pages/search/search.js
const app = getApp()

Page({
  data: {
    selectedCity: null,
    presentCity: null,
    historyCities: [],
    hotCities: ['北京','上海','广州','深圳','南京','杭州','天津','沈阳','西安','武汉','重庆','成都']
  },
  onLoad (options) {
    //1. 先更新当前位置,并读取选取城市历史记录
    var historyCities = wx.getStorageSync('historyCities') || []

    this.setData({
      presentCity: app.globalData.city || app.globalData.localAir.basic.location,
      historyCities
    })
  },

  searchCity(e) {
    const cityName = e.detail.value
    console.log(cityName)
  },

  selectCity(e) {
    const selectedCity = e.target.dataset.name
    var historyCities = wx.getStorageSync('historyCities') || []
    //若现历史中无此城市，则加入历史
    !historyCities.includes(selectedCity) && historyCities.unshift(selectedCity)
    wx.setStorageSync('historyCities', historyCities)
    //更新全局数据
    console.log('历史记录' + historyCities )

  },
  cancel () {
    wx.navigateBack()
  },
  deleteHistory () {
    wx.removeStorageSync('historyCities'),
    this.setData({
      historyCities: []
    })
  }
})