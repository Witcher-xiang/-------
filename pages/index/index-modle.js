class Index{
  
  constructor(){

  }
  getBannerData(id, callBack) {
  wx.request({
    url: 'http://www.baidu.com/xx/xx/xx/' + id,
    success: function (res) {
      callBack(res);
    }

  })
}

}
export{Index};