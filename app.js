//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.getLocation({
      success: res => {
        this.globalData.latitude = res.latitude
        this.globalData.longitude = res.longitude
        //获取详细位置
        const lbsKey = 'NTXBZ-OFCAD-PIB4V-HMKNN-LTENJ-B5BXP'
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            location: `${res.latitude},${res.longitude}`,
            key: lbsKey
          },
          success: res => {
            if (res.data.status === 0) {
              this.globalData.city = res.data.result.address_component.city,
              this.globalData.district = res.data.result.address_component.district,
              this.globalData.localCity = res.data.result.address_component.city
            } else {
              alert ("定位失败")
            }
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,       //用户信息
    latitude: null,       //初次定位纬度
    longitude: null,      //初次定位经度
    localAir: null,       //本地天气数据
    otherAir: null,       //其他城市天气数据
    city: null,           //所选城市
    localCity: null,      //定位城市
    district: null,       //城市下辖地区（只在本地模式出现）
    mode: 'local'         //模式 local:本地 other:其他地区
  }
})