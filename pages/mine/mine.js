//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
    userInfo: {},
    hasUserInfo: false,
  },


  address:function(){
      wx.navigateTo({
        url: '/pages/order/order',
      })
  },

  userData:function(){
   
    wx.navigateTo({
      url: '/mine_pages/userData/userData' 
    })
   
  },

  notice:function(){
    wx.navigateTo({
      url: '/mine_pages/notice/notice',
    })
  },




  //事件处理函数
 
  onLoad: function () {
   
  },

  /** 获取登录code与用户信息函数**/
 
  getUserInfo: function (e) {
    var that=this;
    wx.login({
      success: function(res) {
        if (e.detail.userInfo){
          var code = res.code;
          wx.getUserInfo({
            success: function (res) {
              var iv = res.iv;
              var encryptedData = res.encryptedData;
              wx.request({
                url: 'http://wechatapptest.natapp1.cc/wechat/user/login',
                data: {
                  iv: iv,
                  encryptedData: encryptedData,
                  code: code
                },
                method:"GET",
                header: {
                  'content-type': 'application/json' //默认值
                },
                success: function (res) {
                 
                }
              })
            }
          })
        app.globalData.userInfo = e.detail.userInfo
        that.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
          })
         }
        else{
          that.setData({
            hasUserInfo: false
          })
          wx.showModal({
            title:"提示",
            content:"为了更好的用户体验请同意授权哦~",
            success:function(ress){
              if(ress.confirm){
                
              }
            }
          })
        }
      } 
    
       })
    
  }
})
