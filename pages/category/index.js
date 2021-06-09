//引入发送请求的方法
import {request} from "../../request/index.js";
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
  },

  onLoad:function(options){
    this.getCates();
  },
  //获取分类数据
  getCates(){
    request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"
    })
    .then(res =>{
      console.log(res);
    })
  }
})