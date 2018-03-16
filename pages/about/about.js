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
  },
  preview() {
    wx.previewImage({
      urls: ['http://www.m555.com/mb_pic/2007/09/20070917093919_6a0709.jpg']
    })
  }
})