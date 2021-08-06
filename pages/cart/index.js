// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart_info:[],
    allChecked: false,
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
    const allChecked=cart_info.length?cart_info.every(v=>v.selected):false; 

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
      allChecked,
      total_price,
      total_item
    })

  },

  handleAddress(){
    wx.chooseAddress({
      complete: (res) => {
        console.log(res)
        let address = res;
        address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo; 
        wx.setStorageSync('address', address)
      },
    })

  },



  handle_allcheck(){
    if (this.data.allChecked===true) {
      for (let index = 0; index < this.data.cart_info.length; index++) {
        this.data.cart_info[index].selected = false;
      };
    }else{
      for (let index = 0; index < this.data.cart_info.length; index++) {
        this.data.cart_info[index].selected = true;
      };
    }
    wx.setStorageSync('cart', this.data.cart_info)
    this.onShow();
  },


  

  handleItemChange(e){
    const goods_id = e.currentTarget.dataset.id;
    let {cart_info} = this.data; 
    const index = cart_info.findIndex(v=>v.goods_id===goods_id); 
    cart_info[index].selected = !cart_info[index].selected; 
    this.setData({
      cart_info
    })
    wx.setStorageSync('cart', cart_info);
    this.onShow()
    
  }, 


  handleNumChange(e){
    const {operation, id} = e.currentTarget.dataset; 
    let {cart_info} = this.data; 
    const index = cart_info.findIndex(v=>v.goods_id===id); 
     
    
    if(cart_info[index].num ===1 && operation ===-1){
      wx.showModal({
        title: "提示",
        content: "是否要删除",
        cancelColor: '',
        success: (res) => {
          if (res.confirm){
            cart_info.splice(index, 1);
            this.setData({
              cart_info
            });
            wx.setStorageSync('cart', cart_info);
            this.onShow()
          }else if (res.cancel){
            console.log('cancel')
          }
        } 
      })
    }else{
      cart_info[index].num += operation;
      this.setData({
        cart_info
      })
      wx.setStorageSync('cart', cart_info);
      this.onShow()
    } 
  },

  handlePay(){

    const address = this.data.address; 
    if (!address.userName){
      wx.showToast({
        title: '您还没有选择收获地址',
        icon: 'none'
      })
      return; 
    }

    if (this.data.total_item ===0){ 
      wx.showToast({
        title: '您还没有添加商品',
        icon: 'none'
      })
      return; 
    }
    
    wx.navigateTo({
      url: '/pages/pay/index',
      
    })


  }
  



})


