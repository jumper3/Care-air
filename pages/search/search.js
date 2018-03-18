// pages/search/search.js
const app = getApp()

Page({
  data: {
    selectedCity: null,
    presentCity: null
  },
  onLoad (options) {
    //1. 先更新当前位置
    this.setData({
      presentCity: app.globalData.city
    })
  },
  searchCity(e) {
    const cityName = e.detail.value
    console.log(cityName)
  },
  selectCity(e) {
    const selectedCity = e.target.dataset.name
    //更新全局数据
    console.log(selectedCity)

  },
  cancel () {
    wx.navigateBack()
  }
})