// pages/search/index.js
import {request} from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
      query_result:{},
      inputValue:""
  },
  
  Timeid:-1, 
  isfocus:false,



  handleInput(e){
    
    const {value} = e.detail;
     
    if (!value.trim()){
      this.setData({
        isfocus:false,
        query_result:[]
      })
      return;
    }

    this.setData({
      isfocus:true
    })


    clearTimeout(this.Timeid); 
    this.Timeid=setTimeout(()=>{
      this.qsearch(value);
    },1000);
    
  },



  qsearch(query){
    request({url:"/goods/qsearch", data:{query}}).then(
      res=>{
        console.log(res.data.message)
        this.setData({
          query_result:res.data.message
        })
      }
    )
  
  }, 

  clear_content(){
    this.setData({
      inputValue:"",
      isfocus: false
    })
    console.log('hh')

  }


  
})