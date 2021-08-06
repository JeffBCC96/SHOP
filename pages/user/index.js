Page({
  data: {
    
    userInfo:{}
  },
  onLoad: function() {
    // 查看是否授权
    const userInfo = wx.getStorageSync('userInfo'); 
    this.setData({
      userInfo
    })
    console.log(this.data.userInfo)

  }
})