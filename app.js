//app.js
App({
  onLaunch: function () {

    wx.getLocation({
      success: res => {
        const { latitude, longitude } = res
        this.globalData.latitude = latitude
        this.globalData.longitude = longitude
        //获取详细位置
        const lbsKey = 'NTXBZ-OFCAD-PIB4V-HMKNN-LTENJ-B5BXP'
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            location: `${latitude},${longitude}`,
            key: lbsKey
          },
          success: res => {
            if (res.data.status === 0) {
              const { city, district } = res.data.result.address_component
              this.globalData.city = city,
              this.globalData.district = district,
              this.globalData.localCity = city
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
    city: null,           //当前所选城市
    localCity: null,      //定位城市
    district: null,       //城市下辖地区（只在本地模式出现）
    mode: 'local'         //模式 local:本地 other:其他地区
  }
})