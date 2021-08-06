// pages/goods_detail/index.js
import {request} from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsOBJ:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options;
    this.request_goodsDetail(goods_id);
  },

  request_goodsDetail(goods_id){
    request({url:"/goods/detail", data:{goods_id}})
    .then(result=>{
      // console.log(result.data.message)
      this.setData({goodsOBJ:result.data.message})
    //   const total_items = result.data.message.total
    //   this.TotalPage = Math.ceil( total_items / this.request_params.pagesize )
    //   // console.log(this.TotalPage)
    //   this.setData({
    //     goods_list:[...this.data.goods_list, ...result.data.message.goods]
    //   });
    //   wx.stopPullDownRefresh();
    })
  },

  handlePreview(e){
    const current = e.currentTarget.dataset.url;
    const urls=this.data.goodsOBJ.pics.map(v=>v.pics_mid);
    wx.previewImage({
      current: current, 
      urls: urls,
    })
  }, 

  handleAddCart(){
    console.log('bucuo')

    let cart = wx.getStorageSync('cart')||[];
    
    let index=cart.findIndex(v=>v.goods_id===this.data.goodsOBJ.goods_id); 
    if(index===-1){
      this.data.goodsOBJ.num=1; 
      this.data.goodsOBJ.selected=true; 
      cart.push(this.data.goodsOBJ);
    }
    else{
      cart[index].num ++;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      mask: true,
      icon: 'success'
    })
  },


  pay(){

    wx.navigateTo({
      url: '/pages/pay/index',
    })
  } 


})

