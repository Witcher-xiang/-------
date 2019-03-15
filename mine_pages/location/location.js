// mine_pages/location/location.js
import {Address} from "../../util/address.js";
var address=new Address();
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },

  addAdress:function(){
    var that = this;
    wx.chooseAddress({
      success:function(res){
          var addressInfo={
            name: res.userName,
            mobile:res.telNumber,
            totalDetail:address.setAddressInfo(res),
            
          }
          that._bindAddressInfo(addressInfo)
        
        console.log(addressInfo.name);
          
      }
    })
  },

  _bindAddressInfo:function(addressInfo){
    this.setData({
      addressInfo:addressInfo
      
    });
  }

})