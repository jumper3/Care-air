// pages/about/about.js
const utils = require('../../utils/util.js')

Page({
  data: {
    label: null
  },
  onLoad (options) {
    this.setData({
      label: options.label
    })
    
    const title = utils.getTitle(options.label)

    wx.setNavigationBarTitle({
      title: title
    })
  }
})