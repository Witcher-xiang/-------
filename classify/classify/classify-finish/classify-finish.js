// classify/classify/classify-finish/classify-finish.js
import { Address } from "../../../util/address.js";
 var address= new Address();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfoStatus:false
  },

  /*修改地址*/
  editAddress:function(event){
    var that=this;
    wx.chooseAddress({ 
      success:function(res){
       // console.log(res)
        that.data.addressInfoStatus=false
        var addressInfo={
            name:res.userName,
            mobile:res.telNumber,
          totalDetail: address.setAddressInfo(res)
        }
        console.log("success="+res);
        that._bindAddressInfo(addressInfo);
      },
      fail:function(res){
        console.log("fail=" + res);
        that.data.addressInfoStatus=true  
      } 
    })
    if (this.data.addressInfoStatus) {
      
      wx.openSetting({
        success(res) {
          that.data.addressInfoStatus = false
        },
        
      })
     
    }
  },

  /*将地址写到data中*/
  _bindAddressInfo:function(addressInfo){
    this.setData({
      addressInfo:addressInfo
    });
  },

  /*支付点击事件函数*/
  /*
  pay:function(){
    // wx.navigateTo({
    //   url: '/mine_pages/location/location',
    // })
    if(!this.data.addressInfo){
      wx.showModal({
        title: '您未填写收货地址',
        content: '请在上方填写收货地址',
      })
      return;
    }

    if(this.data.orderStatus == 0){
      this._firstTimePay();//这个是需要在服务器中创建订单发起支付
    }
    else{
      this._oneMoresTimePay();//这个是已经在历史记录中创建过订单，直接发起支付
    }
  },
  */

  /*第一次支付*/
  _firstTimePay:function(){
    var order = [],
    productInfo = this.data.postArray
  },

  /** 确认支付跳转界面**/
  confirmPay:function(){
    console.log(this.data.addressInfo)
    var userName = this.data.addressInfo.name;
    var userPhone = this.data.addressInfo.mobile;
    var userAddress=this.data.totalDetail;
    wx.request({
      url: 'http://wechatapptest.natapp1.cc/buyer/order/creat',
      data: {
        userName: userName,
        userPhone: userPhone,
        userAddress: userAddress,
        
      },
      method: "POST",
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })

    wx.navigateTo({
      url: '/classify/classify/order-finish/order-finish',
    })
  },

  /*向服务器发送请求*/
  allfinish:function(){
    wx.request({
      url: 'http://wechatapptest.natapp1.cc/takeaway/user/login',
      data: {

        postArray:postArray//[{},{},{}]的数据形式
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },


  //此函数为数组变对象函数
  _object:function(list, values){
    var result = {};
    for(var i = 0; i<list.length;i++){
  if (values) {
    result[list[i]] = values[i];
  } else {
    result[list[i][0]] = list[i][1];
  }
}
return result;  
},

  //函数分为数组分离函数
  split_array: function (arr, len) 
  {
    var a_len = arr.length;
    var result = [];
    for (var i = 0; i < a_len; i += len) {
      result.push(arr.slice(i, i + len));
    }
    return result;
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;//在success回调函数中this发生了改变因此我们需要重新定义一下
    var count=options.count;
    var total=options.total;
    that.setData({
      count:count,
      total:total
    })
    wx.getStorage({
      key: 'arr',
      success: function(res) {
        
          that.setData({
              arrName:res.data.arrName,
              arrNum:res.data.arrNum,
              arrPrice:res.data.arrPrice,
              arrTotal: res.data.arrTotal,
              arrId:res.data.arrId
          })
        
        var arrayId = [];//将对象中的数字变为数组
        for (var i in res.data.arrId) {
          arrayId[i] = that.data.arrId[i];
        }
        //console.log(arrayId);

        var objKeys = Object.keys(res.data.arrName)
        var arrayName = [];//将对象中的数字变为数组
        for (var i in res.data.arrName) {
          arrayName[i] = that.data.arrName[i];
        }
        //console.log(arrayName);
      
        var arrayNum = [];//将对象中的数字变为数组
        for (var i in res.data.arrNum) {
          arrayNum[i] = that.data.arrNum[i];
        }
        // console.log(arrayNum); 
       /*这里是变为数组*/
       
    

    // var arrName = [];//将对象中的名字赋值给数组
    // for (let j in this.data.cart.listName) {
    //   arrName.push(this.data.cart.listName[j])
    // }
        var singalArrName=[];
        singalArrName=that.split_array(arrayName,1)
       // console.log(singalArrName);//singalArrName为一个数组
        
        var singalArrNum = [];
        singalArrNum = that.split_array(arrayNum, 1)
       // console.log(singalArrNum);//singalArrNum为一个数组
        /*这里是拆分数组*/ 

        var singalArrId=[];
        singalArrId = that.split_array(arrayId, 1)
       
         // console.log(singalArrId);//singalArrId为一个数组
      

        var mergeArr = [];//将对象中的数字变为数组
        for (var i in res.data.arrNum) {
          mergeArr[i] = singalArrName[i].concat(singalArrNum[i]);
        }

        var mergeArr01=[];
        for (var i in res.data.arrNum) {
          mergeArr01[i] = singalArrId[i].concat(singalArrNum[i]);
        }
      
        //console.log(mergeArr01)
         /*将两个数组合二为一  console.log(mergeArr)*/
       
        var postArrayForId=[]
        for (let i in res.data.arrNum) {
          var product = ["productId", "productQuanity"];
          /*调用_object函数将数组变为数组对象*/
          postArrayForId[i] = that._object(product, mergeArr01[i]);
        }
       console.log(postArrayForId)

        var postArray=[]
        for (var i in res.data.arrNum){
          var product=["productName","productQuanity"];
          /*调用_object函数将数组变为数组对象*/
          postArray[i] = that._object(product, mergeArr[i]);
        }
        
       
       that.setData({
         postArray:postArray//数组对象
       })
        console.log(that.data)
      },
      
    })
   
    
   
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