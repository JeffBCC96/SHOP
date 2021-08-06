// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart_info:[],
    total_price:0,
    total_item: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow(){
    const address=wx.getStorageSync('address'); 
    const cart_info=wx.getStorageSync('cart')||[]; 
    let checked_cart=cart_info.filter(v=>v.selected); 
    

    let total_price=0;
    let total_item = 0;
    for (let index = 0; index < cart_info.length; index++) {
      const element = cart_info[index];
      if (element.selected){
        total_price += element.goods_price * element.num;
        total_item += element.num
      }
    }

    this.setData({
      address, 
      cart_info,
      total_price,
      total_item,
      cart_info:checked_cart
    })
    wx.setStorageSync('cart', checked_cart);

  },

  handlePay(){
    wx.navigateTo({
      url: '/pages/rong_pay/index',
    })
  }




})


