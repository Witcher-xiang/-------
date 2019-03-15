import {Base} from 'base.js';
class Address extends Base{
  constructor(){
    super();
  }


  setAddressInfo(res) {
    var province = res.province || res.province,
      city = res.cityName || res.city,
      
      detail = res.detailInfo || res.detail;

      var totalDetail = city  + detail;

    return totalDetail;
  };

  //更新保存地址
  // submitAddress(data,callback){
  //   data = this._setUpAddress(data);
  //   var param={
  //     url:'address',
  //     type:'post',
  //     data:data,
  //     sCallback:function(res){
  //       callback && callback(true,res);
  //     },eCallback(res) {
  //       callback && callback(false, res);
  //     }
  //   };
  //   this.request(param);
  // }
 
}
export {Address}

  