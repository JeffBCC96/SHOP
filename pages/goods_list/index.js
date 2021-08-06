// pages/goods_list/index.js
import {request} from "../../request/index.js"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        Name:"综合",
        isActive:true
      },
      {
        id:1,
        Name:"销量",
        isActive:false
      },
      {
        id:2,
        Name:"价格",
        isActive:false
      },
    ],
    goods_list:[]
  },
  
  request_params:{
    query:"",
    cid:"",
    pagenum:1, 
    pagesize:10

  },

  // 总页数
  TotalPage:1,


  handle_itemChange(e){
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v,i)=> { i === index? v.isActive=true:v.isActive=false
    });
    this.setData({
      tabs
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.cid);
    this.request_params.cid = options.cid;
    this.request_goodsList();
  },

  request_goodsList(){
    request({url:"/goods/search", data:this.request_params})
    .then(result=>{
      // console.log(result.data)
      const total_items = result.data.message.total
      this.TotalPage = Math.ceil( total_items / this.request_params.pagesize )
      // console.log(this.TotalPage)
      this.setData({
        goods_list:[...this.data.goods_list, ...result.data.message.goods]
      });
      wx.stopPullDownRefresh();
    })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log("yemian chudi ")
    if(this.request_params.pagenum >= this.TotalPage ){
      console.log('没有下一页了！！！')
      wx.showToast({
        title: '没有下一页了哟',
        // image: "http://icon.chrafz.com/uploads/allimg/160421/1-1604211629180-L.png"
      })
    }else{
      this.request_params.pagenum++;
      this.request_goodsList()
    }

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      goods_list:[]
    });
    this.request_params.pagenum = 1; 
    this.request_goodsList();

  },

  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})