// classify/classify/classify.js
var postData=require("../../data/order_data.js");
var classify=require("../../data/classify_data.js");
import { Cart } from '../classify/cart-modle.js';
var cart = new Cart();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIntroduceStatus:false,
    dataId:0,
    number: 0,
    classifySeleted: "data"+ 0,
    cart: {
      count: 0,
      total: 0,
      list: {},
      listName:{},
      listImage:{},
      listPrice:{},
      listId:{}
    },
    showCartDetail: true
  },

  onLoad: function (options) {
    var that=this;
   wx.getSystemInfo({
      success: function(res) {
        that.setData({
          selfHeight:res.windowHeight
        })
      },
      
    })

    /**获取商品列表信息*/
    wx.request({
      url: 'http://wechatapptest.natapp1.cc/buyer/product/list',
      method:"GET",
      header: {
        'content-type': 'application/json' //默认值
      },
      
      success: function (res) {
        //console.log(res)
        
      }
    })


    var postDataList=[postData.postlist01, postData.postlist02];
    this.setData({
     post_key:postData.postlist01,
      postDataList: postDataList,
      post_classify: classify.classifyName,
    })
   
 },
  /**
   * 生命周期函数--监听页面加载
   */
  dumplain:function(event){
    var dataId=0;
    this.setData({
      dataId:0,
      post_key: postData.postlist01
    })
  },

  fastFood:function(event){
    var dataId=1;
    this.setData({
      dataId:1,
      post_key:postData.postlist02
    })
  },

  riceNoodles: function (event) {
    var dataId = 2;
    this.setData({
      dataId: 2
    })
  },

  stewed: function (event) {
    var dataId = 3;
    this.setData({
      dataId: 3
    })
  },

 
  goToSettlement:function(event){
    if (app.globalData.userInfo){
    var arrNum=this.data.cart.list;
    var arrName=this.data.cart.listName;
    var arrPrice=this.data.cart.listPrice;
    var arrTotal = this.data.cart.total;
    var arrId=this.data.cart.listId;
    wx.setStorage({
      key: 'arr',
      data: { arrName, arrNum, arrPrice, arrTotal, arrId},
      success:function(){
      }
    })
 

  
    wx.navigateTo({
      url: '/classify/classify/classify-finish/classify-finish?arrNum=' + arrNum + "&arrName=" + arrName + "&total=" + this.data.cart.total + "&count="+this.data.cart.count
    })
    }
    else {
      wx.showModal({
        title: "提示",
        content: "为了更好的用户体验请同意授权哦~",
        success: function (ress) {
          if (ress.confirm) {
            wx.navigateTo({
              url: '/pages/mine/login/login',
            })
          }
        }
      })
    }
  },

  
  //控制页面切换和动态的点击显示
  
  pricePlus: function (event){

    var orderId=event.currentTarget.dataset.id;
    this.addCard(orderId);
  },

  show:function(event){
    var num=event.currentTarget.dataset.id;
    this.setData({
      
    })
  },
  
  priceMinus:function(event){
    var orderId = event.currentTarget.dataset.id;
    this.reduceCart(orderId);
    /** Object.getOwnPropertyNames是一个es6的方法 获取到对象中的属性名，存到一个数组      ** 中，返回数组对象，我们可以通过判断数组的length来判断此对象是否为空*/
    var arr=Object.getOwnPropertyNames(this.data.cart.list)
    if (arr.length == 0)
    {
      this.setData({
        showCartDetail:true
      })
   
    }
    },

  addCard:function(id){
    var num=this.data.cart.list[id]||0;
    this.data.cart.list[id]=num + 1; 
    this.data.cart.listName[id] = this.data.postDataList[this.data.dataId][id].foodName;
    this.data.cart.listImage[id] = this.data.postDataList[this.data.dataId][id].foodImage;
    //在此listName这个对象下添加事物名
    this.data.cart.listPrice[id] = this.data.postDataList[this.data.dataId][id].price;

    /*判断id列表中id是否存在*/
    if(this.data.cart.listId[id]){}
    else { this.data.cart.listId[id]= id}

    console.log(this.data.cart)
    this.countCart();
  },

  reduceCart: function (id){
    var num = this.data.cart.list[id]||0;
     if (num < 2) {
       delete this.data.cart.listName[id] ;
       delete this.data.cart.listImage[id];
       delete this.data.cart.list[id];
       delete this.data.cart.listPrice[id];
       delete this.data.cart.listId[id];
    } else {
      this.data.cart.list[id] = num - 1;
    }
    this.countCart();
  },

  countCart:function(){
    var count = 0,
     total = 0;
     
    for(var id in this.data.cart.list){
      var postlist = this.data.postDataList[this.data.dataId][id]; //这里需要动态绑定postlist
      count +=this.data.cart.list[id];
      total +=postlist.price * this.data.cart.list[id];
    }
 
  
    this.data.cart.count = count;
    this.data.cart.total = total;
   
 
    this.setData({
      cart: this.data.cart,
    });  
  },

   /* 菜单滚动函数 */ 
  onGoodsScroll:function(e){
    var typeLength = 0;
    var that = this; 
    var scale = e.detail.scrollWidth / 750,
      scrollTop = e.detail.scrollTop / scale,
      h = 0,
      classifySeleted,
      len = that.data.post_classify.length;

    var typeLength = 0;
    that.data.post_classify.forEach(function (classify, i) {
      var typeLength = 0;
      for (var j in that.data.post_key) {
        if (that.data.post_classify[i].categoryType== that.data.post_key[j].categoryType){
          typeLength++;
        }
    }
    
      var _h = 60 + typeLength * (46 * 3 + 20 * 2);
      if (scrollTop >= h - 100 / scale) {
        classifySeleted ="data"+ classify.id;
       // console.log(classify)
      }
      h += _h;
    });
    this.setData({
      classifySeleted: classifySeleted
    });
  },
  /**点击切换按钮**/
  tapClassify: function (e) {
    var classifyId ="data"+ e.target.dataset.id;
 
    this.setData({
      classifyViewed:classifyId
    });
    var self = this;
    setTimeout(function () {
      self.setData({
        classifySeleted: classifyId
      });
    }, 100);
  },
  
introduce:function(event){
  var showId=event.currentTarget.dataset.id;
 
  this.setData({
    showId:showId,
    showIntroduceStatus:true
  })
},
close:function(){
  this.setData({
    showIntroduceStatus: false
  })
},


/**购物车隐藏菜单 */
  showCartDetail: function () {
    if(this.data.cart.count!=0){
    this.setData({
      showCartDetail: !this.data.showCartDetail
    });
    }
  },
  hideCartDetail: function () {
    this.setData({
      showCartDetail: true
    });
  },
    mask:function(){
      this.setData({
        showIntroduceStatus:false
      })
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