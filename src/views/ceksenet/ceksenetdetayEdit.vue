<template>
  <div>
    <!-- CEKSENET DETAY EDIT Begin Modal block-->
    <div class="block block-themed block-transparent mb-0">
      <div class="block-header bg-secondery-dark">
        <h3 class="block-title">Çek Senet Satırı</h3>
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
        <!-- FORM -->
        <div class="form-row">
          <div class="col-md-4 mb-4">
            <label class="text-primary" for="cek_id">Çek No</label>
            <input
              class="form-control"
              id="cek_id"
              placeholder="Çek No"
              type="text"
              v-model="kambiyoDetayEdit.cek_id"
            />
          </div>
          <div class="col-md-4 mb-4">
            <label class="text-primary" for="TARIHVADE">Tarih</label>
            <flat-pickr
              :config="configCustom"
              class="form-control"
              id="TARIHVADE2"
              placeholder="YYYY-AA-GG"
              v-model="kambiyoMasterEdit.TARIHVADE"
            ></flat-pickr>
          </div>
        </div>
        <!-- FORM -->
      </div>
      <div class="block-content block-content-full text-right border-top">
        <b-button variant="light" size="sm" @click="$bvModal.hide('modal-block-vcenter2')">Vazgeç</b-button>
        <b-button
          variant="primary"
          size="sm"
          @click="$bvModal.hide('modal-block-vcenter2'), detayKaydet()"
        >
          <i class="fa fa-check mr-1"></i> Kaydet
        </b-button>
      </div>
    </div>
    <!-- CEKSENET DETAY EDIT End Modal block-->
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import flatPickr from "vue-flatpickr-component";

import resourceApi from "@/api/smSelf";

export default {
  // name:,
  components: {
    flatPickr,
    //secimListe,
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
    async detayKaydet() {
      this.kambiyoDetayEdit.Apikey = this.editApikey;
      this.kambiyoDetayEdit.USERCODE = this.editUserID;
      this.kambiyoDetayEdit.FRID = this.editFRID;
      this.kambiyoDetayEdit.cek_id = this.kambiyoMasterEdit.cek_id;
      await resourceApi.setTable("skambiyo", { ...this.fatdetEdit });
      this.getFaturadetList();
    },
    async getFaturadetList() {
      this.firmaParam.MUTNAME = "SET_KAMBIYODETLIST";
      this.firmaParam.cek_id = this.kambiyoMasterEdit.cek_id;
      await resourceApi.getTable("skambiyo", { ...this.firmaParam });
    },
  },
  computed: {
    ...mapFields([
      //
      "firmaParam",
      "kambiyoDetayEdit",
      "kambiyoMasterEdit",

      "editApikey",
      "editFRID",
      "editUserID",
    ]),
  },
};
</script>

<style scoped>
</style>
