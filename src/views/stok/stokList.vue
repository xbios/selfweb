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
              v-model="AramaParam.searchKodu"
              @keyup.enter="getStokList()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Stok Adı</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Stok Adı bilgisi..."
              v-model="AramaParam.searchAdi"
              @keyup.enter="getStokList()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Ana Grubu</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Ana Grup bilgisi..."
              v-model="AramaParam.searchAnaGrup"
              @keyup.enter="getStokList()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Alt Grubu</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Alt Grup bilgisi..."
              v-model="AramaParam.searchAltGrup"
              @keyup.enter="getStokList()"
            />
          </div>
          <!--<div class="col-md-4 mb-3">
            <label class="text-primary">&nbsp;</label>
            <button type="button" @click="" class="btn btn-primary col-md-12">Listele</button>
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
                  v-model="stokEdit.STOKKOD"
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
                  v-model="stokEdit.BARCODE"
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
                  v-model="stokEdit.STOKADI"
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
                <b-form-select
                  class="form-control"
                  id="STBIRIM"
                  v-model="stokEdit.STBIRIM"
                  :options="BirimListe"
                  value-field="text"
                  text-field="text"
                ></b-form-select>
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-primary">2. Birim</label>
                <b-form-select
                  class="form-control"
                  id="STBIRIM2"
                  v-model="stokEdit.STBIRIM2"
                  :options="BirimListe"
                  value-field="text"
                  text-field="text"
                ></b-form-select>
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-primary" for="STBIRIM2KATSAYI">2. Birim Katsayı</label>
                <input
                  class="form-control"
                  id="STBIRIM2KATSAYI"
                  placeholder="2. Birim Katsayı"
                  type="number"
                  v-model="stokEdit.STBIRIM2KATSAYI"
                />
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-primary" for="STKRITIK">Kritik Seviye</label>
                <input
                  class="form-control"
                  id="STKRITIK"
                  placeholder="Kritik Seviye"
                  type="number"
                  v-model="stokEdit.STKRITIK"
                />
              </div>

              <div class="col-md-3 mb-4">
                <label class="text-primary">Kdv</label>
                <b-form-select
                  class="form-control"
                  id="STKDV"
                  v-model="stokEdit.STKDV"
                  :options="KdvListe"
                  value-field="text"
                  text-field="text"
                  plain
                ></b-form-select>
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-primary" for="STISKONTO">İskonto</label>
                <input
                  class="form-control"
                  id="STISKONTO"
                  placeholder="İskonto"
                  type="number"
                  v-model="stokEdit.STISKONTO"
                />
              </div>

              <div class="col-md-3 mb-4">
                <label class="text-primary">Ana Grup</label>
                <b-form-select
                  id="example-select"
                  v-model="stokEdit.STOKGRP1"
                  :options="anaGrupCombo"
                  value-field="text"
                  text-field="text"
                  plain
                ></b-form-select>
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-primary">Alt Grup</label>
                <b-form-select
                  id="example-select"
                  v-model="stokEdit.STOKGRP2"
                  :options="altGrupCombo"
                  value-field="text"
                  text-field="text"
                  plain
                ></b-form-select>
              </div>

              <div class="col-md-3 mb-4">
                <label class="text-danger" for="STALISFIYAT">Alış Fiyatı</label>
                <input
                  class="form-control"
                  id="STALISFIYAT"
                  placeholder="Alış Fiyatı"
                  type="number"
                  v-model="stokEdit.STALISFIYAT"
                />
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-primary" for="STSATISFIYAT1">1. Satış Fiyatı</label>
                <input
                  class="form-control"
                  id="STSATISFIYAT1"
                  placeholder="1. Satış Fiyatı"
                  type="number"
                  v-model="stokEdit.STSATISFIYAT1"
                />
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-primary" for="STSATISFIYAT2">2. Satış Fiyatı</label>
                <input
                  class="form-control"
                  id="STSATISFIYAT2"
                  placeholder="2. SAtış Fiyatı"
                  type="text"
                  v-model="stokEdit.STSATISFIYAT2"
                />
              </div>
              <div class="col-md-3 mb-4">
                <label class="text-primary" for="STSATISFIYAT3">3. Satış Fiyatı</label>
                <input
                  class="form-control"
                  id="STSATISFIYAT3"
                  placeholder="3. Satış Fiyatı"
                  type="text"
                  v-model="stokEdit.STSATISFIYAT3"
                />
              </div>
              <div class="col-md-2 mb-4">
                <label class="text-primary" for="ACILISMIKTARI">Açılış Miktarı</label>
                <input
                  class="form-control"
                  id="ACILISMIKTARI"
                  placeholder="Açılış Miktarı"
                  type="text"
                  v-model="stokEdit.ACILISMIKTARI"
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
                  v-model="stokEdit.GIRIS"
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
                  v-model="stokEdit.CIKIS"
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
                  v-model="stokEdit.KAYITDATE"
                ></flat-pickr>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="PASIF"
                  true-value="1"
                  false-value="0"
                  v-model="stokEdit.PASIF"
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

import resourceApi from "@/api/smSelf";

export default {
  // name:,
  components: {
    flatPickr,
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
    // this.getanagrup();
    // this.getaltgrup();
    this.getStokList();
  },
  methods: {
    async getanagrup() {
      this.comboParam.VALUE = "PIN_STGRUPANA";
      this.comboParam.TEXT = "GRUPANA";
      this.comboParam.TABLE = "stgrupana";
      this.comboParam.SECIM = "";
      this.comboParam.MUTNAME = "SET_ANAGRUPCOMBO";
      await resourceApi.getCombo({ ...this.comboParam });
    },
    async getaltgrup() {
      this.comboParam.VALUE = "ID";
      this.comboParam.TEXT = "GRUPALT";
      this.comboParam.TABLE = "stgrupalt";
      this.comboParam.SECIM = "";
      this.comboParam.MUTNAME = "SET_ALTGRUPCOMBO";
      await resourceApi.getCombo({ ...this.comboParam });
    },
    async getStokList() {
      await this.getanagrup();
      await this.getaltgrup();

      this.firmaParam.MUTNAME = "SET_STOKLIST"; //mutation name
      this.firmaParam.STOKKOD = this.AramaParam.searchKodu;
      await resourceApi.getTable("sstok", { ...this.firmaParam });
    },
    async stokModal(_ID) {
      this.firmaParam.MUTNAME = "SET_STOKEDIT";
      this.firmaParam.SSTOKID = _ID;
      await resourceApi.getTableID("sstok", { ...this.firmaParam });
      if (_ID <= 0) {
        this.stokEdit.KAYITDATE = new Date(); //"2020-01-01";
      }
      //});
    },
    async stokKaydet() {
      this.stokEdit.Apikey = this.editApikey;
      this.stokEdit.USERCODE = this.editUserID;
      this.stokEdit.FRID = this.editFRID;
      await resourceApi.setTable("sstok", { ...this.stokEdit });
      this.getStokList();
    },
    async stokKaldir() {
      this.firmaParam.SSTOKID = this.stokEdit.SSTOKID;
      await resourceApi.deleteTable("sstok", { ...this.firmaParam });
      this.getStokList();
    },
  },
  computed: {
    ...mapState({
      // vergidLer: state => state.vergidLer
    }),
    ...mapFields([
      "AramaParam",
      "firmaParam",
      "stokList",
      "stokEdit",
      "editApikey",
      "editFRID",
      "editUserID",
      "BirimListe",
      "KdvListe",
      "comboParam",
      "anaGrupCombo",
      "altGrupCombo",
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
