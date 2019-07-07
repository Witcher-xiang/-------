// pages/mine/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
  },

  getUserInfo: function (e) {
    var that = this;
    wx.login({
      success: function (res) {
       
        if (e.detail.userInfo) {
          var code = res.code;
          var iv =e.detail.iv;
          var encryptedData = e.detail.encryptedData;
          wx.request({
            url: 'http://wechatapptest.natapp1.cc/wechat/user/login',
            data:{
              iv: iv,
              encryptedData: encryptedData,
              code:code
            },
            method: "GET",
            header: {
              'content-type': 'application/json' //默认值
            },
          })
          
          app.globalData.userInfo = e.detail.userInfo
          that.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
          })
        }
        else {
          that.setData({
            hasUserInfo: false
          })
          
        }
      }

    })

  },
  back:function(){
   
    wx.navigateTo({
      url: '/classify/classify/classify',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

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