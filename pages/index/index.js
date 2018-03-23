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
    district: null,
    mode: 'local'
  },
  onLoad (options) {
    const mode = app.globalData.mode

    if (mode === 'other') {     //3.若是其他城市，加载其他城市模式
      let raw_data = app.globalData.otherAir,
        condition = utils.judgeColor(raw_data.air_now_city.aqi),
        city = app.globalData.city,
        district = ''

      this.setData({
        raw_data,
        condition,
        city,
        district,
        mode
      })

    } else {
      //2.假如是由搜索页跳转回来，则直接加载缓存
      if (options.mode === 'local') {
        let raw_data = app.globalData.localAir,
          condition = utils.judgeColor(raw_data.air_now_city.aqi),
          city = app.globalData.city || raw_data.basic.location,
          district = app.globalData.district || ''

        this.setData({
          raw_data,
          condition,
          city,
          district
        })
      } else {      //1.若是首次进入，请求天气信息
        wx.request({
          url,
          data: {
            location: 'auto_ip',
            key
          },
          success: res => {
            let raw_data = res.data.HeWeather6[0],
              condition = utils.judgeColor(raw_data.air_now_city.aqi),
              city = app.globalData.city || raw_data.basic.location,
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
      }
    }
  },
  toDetail (e) {
    if (e.target.dataset.elem !== 'location') {
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
