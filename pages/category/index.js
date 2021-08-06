// pages/category/index.js
import { request } from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    left_menu:[],
    right_content:[],
    currentIndex:0,
    scroll_top_value:0

  },

  Cate:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 本地缓存技术
    // 小程序中 获取本地数据是wx.getStorageSync() ;  存储是 wx.setStorageSync('key', data) 
    // 并且存储后数据类型不变

    const Cate = wx.getStorageSync('cates');
    if (!Cate){
      this.get_cateData();
    }else{
      if(Date.now() - Cate.time > 1000 * 10){
        this.get_cateData();
      }else{
        console.log('no_request');
        this.Cate = Cate.data;
        let left_menu = this.Cate.map(v => v.cat_name);
        let right_content = this.Cate[this.data.currentIndex].children;
       
        this.setData({
          left_menu,
          right_content
        })
        
      }
    }

  },

  get_cateData(){
    request({url:"/categories"})
    .then(result=>{
      this.Cate = result.data.message;

      wx.setStorageSync('cates', {time:Date.now(), data:this.Cate})
      let left_menu = this.Cate.map(v => v.cat_name);
      let right_content = this.Cate[this.data.currentIndex].children;

      this.setData({
        left_menu,
        right_content
      })
    }
    )
  },

  menu_tap(e){
    let currentIndex = e.currentTarget.dataset.index
    let right_content = this.Cate[currentIndex].children;

    this.setData({
      currentIndex,
      right_content,
      // 重置滚动条置顶
      scroll_top_value:0
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})