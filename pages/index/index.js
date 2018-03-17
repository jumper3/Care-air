//index.js
//获取应用实例
const app = getApp()
const url = 'https://free-api.heweather.com/s6/air'
const key = 'c1a2bfdfd7b24fedb0471abae87e46f7'
const utils = require('../../utils/util.js')

Page({
  data: {
    raw_data: null,
    condition: null,
    city: null,
    district: null
  },
  onLoad: function() {
    
    wx.request({
      url,
      data: {
        location: 'auto_ip',
        key
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        let raw_data = res.data.HeWeather6[0],
          condition = utils.judgeColor(raw_data.air_now_city.aqi),
          city = app.globalData.city || raw_data.basic.location ,
          district = app.globalData.district || ''

        this.setData({
          raw_data,
          condition,
          city,
          district
        })
        app.globalData.localAir = raw_data
      }
    })
  },
  toDetail (e) {
    if (e.target.dataset.elem === 'card') {
      wx.navigateTo({
        url: '../detail/detail'
      })
    } else {
      wx.navigateTo({
        url:'../search/search'
      })
    }
  },
  onShareAppMessage (res) {
    return {
      title: '我所在的城市，空气质量是……',
      path: '../index/index'
    }
  }
})
