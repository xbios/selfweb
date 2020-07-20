<template>
  <div>
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
          <div class="col-md-4 mb-4">
            <label class="text-primary">Fatura Türü</label>
            <b-form-select
              id="example-select"
              v-model="fatmastEdit.FTTUR"
              :options="FaturaTuru"
              plain
            ></b-form-select>
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
          <!-- <div class="col-md-8 mb-4">
            <label class="text-primary" for="CRISIM">Cari Ünvan</label>
            <input
              class="form-control"
              id="CRISIM"
              placeholder="Cari Ünvan"
              type="text"
              v-model="CRISIM"
            />
          </div>-->
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

export default {
  // name: "faturaedit",
  components: {
    flatPickr,
    faturadetayList
  },
  data() {
    return {
      configCustom: { dateFormat: "Y-m-d" },

      fatmastParam: {
        FRID: "",
        Apikey: ""
      },

      sonuc: "",
      alertDiv: null,
      alertMessage: null
    };
  },
  methods: {
    faturaKaydet() {
      let _Apikey = "8e86b685-88e6-11ea-943a-000c292fbb99";
      let _frID = this.$session.get("FRID");
      let _UserID = this.$session.get("UID");

      console.log("_frID: " + _frID);
      console.log("_UserID: " + _UserID);
      console.log("_Apikey: " + _Apikey);

      this.fatmastEdit.FRID = _frID;
      this.fatmastEdit.USERCODE = _UserID;
      this.fatmastEdit.Apikey = _Apikey;

      this.$resource("editSfatmast.php")
        .get({
          ...this.fatmastEdit
        })
        .then(response => {
          this.sonuc = response.body;
          this.alertDiv = true;
          this.alertMessage = response.body[0]["SonucMesaj"];
          this.getFaturaList();
        });
    },
    getFaturaList() {
      let _frID = this.$session.get("FRID");
      let _Apikey = "8e86b685-88e6-11ea-943a-000c292fbb99";

      this.fatmastParam.FRID = _frID;
      this.fatmastParam.Apikey = _Apikey;

      if (this.AramaParam.searchBelge != "")
        this.fatmastParam.FTBELNO = this.AramaParam.searchBelge;

      this.$resource("getSfatmastList.php")
        .get({
          ...this.fatmastParam
        })
        .then(response => {
          let _faturaList = response.body.data;
          this.$store.dispatch("actSetfaturaList", _faturaList);
        });
    }
  },
  computed: {
    ...mapState({
      // vergidLer: state => state.vergidLer
    }),
    ...mapFields([
      //
      "fatmastEdit",
      "FaturaTuru",
      "AramaParam"
    ])
  }
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
