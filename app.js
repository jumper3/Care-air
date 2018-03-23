//app.js
App({
  onLaunch: function () {

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
    city: null,           //当前所选城市
    localCity: null,      //定位城市
    district: null,       //城市下辖地区（只在本地模式出现）
    mode: 'local'         //模式 local:本地 other:其他地区
  }
})