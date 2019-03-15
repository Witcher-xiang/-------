import {Index} from "index-modle"
var index=new Index;
Page({
  data: {

  },
  
  onLoad: function ()  {
    this._loadData();
  },
 
  _loadData: function () {         //定义一个私有化的函数
    var id = 1;                       //id需要前端传过来，首先随意定义一个
    var data = index.getBannerData(id,this.callBack)          //回调函数,箭头函数)
  },

  callBack: function (res) {
    console.log(res);
    this.setData({
      'bannerArr': res
    });
  },
  noodles:function(){
    wx.navigateTo({
      url: '/classify/classify/classify',
    })
  }

 
})






// getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }获取用户信息函数
