// pages/goods_list/index.js
//引入发送请求的方法
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      },
    ],
    //接口参数
    QueryParams:{
      query:"",
      cid:"",
      pagenum:1,
      pagesize:10
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams=options.cid;
    this.getGoodsList()
  },
  //获取商品列表数据
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.QueryParams});
    console.log(res)
  },

  //标题的点击事件  从子组件传递过来的
  tabsItemChange(e) {
    console.log(e)
    //获取被点击的标题
    const { index } = e.detail;
    //修改原数组
    let { tabs } = this.data;
    console.log(tabs)
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    //赋值到data
    this.setData(
      { tabs }
    )
  }
})