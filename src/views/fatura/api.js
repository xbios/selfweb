const _products = [
  { id: 1, title: "iPad 4 Mini", price: 500.01, inventory: 2 },
  { id: 2, title: "H&M T-Shirt White", price: 10.99, inventory: 10 },
  { id: 3, title: "Charli XCX - Sucker CD", price: 19.99, inventory: 5 }
];

//const firmaParams = store.getters.appfirmaParams;

import Vue from "vue";
import store from "../../store";

export default {
  getFatList(params) {
    Vue.resource("getSfatmastList.php")
      .get({
        ...params
      })
      .then(response => {
        store.dispatch("actSetfaturaList", response.body.data);
      })
      .catch(error => {
        console.log(error);
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
