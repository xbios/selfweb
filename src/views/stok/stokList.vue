<template>
  <div>
    <!-- Hero -->
    <base-page-heading title="Stok Listesi" subtitle="Stok Tanımlama"></base-page-heading>
    <!-- END Hero -->
    <!-- Page Content -->
    <div class="content">
      <!-- Full Table -->
      <base-block title>
        <div class="col-lg-12 alert alert-info" v-if="alertDiv">{{ alertMessage }}</div>
        <p class="text-right">
          <button
            type="button"
            v-b-modal.modal-block-vcenter
            @click="stokModal((STID = -999))"
            class="btn btn-success"
          >
            Yeni Stok
            <i class="si si-plus"></i>
          </button>
        </p>
        <div class="form-row mb-3">
          <div class="col-12 mb-3">
            <b-alert show dismissible variant="primary">
              Form üzerinden girdiğiniz bilgiler ile stok kartını kolayca
              listeleyebilirsiniz. Bilgileri doğru bir şekilde girdiğinizden
              emin olun ve ardından klavyede bulunan "Enter" tuşuna
              basın.
            </b-alert>
          </div>
          <div class="col-md-3">
            <label class="text-primary">Stok Kodu</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Stok Kodu bilgisi..."
              v-model="searchKodu"
              @keyup.enter="getStokList()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Stok Adı</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Stok Adı bilgisi..."
              v-model="searchAdi"
              @keyup.enter="getStokList()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Ana Grubu</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Ana Grup bilgisi..."
              v-model="searchAnaGrup"
              @keyup.enter="getStokList()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Alt Grubu</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Alt Grup bilgisi..."
              v-model="searchAltGrup"
              @keyup.enter="getStokList()"
            />
          </div>
          <!--<div class="col-md-4 mb-3">
            <label class="text-primary">&nbsp;</label>
            <button type="button" @click="getsmmList()" class="btn btn-primary col-md-12">Listele</button>
          </div>-->
        </div>
        <b-table-simple responsive striped table-class="table-vcenter">
          <b-thead>
            <b-tr class="text-primary">
              <b-th>Stok Kodu</b-th>
              <b-th>Stok Adı</b-th>
              <b-th>Ana Grup</b-th>
              <b-th>Alt Grup</b-th>
              <b-th>Kdv</b-th>
              <b-th>Birim</b-th>
              <b-th>Kritik Seviye</b-th>
              <b-th>Barkod</b-th>
              <b-th>Giriş</b-th>
              <b-th>Çıkış</b-th>
              <b-th></b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="stok in stokList" :key="stok.SSTOKID">
              <b-td>{{ stok.STOKKOD }}</b-td>
              <b-td>{{ stok.STOKADI }}</b-td>
              <b-td>{{ stok.STOKGRP1 }}</b-td>
              <b-td>{{ stok.STOKGRP2 }}</b-td>
              <b-td>{{ stok.STKDV }}</b-td>
              <b-td>{{ stok.STBIRIM }}</b-td>
              <b-td>{{ stok.STKRITIK }}</b-td>
              <b-td>{{ stok.BARCODE }}</b-td>
              <b-td>{{ stok.GIRIS }}</b-td>
              <b-td>{{ stok.CIKIS }}</b-td>
              <b-td class="text-center">
                <b-button
                  size="sm"
                  variant="alt-primary"
                  title="Düzenle"
                  v-b-modal.modal-block-vcenter
                  @click="stokModal(stok.SSTOKID)"
                >
                  <i class="fa fa-fw fa-pencil-alt"></i>
                </b-button>
                <b-button
                  size="sm"
                  variant="alt-danger"
                  title="Kaldır"
                  v-b-modal.modal-block-vcenter-delete
                  @click="stokModal(stok.SSTOKID)"
                >
                  <i class="fa fa-minus"></i>
                </b-button>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </base-block>
      <!-- END Full Table -->
      <!-- Begin Modal -->
      <b-modal id="modal-block-vcenter" size="xl" body-class="p-0" centered hide-footer hide-header>
        <div class="block block-themed block-transparent mb-0">
          <div class="block-header bg-primary-dark">
            <h3 class="block-title">
              <i class="si si-note"></i>
              Stok Düzenleme
            </h3>
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
            <!--  -->
            <form class="form-row">
              <div class="col-md-3 mb-4">
                <label class="text-danger" for="STOKKOD">
                  <i class="si si-note"></i>
                  Stok Kodu
                </label>
                <input
                  class="form-control"
                  id="STOKKOD"
                  placeholder="Stok kodu"
                  type="text"
                  v-model="STOKKOD"
                />
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-danger" for="BARCODE">
                  <i class="si si-note"></i>
                  Barkod
                </label>
                <input
                  class="form-control"
                  id="BARCODE"
                  placeholder="Barkod"
                  type="text"
                  v-model="BARCODE"
                />
              </div>
              <div class="col-md-6 mb-4">
                <label class="text-primary" for="STOKADI">
                  <i class="si si-note"></i>
                  Stok Adı
                </label>
                <input
                  class="form-control"
                  id="STOKADI"
                  placeholder="Stok adı"
                  type="text"
                  v-model="STOKADI"
                />
              </div>

              <div class="col-md-3 mb-4">
                <label class="text-primary">
                  <button
                    type="button"
                    v-b-modal.modal-block-vcenter-new
                    size="xs"
                    class="border-0"
                  >
                    <i class="si si-plus"></i>
                  </button>
                  Birim
                </label>
                <select class="form-control" id="STBIRIM" v-model="STBIRIM">
                  <!--<option :selected="STBIRIM == birim.name" v-bind:key="birim.name" v-bind:value="birim.name" v-for="birim in birimler">
                    {{ sehir.name }}
                  </option>-->
                  <option>Adet</option>
                  <option>Kutu</option>
                  <option>Koli</option>
                </select>
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-primary">2. Birim</label>
                <select class="form-control" id="STBIRIM2" v-model="STBIRIM2">
                  <!--<option :selected="CRSEHIR == sehir.name" v-bind:key="sehir.name" v-bind:value="sehir.name" v-for="sehir in sehirler">
                    {{ sehir.name }}
                  </option>-->
                  <option>Kutu</option>
                  <option>Koli</option>
                </select>
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-primary" for="STBIRIM2KATSAYI">2. Birim Katsayı</label>
                <input
                  class="form-control"
                  id="STBIRIM2KATSAYI"
                  placeholder="2. Birim Katsayı"
                  type="number"
                  v-model="STBIRIM2KATSAYI"
                />
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-primary" for="STKRITIK">Kritik Seviye</label>
                <input
                  class="form-control"
                  id="STKRITIK"
                  placeholder="Kritik Seviye"
                  type="number"
                  v-model="STKRITIK"
                />
              </div>

              <div class="col-md-3 mb-4">
                <label class="text-primary">Kdv</label>
                <select class="form-control" id="STKDV" v-model="STKDV">
                  <!--<option :selected="CRSEHIR == sehir.name" v-bind:key="sehir.name" v-bind:value="sehir.name" v-for="sehir in sehirler">
                    {{ sehir.name }}
                  </option>-->
                  <option>1</option>
                  <option>8</option>
                  <option>18</option>
                </select>
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-primary" for="STISKONTO">İskonto</label>
                <input
                  class="form-control"
                  id="STISKONTO"
                  placeholder="İskonto"
                  type="number"
                  v-model="STISKONTO"
                />
              </div>

              <div class="col-md-3 mb-4">
                <label class="text-primary">Ana Grup</label>
                <select class="form-control" id="STOKGRP1" v-model="STOKGRP1">
                  <option
                    :selected="STOKGRP1 == anagrup.GRUPANA"
                    v-bind:key="anagrup.GRUPANA"
                    v-bind:value="anagrup.GRUPANA"
                    v-for="anagrup in anagruplar"
                  >{{ anagrup.GRUPANA }}</option>
                </select>
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-primary">Alt Grup</label>
                <select class="form-control" id="STOKGRP2" v-model="STOKGRP2">
                  <option
                    :selected="STOKGRP2 == altgrup.GRUPALT"
                    v-bind:key="altgrup.GRUPALT"
                    v-bind:value="altgrup.GRUPALT"
                    v-for="altgrup in altgruplar"
                  >{{ altgrup.GRUPALT }}</option>
                </select>
              </div>

              <div class="col-md-3 mb-4">
                <label class="text-danger" for="STALISFIYAT">Alış Fiyatı</label>
                <input
                  class="form-control"
                  id="STALISFIYAT"
                  placeholder="Alış Fiyatı"
                  type="number"
                  v-model="STALISFIYAT"
                />
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-primary" for="STSATISFIYAT1">1. Satış Fiyatı</label>
                <input
                  class="form-control"
                  id="STSATISFIYAT1"
                  placeholder="1. Satış Fiyatı"
                  type="number"
                  v-model="STSATISFIYAT1"
                />
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-primary" for="STSATISFIYAT2">2. Satış Fiyatı</label>
                <input
                  class="form-control"
                  id="STSATISFIYAT2"
                  placeholder="2. SAtış Fiyatı"
                  type="text"
                  v-model="STSATISFIYAT2"
                />
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-primary" for="STSATISFIYAT3">3. Satış Fiyatı</label>
                <input
                  class="form-control"
                  id="STSATISFIYAT3"
                  placeholder="3. Satış Fiyatı"
                  type="text"
                  v-model="STSATISFIYAT3"
                />
              </div>
              <div class="col-md-2 mb-4">
                <label class="text-primary" for="ACILISMIKTARI">Açılış Miktarı</label>
                <input
                  class="form-control"
                  id="ACILISMIKTARI"
                  placeholder="Açılış Miktarı"
                  type="text"
                  v-model="ACILISMIKTARI"
                />
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-primary" for="GIRIS">Giriş Miktarı</label>
                <input
                  class="form-control"
                  disabled
                  id="GIRIS"
                  placeholder="Giriş Miktarı"
                  type="text"
                  v-model="GIRIS"
                />
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-primary" for="CIKIS">Çıkış Miktarı</label>
                <input
                  class="form-control"
                  disabled
                  id="CIKIS"
                  placeholder="Çıkış Miktarı"
                  type="text"
                  v-model="CIKIS"
                />
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-primary" for="KAYITDATE">Kayıt Tarihi</label>
                <flat-pickr
                  disabled
                  :config="configCustom"
                  class="form-control bg-gray"
                  id="KAYITDATE"
                  placeholder="YYYY-AA-GG"
                  v-model="KAYITDATE"
                ></flat-pickr>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="PASIF"
                  true-value="1"
                  false-value="0"
                  v-model="PASIF"
                />
                <label class="form-check-label" for="inlineCheckbox1">Pasif</label>
              </div>
            </form>
            <!--  -->
          </div>
          <div class="block-content block-content-full text-right border-top">
            <b-button variant="light" size="sm" @click="$bvModal.hide('modal-block-vcenter')">
              <i class="si si-loop"></i>
              Vazgeç
            </b-button>
            <b-button
              variant="primary"
              size="sm"
              @click="$bvModal.hide('modal-block-vcenter'), stokKaydet()"
            >
              <i class="fa fa-check mr-1"></i> Kaydet
            </b-button>
          </div>
        </div>
      </b-modal>
      <!-- End Modal -->
      <!-- Delete Personel -->
      <b-modal
        id="modal-block-vcenter-delete"
        body-class="p-0"
        size="md"
        class="col-12"
        centered
        hide-footer
        hide-header
      >
        <div class="block block-themed block-transparent mb-0">
          <div class="block-header bg-primary-dark">
            <h3 class="block-title">Stok Kaldır</h3>
            <div class="block-options">
              <button
                type="button"
                class="btn-block-option"
                @click="$bvModal.hide('modal-block-vcenter-delete')"
              >
                <i class="fa fa-fw fa-times"></i>
              </button>
            </div>
          </div>
          <div class="block-content font-size-sm">
            <base-block>
              <div class="col-lg-12">
                <center>
                  <b>Stok kaydını kaldırmak istediğinizden emin misiniz?</b>
                </center>
                <div class="col-lg-12 mt-4 text-center">
                  <b-button
                    variant="danger"
                    class="col-lg-4"
                    size="sm"
                    @click="$bvModal.hide('modal-block-vcenter-delete')"
                  >Hayır</b-button>
                  <b-button
                    variant="success"
                    class="col-lg-4"
                    size="sm"
                    @click="
                      $bvModal.hide('modal-block-vcenter-delete'),
                        stokKaldir()
                    "
                  >Evet</b-button>
                </div>
              </div>
            </base-block>
          </div>
        </div>
      </b-modal>
      <!-- End Modal -->
    </div>
    <!-- END Page Content -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
import flatPickr from "vue-flatpickr-component";

export default {
  // name:,
  components: {
    flatPickr
  },
  data() {
    return {
      alertDiv: null,
      alertMessage: null,

      configCustom: { dateFormat: "Y-m-d" },

      // searchName: null,
      // searchCity: null,
      // searchTelephone: null,
      // searchEmail: null,

      searchKodu: null,
      searchAdi: null,
      searchAnaGrup: null,
      searchAltGrup: null,

      anagruplar: [],
      altgruplar: [],

      stokList: [],
      sonuc: ""
    };
  },
  created() {
    this.getanagrup();
    this.getaltgrup();
    this.getStokList();
  },
  methods: {
    getanagrup() {
      let _frID = this.$session.get("FRID");
      let _Apikey = "8e86b685-88e6-11ea-943a-000c292fbb99";
      this.$resource("getStgrupanaList.php")
        .get({ FRID: _frID, Apikey: _Apikey })
        .then(response => {
          this.anagruplar = response.body.data;
        });
    },
    getaltgrup() {
      let _frID = this.$session.get("FRID");
      let _Apikey = "8e86b685-88e6-11ea-943a-000c292fbb99";
      this.$resource("getStgrupaltList.php")
        .get({ FRID: _frID, Apikey: _Apikey })
        .then(response => {
          this.altgruplar = response.body.data;
        });
    },
    getStokList() {
      let _frID = this.$session.get("FRID");
      let _Apikey = "8e86b685-88e6-11ea-943a-000c292fbb99";
      this.$resource("getSstokList.php")
        .get({
          FRID: _frID,
          Apikey: _Apikey
          // CRISIM: this.searchName,
          // CRSEHIR: this.searchCity,
          // CRTEL: this.searchTelephone,
          // CREMAIL: this.searchEmail
        })
        .then(response => {
          this.stokList = response.body.data;
        });
    },
    stokModal(_ID) {
      let _frID = this.$session.get("FRID");
      let _Apikey = "8e86b685-88e6-11ea-943a-000c292fbb99";
      this.$resource("getSstokID.php")
        .get({ FRID: _frID, Apikey: _Apikey, SSTOKID: _ID })
        .then(response => {
          let _stokEdit = response.body.data[0];
          this.$store.dispatch("actSetStokEdit", _stokEdit);

          if (_ID <= 0) {
            this.KAYITDATE = "2020-01-01";
          }
        });
    },
    stokKaydet() {
      let _Apikey = "8e86b685-88e6-11ea-943a-000c292fbb99";
      let _frID = this.$session.get("FRID");
      let _UserID = this.$session.get("UID");

      console.log("_frID: " + _frID);
      console.log("_UserID: " + _UserID);

      this.$resource("editSstok.php")
        .get({
          SSTOKID: this.SSTOKID,
          Apikey: _Apikey,
          FRID: _frID,
          KAYITUSER: _UserID,
          STOKKOD: this.STOKKOD,
          BARCODE: this.BARCODE,
          STOKADI: this.STOKADI,

          STBIRIM: this.STBIRIM,
          STBIRIM2: this.STBIRIM2,
          STBIRIM2KATSAYI: this.STBIRIM2KATSAYI,
          STKDV: this.STKDV,
          STISKONTO: this.STISKONTO,
          STKRITIK: this.STKRITIK,

          STOKGRP1: this.STOKGRP1,
          STOKGRP2: this.STOKGRP2,

          STALISFIYAT: this.STALISFIYAT,
          STSATISFIYAT1: this.STSATISFIYAT1,
          STSATISFIYAT2: this.STSATISFIYAT2,
          STSATISFIYAT3: this.STSATISFIYAT3,
          ACILISMIKTARI: this.ACILISMIKTARI,
          PASIF: this.PASIF,
          KAYITDATE: this.KAYITDATE
        })
        .then(response => {
          this.sonuc = response.body;
          this.alertDiv = true;
          this.alertMessage = response.body[0]["SonucMesaj"];
          this.getStokList();
        });
    },
    stokKaldir() {
      let _Apikey = "8e86b685-88e6-11ea-943a-000c292fbb99";
      let _frID = this.$session.get("FRID");
      let _UserID = this.$session.get("UID");
      this.$resource("deleteSstok.php")
        .get({
          SSTOKID: this.SSTOKID,
          Apikey: _Apikey,
          FRID: _frID,
          USERCODE: _UserID
        })
        .then(response => {
          this.sonuc = response.body;
          this.getStokList();
        });
    }
  },
  computed: {
    ...mapState({
      // vergidLer: state => state.vergidLer
    }),
    ...mapFields([
      "stokEdit.SSTOKID",
      "stokEdit.STOKKOD",
      "stokEdit.BARCODE",
      "stokEdit.STOKADI",

      "stokEdit.STBIRIM",
      "stokEdit.STBIRIM2",
      "stokEdit.STBIRIM2KATSAYI",

      "stokEdit.STKDV",
      "stokEdit.STISKONTO",
      "stokEdit.STKRITIK",

      "stokEdit.STOKGRP1",
      "stokEdit.STOKGRP2",

      "stokEdit.STALISFIYAT",
      "stokEdit.STSATISFIYAT1",
      "stokEdit.STSATISFIYAT2",
      "stokEdit.STSATISFIYAT3",

      "stokEdit.ACILISMIKTARI",
      "stokEdit.GIRIS",
      "stokEdit.CIKIS",

      "stokEdit.PASIF",
      "stokEdit.KAYITUSER",
      "stokEdit.KAYITDATE"
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
