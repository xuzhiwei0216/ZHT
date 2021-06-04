//引入发送请求的方法
import {request} from "../../request/index.js";
//Page Object
Page({
  data: {
    //轮播图数组
    siwperList:[],
    //导航数组
    catesList:[],
    //楼层数据
    floorList:[]
  },
  //页面开始加载就会触发
  //options(Object)
  onLoad: function(options){
    //发送异步请求获取轮播图数据    优化手段   promise
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     this.setData({
    //       siwperList:result.data.message
    //     })
    //   },
    // });
    this.gitSwiperList();
    this.gitCatesList();
    this.gitFloorList();
  },

  //获取轮播图数据
  gitSwiperList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"})
    .then(result => {
      this.setData({
              siwperList:result.data.message
            })
    })
  },
  //获取导航数据
  gitCatesList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"})
    .then(result => {
      this.setData({
        catesList:result.data.message
            })
    })
  },
  //获取楼层数据
  gitFloorList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"})
    .then(result => {
      this.setData({
        floorList:result.data.message
            })
    })
  }
});