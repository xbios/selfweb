<template>
  <div>
    <!-- Begin Modal block-->
    <div class="block block-themed block-transparent mb-0">
      <div class="block-header bg-secondery-dark">
        <h3 class="block-title">Fatura Satırı</h3>
        <div class="block-options">
          <button
            type="button"
            class="btn-block-option"
            @click="$bvModal.hide('modal-block-vcenter2')"
          >
            <i class="fa fa-fw fa-times"></i>
          </button>
        </div>
      </div>
      <div class="block-content font-size-sm">
        <!--  <div class="form-row"> </div>-->
        <form class="form-row">
          <div class="col-md-4 mb-4">
            <label class="text-primary" for="FDSTKODU">Stok Kodu</label>
            <input
              class="form-control"
              id="FDSTKODU"
              placeholder="Stok Kodu"
              type="text"
              v-model="fatdetEdit.FDSTKODU"
            />
          </div>
          <div class="col-md-8 mb-4">
            <label class="text-primary" for="FDSTADI">Stok Adı</label>
            <input
              class="form-control"
              id="FDSTADI"
              placeholder="Stok Adı"
              type="text"
              v-model="fatdetEdit.FDSTADI"
            />
          </div>
          <div class="col-md-4 mb-4">
            <label class="text-primary" for="FDMIKTAR">Miktar</label>
            <input
              class="form-control"
              id="FDMIKTAR"
              placeholder="Miktar"
              type="number"
              v-model="fatdetEdit.FDMIKTAR"
            />
          </div>
          <div class="col-md-3 mb-4">
            <label class="text-primary">Birim</label>
            <b-form-select
              class="form-control"
              id="FDBIRIM"
              v-model="fatdetEdit.FDBIRIM"
              :options="BirimListe"
              value-field="text"
              text-field="text"
              plain
            ></b-form-select>
          </div>
          <div class="col-md-3 mb-4">
            <label class="text-primary">Kdv</label>
            <b-form-select
              class="form-control"
              id="FDKDV"
              v-model="fatdetEdit.FDKDV"
              :options="KdvListe"
              value-field="text"
              text-field="text"
              plain
            ></b-form-select>
          </div>
          <div class="col-md-4 mb-4">
            <label class="text-primary" for="FDINDIRIMYUZDE">İndirim %</label>
            <input
              class="form-control"
              id="FDINDIRIMYUZDE"
              placeholder="İndirim %"
              type="number"
              v-model="fatdetEdit.FDINDIRIMYUZDE"
            />
          </div>
          <div class="col-md-4 mb-4">
            <label class="text-primary" for="FDFIYAT">Fiyat</label>
            <input
              class="form-control"
              id="FDFIYAT"
              placeholder="Fiyat"
              type="number"
              v-model="fatdetEdit.FDFIYAT"
            />
          </div>
          <div class="col-md-4 mb-4">
            <label class="text-primary" for="FDTUTAR">Tutar</label>
            <input
              class="form-control"
              id="FDTUTAR"
              placeholder="Tutar"
              type="number"
              v-model="fatdetEdit.FDTUTAR"
            />
          </div>
        </form>
      </div>
      <div class="block-content block-content-full text-right border-top">
        <b-button variant="light" size="sm" @click="$bvModal.hide('modal-block-vcenter2')">Vazgeç</b-button>
        <b-button
          variant="primary"
          size="sm"
          @click="$bvModal.hide('modal-block-vcenter2'), faturadetayKaydet()"
        >
          <i class="fa fa-check mr-1"></i> Kaydet
        </b-button>
      </div>
    </div>
    <!-- End Modal block-->
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

import resourceApi from "@/api/smSelf";

export default {
  // name:,
  data() {
    return {
      sonuc: "",
      alertDiv: null,
      alertMessage: null,
    };
  },
  methods: {
    async faturadetayKaydet() {
      this.fatdetEdit.Apikey = this.editApikey;
      this.fatdetEdit.USERCODE = this.editUserID;
      this.fatdetEdit.FRID = this.editFRID;
      this.fatdetEdit.FTID = this.fatmastEdit.SFATMASTID;
      await resourceApi.setTable("sfatdet", { ...this.fatdetEdit });
      this.getFaturadetList();
    },
    async getFaturadetList() {
      this.firmaParam.MUTNAME = "SET_FATDETLIST";
      this.firmaParam.FTID = this.fatmastEdit.SFATMASTID;
      await resourceApi.getTable("sfatdet", { ...this.firmaParam });
    },
  },
  computed: {
    ...mapFields([
      //
      "firmaParam",
      "fatdetEdit",
      "fatmastEdit",
      "editApikey",
      "editFRID",
      "editUserID",
      "BirimListe",
      "KdvListe",
    ]),
    _FIYATSUM: function () {
      let sum = 0;
      this.fatdetList.forEach(function (smm) {
        sum += parseFloat(smm.FDFIYAT);
      });
      return sum;
    },
    _TUTARSUM: function () {
      let sum = 0;
      this.fatdetList.forEach(function (smm) {
        sum += parseFloat(smm.FDTUTAR);
      });
      return sum;
    },
  },
};
</script>

<style scoped>
</style>
