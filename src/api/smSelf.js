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
  async getTable(params) {
    //sql table için php karşılıkları liste için
    if (params.Table === "sfatmast") _php = "getSfatmastList.php";
    if (params.Table === "sfatdet") _php = "getSfatdetList.php";
    if (params.Table === "scari") _php = "getScariList.php";
    if (params.Table === "sstok") _php = "getSstokList.php";
    if (params.Table === "xvergidaire") _php = "getvergidaireList.php";

    if (params.Table === "skambiyomaster") _php = "getSkambiyomasterList.php";
    if (params.Table === "skambiyo") _php = "getSkambiyoList.php";
    ////
    await this.getData(params, _php, "Liste");
  },
  //php
  async getTableID(params) {
    //sql table için php karşılıkları tek kayıt için
    if (params.Table === "sfatmast") _php = "getSfatmastID.php";
    if (params.Table === "sfatdet") _php = "getSfatdetID.php";
    if (params.Table === "scari") _php = "getScariID.php";
    if (params.Table === "sstok") _php = "getSstokID.php";
    if (params.Table === "xvergidaire") _php = "getvergidaireList.php";

    if (params.Table === "skambiyomaster") _php = "getSkambiyomasterID.php";
    if (params.Table === "skambiyo") _php = "getSkambiyoID.php";
    ////
    await this.getData(params, _php, "Edit");
  },

  //php
  async setTable(_tbl, params) {
    //sql table için php karşılıkları kaydet mek için.
    if (_tbl === "sfatmast") _php = "editSfatmast.php";
    if (_tbl === "sfatdet") _php = "editSfatdet.php";
    if (_tbl === "scari") _php = "editScari.php";
    if (_tbl === "sstok") _php = "editSstok.php";

    if (_tbl === "skambiyomaster") _php = "editSkambiyomaster.php";
    if (_tbl === "skambiyo") _php = "editSkambiyo.php";
    ////
    await this.setData(params, _php);
  },

  //php
  async deleteTable(_tbl, params) {
    //sql table için php karşılıkları silmek için.
    if (_tbl === "sfatmast") _php = "deleteSfatmast.php";
    if (_tbl === "sfatdet") _php = "deleteSfatdet.php";
    if (_tbl === "scari") _php = "deleteScari.php";
    if (_tbl === "sstok") _php = "deleteSstok.php";
    ////
    await this.setData(params, _php);
  },

  //api vuex
  async getData(params, _php) {
    await Vue.resource(_php)
      .get({
        ...params
      })
      .then(response => {
        if (params.Yontem === "Liste")
          store.dispatch("actSetData", response.body.data);
        if (params.Yontem === "Edit")
          store.dispatch("actSetData", response.body.data[0]);
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
        console.log(
          "Kod: " +
            response.body[0].SonucKodu +
            "  Mesaj : " +
            response.body[0].SonucMesaj
        );
      })
      .catch(error => {
        console.log(error);
      });
  },

  //php
  async getCombo(params) {
    //b-form-select  combobox için  [{value: "1", text: "İSMAİL KILBÜKER"},  şeklinde
    await Vue.resource("getValueText.php")
      .get({
        ...params
      })
      .then(response => {
        store.dispatch("actSetCombo", response.body.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  //php
  async getSecim(params) {
    //b-form-select  combobox için  [{value: "1", text: "İSMAİL KILBÜKER"},  şeklinde
    await Vue.resource("getValueText.php")
      .get({
        ...params
      })
      .then(response => {
        store.dispatch("actSetSecim", response.body.data);
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
