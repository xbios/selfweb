<template>
  <div>
    <!-- Hero -->
    <base-page-heading title="Çek Senet Bordrosu" subtitle="Çek Senet İşlemleri"></base-page-heading>
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
            @click="getModal((newSFATMASTID = -999))"
            class="btn btn-success"
          >
            Yeni Çek / Senet
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
            <label class="text-primary">Bordro No</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Çek / Senete ait Bordro No bilgisi..."
              v-model="AramaParam.searchName"
              @keyup.enter="getList()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Çek / Senet No</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Çek / Senete ait No bilgisi..."
              v-model="AramaParam.searchEmail"
              @keyup.enter="getList()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Müşteri Adı</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Aranan müşteriye ait telefon bilgisi..."
              v-model="AramaParam.searchTelephone"
              @keyup.enter="getList()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Tarih</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Aranan müşteriye ait şehir bilgisi..."
              v-model="AramaParam.searchCity"
              @keyup.enter="getList()"
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
              <b-th>Bordro No</b-th>
              <b-th>Tür</b-th>
              <b-th>Tarih</b-th>
              <b-th>Cari</b-th>
              <b-th>Borç</b-th>
              <b-th>Alacak</b-th>
              <b-th></b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="kambiyo in kambiyoMasterList" :key="kambiyo.kam_id">
              <b-td>{{ kambiyo.kam_id }}</b-td>
              <b-td>{{ kambiyo.tip_id }}</b-td>
              <b-td>{{ kambiyo.TARIHVADE }}</b-td>
              <b-td>{{ kambiyo.cari_id }}</b-td>
              <b-td>{{ kambiyo.TUTARB }}</b-td>
              <b-td>{{ kambiyo.TUTAR }}</b-td>
              <b-td class="text-center">
                <b-button
                  size="sm"
                  variant="alt-primary"
                  title="Düzenle"
                  v-b-modal.modal-block-vcenter
                  @click="getModal(kambiyo.kam_id)"
                >
                  <i class="fa fa-fw fa-pencil-alt"></i>
                </b-button>
                <b-button
                  size="sm"
                  variant="alt-danger"
                  title="Kaldır"
                  v-b-modal.modal-block-vcenter-delete
                  @click="getModal(kambiyo.kam_id)"
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
        <ceksenetedit />
      </b-modal>
      <!-- End Modal -->
    </div>
    <!-- END Page Content -->
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import resourceApi from "@/api/smSelf";

import ceksenetedit from "@/views/ceksenet/ceksenetedit.vue";

export default {
  // name:,
  components: {
    ceksenetedit,
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
    this.getList();
  },
  methods: {
    async getList() {
      //sfatmast
      this.firmaParam.MUTNAME = "SET_KAMBIYOMASTLIST"; //mutation name
      this.firmaParam.FTBELNO = this.AramaParam.searchBelge;
      this.firmaParam.FTTARIH = this.AramaParam.searchTarih;
      this.firmaParam.FTCRID = this.AramaParam.searchCari;
      this.firmaParam.USERCODE = this.AramaParam.searchUser;
      await resourceApi.getTable("skambiyomaster", { ...this.firmaParam });
    },
    async getModal(_ID) {
      //skambiyomaster
      this.firmaParam.MUTNAME = "SET_KAMBIYOMASTEDIT";
      this.firmaParam.kam_id = _ID;
      this.firmaParam.carbor_id = "";
      await resourceApi.getTableID("skambiyomaster", { ...this.firmaParam });
      this.getCariCombo();

      //skambiyo
      this.firmaParam.MUTNAME = "SET_KAMBIYODETLIST";
      this.firmaParam.kam_id = "";
      this.firmaParam.carbor_id = this.kambiyoMasterEdit.kam_id;
      await resourceApi.getTable("skambiyo", { ...this.firmaParam });
    },
    async getCariCombo() {
      this.comboParam.VALUE = "CRID";
      this.comboParam.TEXT = "CRISIM";
      this.comboParam.TABLE = "scari";
      this.comboParam.SECIM = this.kambiyoMasterEdit.cari_id;
      this.comboParam.MUTNAME = "SET_CARICOMBO";
      await resourceApi.getCombo({ ...this.comboParam });
    },
  },
  computed: {
    ...mapFields([
      //
      "kambiyoMasterList",
      "kambiyoMasterEdit",
      "firmaParam",
      "AramaParam",
      "comboParam",
    ]),
  },
};
</script>

<style scoped>
</style>
