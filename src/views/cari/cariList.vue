<template>
  <div>
    <!-- Hero -->
    <base-page-heading title="Müşteri Listesi" subtitle="Müşteri Tanımlama"></base-page-heading>
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
            @click="musteriModal((newCRID = -999))"
            class="btn btn-success"
          >
            Yeni Müşteri
            <i class="si si-plus"></i>
          </button>
        </p>
        <div class="form-row mb-3">
          <div class="col-12 mb-3">
            <b-alert show dismissible variant="primary">
              Form üzerinden girdiğiniz bilgiler ile müşterilerinizi kolayca
              listeleyebilirsiniz. Bilgileri doğru bir şekilde girdiğinizden
              emin olun ve ardından klavyede bulunan "Enter" tuşuna
              basın.
            </b-alert>
          </div>
          <div class="col-md-3">
            <label class="text-primary">Müşteri adı</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Aranan müşteriye ait ad bilgisi..."
              v-model="AramaParam.searchCari"
              @keyup.enter="getCariList()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Müşteri maili</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Aranan müşteriye ait mail bilgisi..."
              v-model="AramaParam.searchEmail"
              @keyup.enter="getCariList()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Müşteri telefonu</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Aranan müşteriye ait telefon bilgisi..."
              v-model="AramaParam.searchTelephone"
              @keyup.enter="getCariList()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Müşteri şehir</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Aranan müşteriye ait şehir bilgisi..."
              v-model="AramaParam.searchCity"
              @keyup.enter="getCariList()"
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
              <b-th>Kod</b-th>
              <b-th>Müşteri Adı</b-th>
              <b-th>Vergi No / TC Kimlik</b-th>
              <b-th>Vergi Daire</b-th>
              <b-th>Adres</b-th>
              <b-th>Şehir</b-th>
              <b-th>İlçe</b-th>
              <b-th>Telefon</b-th>
              <b-th>Email</b-th>
              <b-th></b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="cari in cariList" :key="cari.CRID">
              <b-td>{{ cari.CRKOD }}</b-td>
              <b-td>{{ cari.CRISIM }}</b-td>
              <b-td>{{ cari.CRVERGNO }}</b-td>
              <b-td>{{ cari.CRVERGD }}</b-td>
              <b-td>{{ cari.CRADRES }}</b-td>
              <b-td>{{ cari.CRSEHIR }}</b-td>
              <b-td>{{ cari.CRILCE }}</b-td>
              <b-td>{{ cari.CRTEL }}</b-td>
              <b-td>{{ cari.CREMAIL }}</b-td>
              <b-td class="text-center">
                <b-button
                  size="sm"
                  variant="alt-primary"
                  title="Düzenle"
                  v-b-modal.modal-block-vcenter
                  @click="musteriModal(cari.CRID)"
                >
                  <i class="fa fa-fw fa-pencil-alt"></i>
                </b-button>
                <b-button
                  size="sm"
                  variant="alt-danger"
                  title="Kaldır"
                  v-b-modal.modal-block-vcenter-delete
                  @click="musteriModal(cari.CRID)"
                >
                  <i class="fa fa-minus"></i>
                </b-button>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </base-block>
      <!-- END Full Table -->
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
            <h3 class="block-title">Müşteri Kaldır</h3>
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
                  <b>Müşteriyi kaldırmak istediğinizden emin misiniz?</b>
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
                        musteriKaldir()
                    "
                  >Evet</b-button>
                </div>
              </div>
            </base-block>
          </div>
        </div>
      </b-modal>
      <!-- End Modal -->
      <!-- VergiDaire Arama -->
      <b-modal
        id="modal-block-vergi"
        body-class="p-0"
        size="lg"
        class="col-12"
        centered
        hide-footer
        hide-header
      >
        <div class="block block-themed block-transparent mb-0">
          <div class="block-header bg-primary-dark">
            <h3 class="block-title">Vergi Dairesi Bul</h3>
            <div class="block-options">
              <button
                type="button"
                class="btn-block-option"
                @click="$bvModal.hide('modal-block-vergi')"
              >
                <i class="fa fa-fw fa-times"></i>
              </button>
            </div>
          </div>
          <div class="block-content-full font-size-sm">
            <!-- secim/vergidaire.vue -->
            <base-block>
              <h6
                class="col-md-12 alert alert-primary mb-4"
              >Listede arama yaparak hızlıca sonuca ulaşabilirsiniz...</h6>
              <div class="form-row mb-3">
                <div class="col-md-4">
                  <label class="text-primary">İl Adı</label>
                  <input
                    type="text"
                    id="newVergIL"
                    class="form-control"
                    @keyup.enter="getvergidairelerFind(VergIL, VergILCE)"
                    :value="VergIL"
                    placeholder="İl Adı"
                    @input="VergIL = $event.target.value"
                  />
                </div>
                <div class="col-md-4">
                  <label class="text-primary">Vergi Dairesi Adı</label>
                  <input
                    type="text"
                    id="newVergILCE"
                    class="form-control"
                    @keyup.enter="getvergidairelerFind(VergIL, VergILCE)"
                    :value="VergILCE"
                    placeholder="Vergi Dairesi Adı"
                    @input="VergILCE = $event.target.value"
                  />
                </div>
                <div class="col-md-4">
                  <label class="text-primary">&nbsp;</label>
                  <b-button
                    size="md"
                    class="btn btn-success col-md-12"
                    @click="getvergidairelerFind(VergIL, VergILCE)"
                  >
                    Listele
                    <i class="fa fa-fw fa-list"></i>
                  </b-button>
                </div>
              </div>
              <b-table-simple responsive striped table-class="table-vcenter">
                <b-thead>
                  <b-tr class="text-primary">
                    <b-th>İl</b-th>
                    <b-th>İlçe</b-th>
                    <b-th>Kodu</b-th>
                    <b-th>Adı</b-th>
                    <b-th></b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="vergi in vergidLerFind" :key="vergi.ID">
                    <b-td class="font-weight-bolder">{{ vergi.IL }}</b-td>
                    <b-td>{{ vergi.ILCE }}</b-td>
                    <b-td class="font-weight-bolder">{{ vergi.KODU }}</b-td>
                    <b-td>{{ vergi.ADI }}</b-td>
                    <b-td class="text-center">
                      <b-button
                        size="sm"
                        variant="alt-primary"
                        title="Seç"
                        @click="
                          $bvModal.hide('modal-block-vergi'),
                            VergiDairesiSec(vergi)
                        "
                      >
                        <i class="fa fa-fw fa-check"></i>
                      </b-button>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </base-block>
          </div>
        </div>
      </b-modal>
      <!-- End Modal -->
      <!-- Begin Modal -->
      <b-modal id="modal-block-vcenter" size="lg" body-class="p-0" centered hide-footer hide-header>
        <div class="block block-themed block-transparent mb-0">
          <div class="block-header bg-primary-dark">
            <h3 class="block-title">Müşteri Düzenleme</h3>
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
            <div class="form-row">
              <div class="col-md-12 mb-4">
                <label for="CRKOD" class="text-primary">Müşteri Kodu</label>
                <input
                  type="text"
                  id="CRKOD"
                  class="form-control"
                  placeholder="Müşteri Kodu"
                  v-model="cariEdit.CRKOD"
                />
              </div>
              <div class="col-md-12 mb-4">
                <label for="CRISIM" class="text-primary">Müşteri Adı</label>
                <input
                  type="text"
                  id="CRISIM"
                  class="form-control"
                  placeholder="Müşteri adı"
                  v-model="cariEdit.CRISIM"
                />
              </div>

              <div class="col-md-12 mb-4">
                <label for="newCRADRES" class="text-primary">Adres</label>
                <input
                  type="text"
                  id="newCRADRES"
                  class="form-control"
                  placeholder="Adres"
                  v-model="cariEdit.CRADRES"
                />
              </div>
              <div class="col-md-6 mb-4">
                <label class="text-primary">Şehir</label>
                <select v-model="cariEdit.CRSEHIR" class="form-control" id="newCRSEHIR">
                  <option
                    v-for="sehir in sehirler"
                    v-bind:key="sehir.name"
                    v-bind:value="sehir.name"
                    :selected="CRSEHIR == sehir.name"
                  >{{ sehir.name }}</option>
                </select>
              </div>
              <div class="col-md-6 mb-4">
                <label for="newCRILCE" class="text-primary">İlçe</label>
                <!--  <input type="text"
                       id="newCRILCE"
                       class="form-control"
                       :value="newCRILCE"
                       placeholder="İlçe"
                @input="newCRILCE = $event.target.value" >-->
                <select v-model="cariEdit.CRILCE" class="form-control" id="newCRILCE">
                  <option
                    v-for="ilce in ilceler"
                    v-bind:key="ilce.name"
                    v-bind:value="ilce.name"
                    :selected="CRILCE == ilce.name"
                  >{{ ilce.name }}</option>
                </select>
              </div>
              <div class="col-md-6 mb-4">
                <label class="text-primary">Vergi Daire</label>
                <select v-model="cariEdit.CRVERGD" class="form-control" id="newCRVERGD">
                  <option
                    disabled
                    value="0"
                    :selected="CRVERGD == 0"
                  >Lütfen Vergi Dairesi seçimi yapınız</option>
                  <option
                    v-for="vergid in vergidLer"
                    v-bind:key="vergid.KODU"
                    v-bind:value="vergid.KODU"
                    :selected="vergid.KODU == CRVERGD"
                  >{{ vergid.ADI }}</option>
                </select>
              </div>
              <div class="col-md-1 mb-4">
                <label class="text-primary col-md-12">&nbsp;</label>
                <b-button
                  variant="primary"
                  size="sm"
                  v-b-modal.modal-block-vergi
                  @click="vergiDairesiModal()"
                >
                  <i class="fa fa-search mr-1"></i>
                </b-button>
              </div>
              <div class="col-md-5 mb-4">
                <label for="newCRVERGNO" class="text-primary">Vergi Daire / TC Kimlik</label>
                <input
                  type="text"
                  id="newCRVERGNO"
                  class="form-control"
                  ref="vergidairesi"
                  placeholder="Vergi Dairesi"
                  v-model="cariEdit.CRVERGNO"
                />
              </div>

              <!--<div class="form-group">
                <label for="newCRSEHIR">Şehir</label>
                <input type="text"
                       id="newCRSEHIR"
                       class="form-control"
                       :value="newCRSEHIR"
                       placeholder="Şehir"
                       @input="newCRSEHIR = $event.target.value" >
              </div>-->

              <div class="col-md-6 mb-4">
                <label for="newCRTEL" class="text-primary">Telefon</label>
                <input
                  type="text"
                  id="newCRTEL"
                  class="form-control"
                  placeholder="Telefon"
                  v-model="cariEdit.CRTEL"
                />
              </div>
              <div class="col-md-6 mb-4">
                <label for="newCREMAIL" class="text-primary">E-mail</label>
                <input
                  type="text"
                  id="newCREMAIL"
                  class="form-control"
                  placeholder="E-mail"
                  v-model="cariEdit.CREMAIL"
                />
              </div>
            </div>
          </div>
          <div class="block-content block-content-full text-right border-top">
            <b-button variant="light" size="sm" @click="$bvModal.hide('modal-block-vcenter')">Vazgeç</b-button>
            <b-button
              variant="primary"
              size="sm"
              @click="$bvModal.hide('modal-block-vcenter'), musteriDuzenle()"
            >
              <i class="fa fa-check mr-1"></i> Kaydet
            </b-button>
          </div>
        </div>
      </b-modal>
      <!-- End Modal -->
    </div>
    <!-- END Page Content -->
  </div>
</template>

<script>
// import VergiDaire from "@/views/secim/vergidaire.vue";
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";

import resourceApi from "@/api/smSelf";

export default {
  components: {
    // VergiDaire
  },
  data() {
    return {
      sonuc: "",
      alertDiv: null,
      alertMessage: null,

      sehirler: [
        {
          NAME: null,
          CODE: null,
        },
      ],
      ilceler: [
        {
          NAME: null,
          CODE: null,
        },
      ],
    };
  },
  created() {
    this.getfrDetail();
    this.getSehirler();
    this.getCariList();
  },
  methods: {
    //Liste
    async getCariList() {
      this.firmaParam.MUTNAME = "SET_CARILIST"; //mutation name
      this.firmaParam.CRISIM = this.AramaParam.searchCari;
      //this.firmaParam.FTTARIH = this.AramaParam.searchTarih;
      //this.firmaParam.FTCRID = this.AramaParam.searchCari;
      //this.firmaParam.USERCODE = this.AramaParam.searchUser;
      await resourceApi.getTable("scari", { ...this.firmaParam });
    },

    //Edit
    async musteriModal(_ID) {
      this.firmaParam.MUTNAME = "SET_CARIEDIT";
      this.firmaParam.CRID = _ID;
      await resourceApi.getTableID("scari", { ...this.firmaParam });
    },
    //Kaydet
    async musteriDuzenle() {
      this.cariEdit.Apikey = this.editApikey;
      this.cariEdit.USERCODE = this.editUserID;
      await resourceApi.setTable("scari", { ...this.cariEdit });
      this.getCariList();
    },
    //Sil
    musteriKaldir() {
      let _Apikey = "8e86b685-88e6-11ea-943a-000c292fbb99";
      let _frID = this.$session.get("FRID");
      let _UserID = this.$session.get("UID");
      this.$resource("deleteCariID.php")
        .get({
          CRID: this.CRID,
          Apikey: _Apikey,
          FRID: _frID,
          USERCODE: _UserID,
        })
        .then((response) => {
          this.sonuc = response.body;
          this.getCariList();
        });
    },

    getfrDetail() {
      let _frID = this.$session.get("FRID");
      let _Apikey = "8e86b685-88e6-11ea-943a-000c292fbb99";
      this.$resource("getFirmaDetail.php")
        .get({ FRID: _frID, Apikey: _Apikey })
        .then((response) => {
          let _VergIL = response.body.data[0]["FRIL"];
          this.$store.dispatch("actSetVergIL", _VergIL);
        });
    },
    getIlceler(_ID) {
      let _frID = this.$session.get("FRID");
      let _Apikey = "8e86b685-88e6-11ea-943a-000c292fbb99";
      this.$resource("getSehirIlceler.php")
        .get({ FRID: _frID, Apikey: _Apikey, ID: _ID })
        .then((response) => {
          this.ilceler = response.body.data;
        });
    },
    getSehirler() {
      let _frID = this.$session.get("FRID");
      let _Apikey = "8e86b685-88e6-11ea-943a-000c292fbb99";
      this.$resource("getSehirler.php")
        .get({ FRID: _frID, Apikey: _Apikey })
        .then((response) => {
          this.sehirler = response.body.data;
        });
    },

    vergiDairesiModal() {
      this.getvergidairelerFind(this.VergIL, this.VergILCE);
    },
    VergiDairesiSec(vergi) {
      const _vergi = [];
      _vergi.push(vergi);
      this.$store.dispatch("actSetVd", _vergi);
    },
    getvergidaireler(_IL, _ILCE, _KODU) {
      let _frID = this.$session.get("FRID");
      let _Apikey = "8e86b685-88e6-11ea-943a-000c292fbb99";
      this.$resource("getvergidaireList.php")
        .get({
          FRID: _frID,
          Apikey: _Apikey,
          IL: _IL,
          ILCE: _ILCE,
          KODU: _KODU,
        })
        .then((response) => {
          const _vergidLer = response.body.data;
          this.$store.dispatch("actSetVd", _vergidLer);
        });
    },
    getvergidairelerFind(_IL, _ILCE) {
      let _frID = this.$session.get("FRID");
      let _Apikey = "8e86b685-88e6-11ea-943a-000c292fbb99";
      this.$resource("getvergidaireList.php")
        .get({ FRID: _frID, Apikey: _Apikey, IL: _IL, ILCE: _ILCE })
        .then((response) => {
          const _vergidLerFind = response.body.data;
          this.$store.dispatch("actSetVdFind", _vergidLerFind);
        });
    },
  },
  computed: {
    ...mapState({
      vergidLer: (state) => state.vergidLer,
    }),
    ...mapFields([
      "AramaParam",
      "firmaParam",
      "cariList",
      "cariEdit",
      "editApikey",
      "editFRID",
      "editUserID",

      "vergidLerFind",
      "vergidLer",
      "VergIL",
      "VergILCE",
    ]),
  },
  watch: {
    CRSEHIR: function () {
      this.getIlceler(this.CRSEHIR);
    },
  },
};
</script>
