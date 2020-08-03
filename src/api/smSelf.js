const _products = [
  { id: 1, title: "iPad 4 Mini", price: 500.01, inventory: 2 },
  { id: 2, title: "H&M T-Shirt White", price: 10.99, inventory: 10 },
  { id: 3, title: "Charli XCX - Sucker CD", price: 19.99, inventory: 5 }
];

const _dizi = 1;
const _object = 0;

//const firmaParams = store.getters.appfirmaParams;

import Vue from "vue";
import store from "../store";

export default {
  //getTable
  getTable(_tablename, _yontem, params) {
    if (_tablename === "sfatmast") {
      if (_yontem === "Liste")
        this.getData(params, "getSfatmastList.php", "actSetfaturaList", _dizi);
      if (_yontem === "Edit")
        this.getData(params, "getSfatmastID.php", "actSetFatmastEdit", _object);
      if (_yontem === "Kaydet") this.setData(params, "editSfatmast.php");
    }

    if (_tablename === "sfatdet") {
      if (_yontem === "Liste")
        this.getData(params, "getSfatdetList.php", "actSetfatdetList", _dizi);
    }
  },

  //fatura modülü
  getFatList(params) {
    this.getData(params, "getSfatmastList.php", "actSetfaturaList", _dizi);
  },
  getFatID(params) {
    this.getData(params, "getSfatmastID.php", "actSetFatmastEdit", _object);
  },

  getFatDetList(params) {
    this.getData(params, "getSfatdetList.php", "actSetfatdetList", _dizi);
  },

  //api vuex
  getData(params, _php, _act, _tur) {
    // Vue.resource("getSfatmastList.php")
    Vue.resource(_php)
      .get({
        ...params
      })
      .then(response => {
        if (_act === "Kaydet") {
          console.log("response.body: " + response.body);
        } else {
          if (_tur === _dizi) store.dispatch(_act, response.body.data);
          if (_tur === _object) store.dispatch(_act, response.body.data[0]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  setData(params, _php) {
    Vue.resource(_php)
      .get({
        ...params
      })
      .then(response => {
        console.log("response.body: " + response.body);
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
