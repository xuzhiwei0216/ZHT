//Page Object
Page({
  data: {
    //轮播图数组
    siwperList:[]
  },
  //页面开始加载就会触发
  //options(Object)
  onLoad: function(options){
    //发送异步请求获取轮播图数据    优化手段   promise
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result)=>{
        this.setData({
          siwperList:result.data.message
        })
      },
    });
  },
});