// pages/detail/detail.js
const app = getApp()
const utils = require('../../utils/util.js')

Page({
  data: {
    raw_data: null,
    condition: null,
    pub_time: null,
    aqi: null,
    mode: 'local',
    isNotify: false
  },
  onLoad () {
    const mode = app.globalData.mode

    if (mode === 'other') {
      var raw_data = app.globalData.otherAir,
        aqi = raw_data.air_now_city.aqi,
        condition = utils.judgeColor(aqi),
        color = utils.colorCode(condition),
        city = app.globalData.city,
        district = '',
        pub_time = raw_data.air_now_city.pub_time.slice(-6)
    } else {
      var raw_data = app.globalData.localAir,
        aqi = raw_data.air_now_city.aqi,
        condition = utils.judgeColor(aqi),
        color = utils.colorCode(condition),
        city = app.globalData.city,
        district = app.globalData.district,
        pub_time = raw_data.air_now_city.pub_time.slice(-6)
    }
    
    this.setData({
      raw_data,
      condition,
      pub_time,
      aqi,
      mode
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
      urls: ['http://ww4.sinaimg.cn/large/0060lm7Tly1fpn619qmn7j30fr0m20xd.jpg'],
    })
  },
  toggleNotify(){
    this.setData({
      isNotify: !this.data.isNotify
    })
  },
  onShareAppMessage(res) {
    const title = `${app.globalData.city}，${this.data.raw_data.air_now_city.qlty}，AQI:${this.data.raw_data.air_now_city.aqi}`
    return {
      title,
      path: '/pages/index/index'
    }
  }
})