const _products = [
  { id: 1, title: "iPad 4 Mini", price: 500.01, inventory: 2 },
  { id: 2, title: "H&M T-Shirt White", price: 10.99, inventory: 10 },
  { id: 3, title: "Charli XCX - Sucker CD", price: 19.99, inventory: 5 }
];

const _frID = "1"; //this.$session.get("FRID");
const _Apikey = "8e86b685-88e6-11ea-943a-000c292fbb99";

import Vue from "vue";
//import VueResource from "vue-resource";
//Vue.use(VueResource);
//Vue.prototype.$resource = VueResource;

export default {
  getFatList(params) {
    params.FRID = _frID;
    params.Apikey = _Apikey;
    return Vue.resource("getSfatmastList.php").get({
      ...params
    });
  },

  /////// örnekler
  getProducts(cb) {
    setTimeout(() => cb(_products), 1000);
  },

  getAllFatlist() {
    return Vue.http.get(
      "http://vuez.site/todos/getSfatmastList.php?FRID=1&Apikey=8e86b685-88e6-11ea-943a-000c292fbb99"
    );
  }
};
