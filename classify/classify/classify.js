// classify/classify/classify.js
var postData=require("../../data/order_data.js");
import { Cart } from '../classify/cart-modle.js';
var cart = new Cart();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataId:1,
    number: 0,
    cart: {
      count: 0,
      total: 0,
      list: {}
    },
  },

  onLoad: function (options) {
    
    this.setData({
     post_key:postData.postlist01,
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  dumplain:function(event){
    var dataId=1;
    this.setData({
      dataId:1,
      post_key: postData.postlist01
    })
  },

  fastFood:function(event){
    var dataId=2;
    this.setData({
      dataId:2,
      post_key:postData.postlist02
    })
  },

  riceNoodles: function (event) {
    var dataId = 3;
    this.setData({
      dataId: 3
    })
  },

  stewed: function (event) {
    var dataId = 4;
    this.setData({
      dataId: 4
    })
  },
  goToSettlement:function(event){
    wx.navigateTo({
      url: '/classify/classify/classify-finish/classify-finish',
    })
  },

  //控制页面切换和动态的点击显示
  
  pricePlus: function (event){

    var orderId=event.currentTarget.dataset.id;
    this.addCard(orderId);
 
       // console.log(postData.postlist01[0])
      //这里就已经加入了缓存
  },

  show:function(event){
    var num=event.currentTarget.dataset.id;
    this.setData({
      
    })
  },
  
  
  priceMinus:function(event){
    var orderId = event.currentTarget.dataset.id;
    this.reduceCart(orderId);

    this.data.ricpeId=orderId;
    
    },

  addCard:function(id){
    var num=this.data.cart.list[id]||0;
    this.data.cart.list[id]=num+1; 
    this.countCart();
    this.setData({
     
    })
  },

  reduceCart: function (id){
    var num = this.data.cart.list[id]||0;
     if (num < 1) {
      this.data.cart.list[id]=0;
    } else {
      this.data.cart.list[id] = num - 1;
    }
    this.countCart();
    
  },

  countCart:function(){
    var count = 0,
     total = 0;
     
    for(var id in this.data.cart.list){

      var postlist = postData.postlist01[id]; //这里需要动态绑定postlist
      count +=this.data.cart.list[id];
      total +=postlist.price * this.data.cart.list[id];
    }
    var orderId = this.data.cart.list[id];
  
    this.data.cart.count = count;
    this.data.cart.total = total;
    numbering: this.data.cart.list[id];
    this.setData({
      cart: this.data.cart,
     
    });
  },


  /*

  onAddingToCartTap:function(event){
   var eventId=event.currentTarget.dataset.id;
    this.addTocart(eventId);
  },

  addTocart:function(eventId){
    var tempObj = {};//如果keys下的数据存在的话就装载到tempObj
    var keys = ['id', 'foodName', 'foodImage', 'price'];

    for (var key in this.postData.postlist01) {
      if (keys.indexOf(key) >= 0) {
        tempObj[key] = this.postData.postlist01[key];
      }
    }
    var app = getApp();
    cart.add(tempObj, this.data.cart.list[eventId])//后一个参数为用户选择    商品数量
  },
*/

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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})