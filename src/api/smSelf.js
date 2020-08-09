const _products = [
  { id: 1, title: "iPad 4 Mini", price: 500.01, inventory: 2 },
  { id: 2, title: "H&M T-Shirt White", price: 10.99, inventory: 10 },
  { id: 3, title: "Charli XCX - Sucker CD", price: 19.99, inventory: 5 }
];

let _php = "";

//const firmaParams = store.getters.appfirmaParams;

import Vue from "vue";
import store from "../store";

export default {
  //php
  async getCombo(_tbl, params) {
    await Vue.resource("getValueText.php")
      .get({
        ...params
      })
      .then(response => {
        //console.log("resp: " + response.body.data);
        store.dispatch("actSetCombo", response.body.data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  //php
  async getTable(_tbl, _ynt, params) {
    //
    if (_tbl === "sfatmast" && _ynt === "Liste") _php = "getSfatmastList.php";
    if (_tbl === "sfatmast" && _ynt === "Edit") _php = "getSfatmastID.php";
    //
    if (_tbl === "sfatdet" && _ynt === "Liste") _php = "getSfatdetList.php";
    ////
    await this.getData(params, _php, _ynt);
  },

  //php
  async setTable(_tbl, params) {
    if (_tbl === "sfatmast") _php = "editSfatmast.php";
    if (_tbl === "sfatdet") _php = "editSfatdet.php";
    ////
    await this.setData(params, _php);
  },

  //api vuex
  async getData(params, _php, _ynt) {
    const _act = "actSetData";
    //console.log("_act: " + _act);
    await Vue.resource(_php)
      .get({
        ...params
      })
      .then(response => {
        if (_ynt === "Liste") store.dispatch(_act, response.body.data);
        if (_ynt === "Edit") store.dispatch(_act, response.body.data[0]);
      })
      .catch(error => {
        console.log(error);
      });
  },

  //api
  async setData(params, _php) {
    await Vue.resource(_php)
      .get({
        ...params
      })
      .then(response => {
        console.log("response.body: " + response.body[0].SonucKodu);
        console.log("response.body: " + response.body[0].SonucMesaj);
      })
      .catch(error => {
        console.log(error);
      });
  },

  ///////////////////////// ÖRNEKLER
  getUser() {
    let user = store.getters.app.name;
    return user;
  },

  getProducts(cb) {
    setTimeout(() => cb(_products), 1000);
  },

  getAllFatlist() {
    return Vue.http.get(
      "http://vuez.site/todos/getSfatmastList.php?FRID=1&Apikey=8e86b685-88e6-11ea-943a-000c292fbb99"
    );
  }
};
