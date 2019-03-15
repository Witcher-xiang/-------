import { Base } from "../../util/base.js"


class Cart extends Base {
  constructor() {
    super();
    thsi._storageKeyName = 'cart';//其他地方也会用到
  }
  /*
    *加入到购物车
    *如果之前没有这样的商品，则直接添加一条新的记录，数量为counts
    *如果有，则只将相应数量 + counts
    *@params:
    *itme - {obj} 商品对象,
    *counts - {int} 商品数目,
  */


  add(item, counts) {
    var cartData = this.getCartDataFromLocal();//从缓存中拿到数据 

    var isHasInfo = this._isHasThatOne(item.id, cartData);
    if (isHasInfo.index == -1) {//判断这个商品有没有 item.id是商品的id
      item.counts = counts;//如果没有此商品就添加一个counts属性
      item.selectStatus = true; //设置商品选中状态
      cartData.push(item);//添加item进来
    }
    else {
      cartData[isHasInfo.index].counts += counts;
      //如果有的话直接加数量即可
    }
    wx.setStorageSync(this._storageKeyName, cartData)
  }


  /*
    从缓存中读取购物车数据
  */
  getCartDataFromLocal() {
    var res = wx.getStorageSync(this._storageKeyName);
    if (!res) {
      res = [];//如果缓存为空则返回一个空数组
    }
    return res;
    //此为获取购物车数据缓存的函数
  }


  /*
  * 判断某个商品是否已经被添加到购物车中，并且返回这个
  * 商品数据，以及所在序号
  */
  _isHasThatOne(id, arr) { //判断缓存中的数据是否拿到,这个数组就为item数组
    var item,
      result = { index: -1 };
    for (let i = 0; i < arr.length; i++) {
      item = arr[i];
      if (item.id == id) {
        result = {
          index: i,
          data: item
        };
      };
      break;
    }
    return result;
  }
}
export { Cart }