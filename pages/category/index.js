//引入发送请求的方法
import {request} from "../../request/index.js";
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧的菜单数据
    leftMenuList:[],
    //右侧的商品数据
    rightContent:[],
  },
  //接口返回数据
  Cates:[],

  onLoad:function(options){
    this.getCates();
  },
  //获取分类数据
  getCates(){
    request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"
    })
    .then(res =>{
      this.Cates=res.data.message;
      //构造左侧的大菜单数据
      let leftMenuList = this.Cates.map(v=>v.cat_name);
      //构造右侧的商品数据
      let rightContent = this.Cates[0].children;

      this.setData({
        leftMenuList,
        rightContent
      })
    })
  }
})