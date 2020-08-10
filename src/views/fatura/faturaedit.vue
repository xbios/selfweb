<template>
  <div>
    <!-- Begin Modal context  -->
    <div class="block block-themed block-transparent mb-0">
      <div class="block-header bg-primary-dark">
        <h3 class="block-title">Fatura Düzenleme</h3>
        <div class="block-options">
          <button
            type="button"
            class="btn-block-option"
            @click="$bvModal.hide('modal-block-vcenter')"
          >
            <i class="fa fa-fw fa-times"></i>
          </button>
        </div>
      </div>
      <div class="block-content font-size-sm">
        <!-- <div class="form-row"></div> -->
        <form class="form-row">
          <div class="col-md-4 mb-4">
            <label class="text-primary">Fatura Türü</label>
            <b-form-select
              id="example-select"
              v-model="fatmastEdit.FTTUR"
              :options="FaturaTuru"
              plain
            ></b-form-select>
          </div>
          <div class="col-md-4 mb-4">
            <label class="text-primary" for="FTBELNO">Belge No</label>
            <input
              class="form-control"
              id="FTBELNO"
              placeholder="Belge No"
              type="text"
              v-model="fatmastEdit.FTBELNO"
            />
          </div>
          <div class="col-md-4 mb-4">
            <label class="text-primary" for="FTTARIH">Tarih</label>
            <flat-pickr
              :config="configCustom"
              class="form-control"
              id="FTTARIH"
              placeholder="YYYY-AA-GG"
              v-model="fatmastEdit.FTTARIH"
            ></flat-pickr>
          </div>

          <!-- <div class="col-md-4 mb-4">
            <label class="text-primary" for="CRKOD">Cari Kod</label>
            <input
              class="form-control"
              id="CRKOD"
              placeholder="Cari Kod"
              type="text"
              v-model="CRKOD"
            />
          </div>-->
          <div class="col-md-8 mb-4">
            <label class="text-primary">Cari Ünvan</label>
            <b-form-select
              id="example-select"
              v-model="fatmastEdit.FTCRID"
              :options="scariCombo"
              plain
            ></b-form-select>
          </div>

          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="FTACIK"
              true-value="1"
              false-value="0"
              v-model="fatmastEdit.FTACIK"
            />
            <label class="form-check-label" for="inlineCheckbox1">Kapalı</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="FTIPTAL"
              true-value="1"
              false-value="0"
              v-model="fatmastEdit.FTIPTAL"
            />
            <label class="form-check-label" for="inlineCheckbox1">İptal</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="YAZ"
              true-value="1"
              false-value="0"
              v-model="fatmastEdit.YAZ"
            />
            <label class="form-check-label" for="inlineCheckbox1">Yazıldı</label>
          </div>

          <div class="col-md-12 mb-4">
            <label class="text-primary" for="FTTURACIKLAMA">Açıklama</label>
            <input
              class="form-control"
              id="FTTURACIKLAMA"
              placeholder="Açıklama"
              type="text"
              v-model="fatmastEdit.FTTURACIKLAMA"
            />
          </div>
        </form>
      </div>
      <div class="block-content block-content-full text-right border-top">
        <b-button variant="light" size="sm" @click="$bvModal.hide('modal-block-vcenter')">Vazgeç</b-button>
        <b-button
          variant="primary"
          size="sm"
          @click="$bvModal.hide('modal-block-vcenter'), faturaKaydet()"
        >
          <i class="fa fa-check mr-1"></i> Kaydet
        </b-button>
      </div>
    </div>
    <!-- End Modal context-->

    <!-- Begin detay Table -->
    <faturadetayList />
    <!-- End detay Table -->
  </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
import faturadetayList from "@/views/fatura/faturadetayList.vue";

import resourceApi from "@/api/smSelf";

export default {
  // name: "faturaedit",
  components: {
    flatPickr,
    faturadetayList,
  },
  data() {
    return {
      configCustom: { dateFormat: "Y-m-d" },
      sonuc: "",
      alertDiv: null,
      alertMessage: null,
    };
  },
  created() {
    this.getCariCombo();
  },
  methods: {
    async getCariCombo() {
      this.comboParam.VALUE = "CRID";
      this.comboParam.TEXT = "CRISIM";
      this.comboParam.TABLE = "scari";
      this.comboParam.SECIM = "";
      this.comboParam.MUTNAME = "SET_CARICOMBO";
      await resourceApi.getCombo({ ...this.comboParam });
    },
    async faturaKaydet() {
      this.fatmastEdit.Apikey = this.editApikey;
      this.fatmastEdit.USERCODE = this.editUserID;
      await resourceApi.setTable("sfatmast", { ...this.fatmastEdit });
      // .then(() => {
      //   });
      this.getFaturaList();
    },
    async getFaturaList() {
      this.firmaParam.MUTNAME = "SET_FATMASTLIST"; //mutation name
      this.firmaParam.FTBELNO = this.AramaParam.searchBelge;
      this.firmaParam.FTTARIH = this.AramaParam.searchTarih;
      this.firmaParam.FTCRID = this.AramaParam.searchCari;
      this.firmaParam.USERCODE = this.AramaParam.searchUser;
      await resourceApi.getTable("sfatmast", { ...this.firmaParam });
    },
  },
  computed: {
    ...mapState({
      // vergidLer: state => state.vergidLer
    }),
    ...mapFields([
      //
      "AramaParam",
      "firmaParam",
      "fatmastEdit",
      "comboParam",
      "scariCombo",
      "FaturaTuru",
      "editApikey",
      "editFRID",
      "editUserID",
    ]),
  },
};
</script>

<style lang="scss">
// Flatpickr + Custom overrides
@import "~flatpickr/dist/flatpickr.css";
@import "./src/assets/scss/vendor/flatpickr";

// Vue Color Custom overrides
@import "./src/assets/scss/vendor/vue-color";

// Vue Select + Custom overrides
@import "~vue-select/src/scss/vue-select";
@import "./src/assets/scss/vendor/vue-select";

// Vue Slider + Custom overrides
@import "~vue-slider-component/theme/default.css";
@import "./src/assets/scss/vendor/vue-slider";

// Vue2 Dropzone + Custom overrides
@import "~vue2-dropzone/dist/vue2Dropzone.min.css";
@import "./src/assets/scss/vendor/dropzone";
</style>
