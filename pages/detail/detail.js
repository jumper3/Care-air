// pages/detail/detail.js
const app = getApp()
const utils = require('../../utils/util.js')

Page({
  data: {
    raw_data: null,
    condition: null,
    pub_time: null,
    aqi: null
  },
  onLoad () {
    let raw_data = app.globalData.localAir,
        aqi = raw_data.air_now_city.aqi,
        condition = utils.judgeColor(aqi),
        color = utils.colorCode(condition),
        city = app.globalData.city,
        district = app.globalData.district,
        pub_time = raw_data.air_now_city.pub_time.slice(-6)
    
    console.log(raw_data)
    
    this.setData({
      raw_data,
      condition,
      pub_time,
      aqi
    })

    wx.setNavigationBarTitle({
      title: city ?  city + ' ' + district : raw_data.basic.location
    })

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: color,
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

  },
  toAbout(e) {
    wx.navigateTo({
      url: `../about/about?label=${e.target.dataset.label}`,
    })
  },
  toReward() {
    wx.previewImage({
      urls: ['https://wx2.sinaimg.cn/mw690/cc77ade0gy1fpeqb38dk3j20f00k840a.jpg'],
    })
  },
  onShareAppMessage(res) {
    return {
      title: '我所在的城市，空气质量是……',
      path: '../index/index'
    }
  }
})