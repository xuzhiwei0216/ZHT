//引入发送请求的方法
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧的菜单数据
    leftMenuList: [],
    //右侧的商品数据
    rightContent: [],
    //被点击的左侧商品的菜单
    currentIndex: 0,
    //右侧内容的滚动条距离顶部的距离
    scrollTop: 0
  },
  //接口返回数据
  Cates: [],

  onLoad: function (options) {
    //  0 小程序中本地存储和wab中存储的区别
    //1  写法
    //web：localStorage.steItem{"key" "value"} localStorage.getItem{"key"} 
    //小程序： wx.setStorageSync("key" "value");const Cates = wx.getStorageSync("key");
    //2  存的时候有没有做类型转换
    // web 不管存什么类型的数据都要调用一下tostring（）  然后再存
    //小程序  不存在什么类型转换  存什么类型获取的时候就是什么类型

    //1  先判断本地存储中有没有旧数据
    //2 没有旧数据重新发请求
    //3 有旧数据同时旧数据也没有过期就使用本地存储的数据
    //1 获取本地存储的数据（小程序中也是存在本地存储  技术）
    const Cates = wx.getStorageSync("cates");
    //2 判断
    if (!Cates) {
      //不存在   发送请求
      this.getCates();
    } else {
      //有旧数据的时候  定义过期时间
      if (Date.now() - Cates.time > 1000 * 10) {
        //重新发送请求
        this.getCates();
      } else {
        //可以使用旧数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  //获取分类数据
  async getCates() {
    // request({
    //   url: "/categories"
    // })
    //   .then(res => {

    //     this.Cates = res.data.message;


    //     // 把接口数据存入到本地存储中
    //     wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });



    //     //构造左侧的大菜单数据
    //     let leftMenuList = this.Cates.map(v => v.cat_name);
    //     //构造右侧的商品数据
    //     let rightContent = this.Cates[0].children;

    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    //   })

    //1  使用es7async  await 来发送请求
    const res = await request({ url: "/categories" });
    this.Cates = res;


    // 把接口数据存入到本地存储中
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });



    //构造左侧的大菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name);
    //构造右侧的商品数据
    let rightContent = this.Cates[0].children;

    this.setData({
      leftMenuList,
      rightContent
    })
  },
//左侧菜单的点击事件
handleItemTap(e) {
  // 1  获取点击的标题身上的索引
  // 2  给data中的currentIndex赋值
  //根据不同的索引渲染把不同的内容
  const { index } = e.currentTarget.dataset;
  let rightContent = this.Cates[index].children;

  this.setData({
    currentIndex: index,
    rightContent,
    //重新设置右侧内容的scroll-view 标签的距离顶部的距离
    scrollTop: 0
  })


}
})