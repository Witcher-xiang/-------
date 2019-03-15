//我们在这里封装一个发送请求的函数
import { Config } from "../util/config.js";//或者使用相对路径也可
class Base {

  constructor() {
    this.baseRequestUrl = Config.restUrl;
  }

  request(params) {//params为一些传入参数的值
    var url = this.baseRequestUrl + params.url;

    if (!params.type) {
      params.type = 'GET';
    }

    wx.request({
      url: url,
      data: params.data, //POST请求中body的参数

      method: params.type,
      responseType: 'text',
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token') //此函数为传递令牌的
      },
      success: function (res) {
        params.sCallBack && params.sCallBack(res);

      },
      fail: function (res) {

      },
    })
  }
}
export { Base };

