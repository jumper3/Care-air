// pages/search/search.js
const app = getApp()
const url = 'https://free-api.heweather.com/s6/air'
const key = 'c1a2bfdfd7b24fedb0471abae87e46f7'
const cities = require('../../utils/cities.js')

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
      presentCity: app.globalData.localCity,
      historyCities
    })
  },

  searchCity(e) {
    const cityName = e.detail.value

  },

  selectCity(e) {
    const selectedCity = e.target.dataset.name
    var historyCities = wx.getStorageSync('historyCities') || []
    //若现历史中无此城市，则加入历史
    !historyCities.includes(selectedCity) && historyCities.unshift(selectedCity)
    wx.setStorageSync('historyCities', historyCities)

    //更新全局数据
    app.globalData.city = selectedCity
    app.globalData.mode = 'other'

    wx.showLoading({
      title: '切换中',
    })

    wx.request({
      url: url,
      data: {
        location: selectedCity,
        key
      },
      success: res => {
        app.globalData.otherAir = res.data.HeWeather6[0]
        wx.reLaunch({
          url: '../index/index?mode=other',
        })
      }
    })
  },
  selectLocalCity() {
    app.globalData.city = app.globalData.localCity
    app.globalData.mode = 'local'
    wx.reLaunch({
      url: '../index/index?mode=local',
    })
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