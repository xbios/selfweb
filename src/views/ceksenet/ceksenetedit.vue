<template>
  <div>
    <!-- CEKSENET BORDRO EDIT Begin Modal block-->
    <div class="block block-themed block-transparent mb-0">
      <div class="block-header bg-primary-dark">
        <h3 class="block-title">Çek Senet Düzenleme</h3>
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
        <!-- FORM -->
        <form class="form-row">
          <div class="col-md-4 mb-4">
            <label class="text-primary">Bordro Türü</label>
            <b-form-select
              id="example-select"
              v-model="kambiyoMasterEdit.tip_id"
              :options="tip_id"
              plain
            ></b-form-select>
          </div>
          <div class="col-md-4 mb-4">
            <label class="text-primary" for="FTBELNO">Bordro No</label>
            <input
              class="form-control"
              id="FTBELNO"
              placeholder="Belge No"
              type="text"
              v-model="kambiyoMasterEdit.kam_id"
            />
          </div>
          <div class="col-md-4 mb-4">
            <label class="text-primary" for="TARIHVADE">Tarih</label>
            <flat-pickr
              :config="configCustom"
              class="form-control"
              id="TARIHVADE"
              placeholder="YYYY-AA-GG"
              v-model="kambiyoMasterEdit.TARIHVADE"
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
              v-model="kambiyoMasterEdit.cari_id"
              :options="scariCombo"
              plain
            ></b-form-select>
          </div>

          <div class="col-md-1 mb-4">
            <label class="text-primary col-md-12">&nbsp;</label>
            <b-button
              variant="primary"
              size="sm"
              v-b-modal.modal-block-secim
              @click="CariSecimListeModal()"
            >
              <i class="fa fa-search mr-1"></i>
            </b-button>
          </div>

          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              id="FTACIK"
              true-value="1"
              false-value="0"
              v-model="kambiyoMasterEdit.islem"
            />
            <label class="form-check-label" for="inlineCheckbox1">İşlem Gördü</label>
          </div>
        </form>
        <!-- FORM -->
      </div>
      <div class="block-content block-content-full text-right border-top">
        <b-button variant="light" size="sm" @click="$bvModal.hide('modal-block-vcenter')">Vazgeç</b-button>
        <b-button
          variant="primary"
          size="sm"
          @click="$bvModal.hide('modal-block-vcenter'), Kaydet()"
        >
          <i class="fa fa-check mr-1"></i> Kaydet
        </b-button>
      </div>
    </div>
    <!-- CEKSENET BORDRO EDIT End Modal block-->

    <!-- CEKSENET DETAY LIST Begin detay Table -->
    <ceksenetdetayList />
    <!-- CEKSENET DETAY LIST End detay Table -->

    <!-- SECIM LISTE Begin Modal -->
    <b-modal id="modal-block-secim" body-class="p-0" centered hide-footer hide-header>
      <secimListe viewName="kambiyoMasterEdit.cari_id" secimCaption="Cari Hesaplar" />
    </b-modal>
    <!-- SECIM LISTE End Modal -->
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import flatPickr from "vue-flatpickr-component";
import resourceApi from "@/api/smSelf";

import ceksenetdetayList from "@/views/ceksenet/ceksenetdetayList.vue";
import secimListe from "@/views/secim/secimListe.vue";

export default {
  // name:,
  components: {
    flatPickr,
    ceksenetdetayList,
    secimListe,
  },
  data() {
    return {
      configCustom: { dateFormat: "Y-m-d" },
      sonuc: "",
      alertDiv: null,
      alertMessage: null,
    };
  },
  methods: {
    async Kaydet() {
      this.kambiyoMasterEdit.Apikey = this.editApikey;
      this.kambiyoMasterEdit.USERCODE = this.editUserID;
      this.kambiyoMasterEdit.FRID = this.editFRID;
      await resourceApi.setTable("skambiyomaster", {
        ...this.kambiyoMasterEdit,
      });
      this.getList();
    },
    async getList() {
      this.firmaParam.MUTNAME = "SET_KAMBIYOMASTLIST"; //mutation name
      this.firmaParam.FTBELNO = this.AramaParam.searchBelge;
      this.firmaParam.FTTARIH = this.AramaParam.searchTarih;
      this.firmaParam.FTCRID = this.AramaParam.searchCari;
      this.firmaParam.USERCODE = this.AramaParam.searchUser;
      await resourceApi.getTable("skambiyomaster", { ...this.firmaParam });
    },
    async CariSecimListeModal() {
      this.secimParam.VALUE = "CRID";
      this.secimParam.TEXT = "CRISIM";
      this.secimParam.TABLE = "scari";
      this.secimParam.SECIM = "";
      this.secimParam.MUTNAME = "SET_SECIM";
      await resourceApi.getSecim({ ...this.secimParam });
    },
  },
  computed: {
    ...mapFields([
      //
      "kambiyoMasterEdit",
      "scariCombo",
      "tip_id",

      "AramaParam",
      "firmaParam",
      "comboParam",
      "secimParam",

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
</style>
