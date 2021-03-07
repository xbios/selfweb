<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="8">
          <b-card
            header="Primary"
            header-bg-variant="primary"
            header-text-variant="white"
            border-variant="light"
            class="text-center shadow p-2 mb-2 bg-white"
          >
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>
        </b-col>
        <b-col>
          <b-card
            bg-variant="primary"
            text-variant="white"
            header="Primary"
            class="text-center shadow p-2 mb-2"
          >
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="8">
          <b-card
            header="Primary"
            header-bg-variant="primary"
            header-text-variant="white"
            border-variant="light"
            class="text-center shadow p-2 mb-2 bg-white"
          >
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>
        </b-col>
        <b-col>
          <b-card
            bg-variant="primary"
            text-variant="white"
            header="Primary"
            class="text-center shadow p-2 mb-2"
          >
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>
        </b-col>
      </b-row>

      <!-- b-card -->
      <div class="mt-3">
        <b-card-group deck class="mb-3">
          <b-card
            border-variant="light"
            header="Light"
            class="text-center shadow"
          >
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>

          <b-card
            class="shadow"
            border-variant="dark"
            header="Dark"
            align="center"
          >
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>
        </b-card-group>
      </div>
      <!-- b-card -->
    </b-container>
    <!-- Hero -->
    <!-- <base-page-heading
      title="Çek Senet Bordrosu"
      subtitle="Çek Senet İşlemleri"
    ></base-page-heading> -->
    <!-- END Hero -->
    <!-- Page Content -->
    <div class="content">
      <!-- <div>
        <b-card
          header="Card Header"
          header-text-variant="white"
          header-tag="header"
          header-bg-variant="dark"
          footer="Card Footer"
          footer-tag="footer"
          footer-bg-variant="success"
          footer-border-variant="dark"
          title="Title"
          style="max-width: 20rem"
        >
          <b-card-text>Header and footers variants.</b-card-text>
        </b-card>
      </div> -->

      <!-- CEKSENET BORDRO LISTE Full Table -->
      <base-block title>
        <div class="col-lg-12 alert alert-info" v-if="alertDiv">
          {{ alertMessage }}
        </div>
        <p class="text-right">
          <button
            type="button"
            v-b-modal.modal-block-vcenter
            @click="btnDuzenleClick((newSFATMASTID = -999))"
            class="btn btn-success"
          >
            Yeni Çek / Senet
            <i class="si si-plus"></i>
          </button>
        </p>
        <!-- ARAMA FORM -->
        <div class="form-row mb-3">
          <div class="col-12 mb-3">
            <b-alert show dismissible variant="primary">
              Form üzerinden girdiğiniz bilgiler ile müşterilerinizi kolayca
              listeleyebilirsiniz. Bilgileri doğru bir şekilde girdiğinizden
              emin olun ve ardından klavyede bulunan "Enter" tuşuna basın.
            </b-alert>
          </div>
          <div class="col-md-3">
            <label class="text-primary">Bordro No</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Çek / Senete ait Bordro No bilgisi..."
              v-model="AramaParam.searchBelge"
              @keyup.enter="EditAramaKeyupEnter()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Çek / Senet No</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Çek / Senete ait No bilgisi..."
              v-model="AramaParam.searchEmail"
              @keyup.enter="EditAramaKeyupEnter()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Müşteri Adı</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Aranan müşteriye ait telefon bilgisi..."
              v-model="AramaParam.searchTelephone"
              @keyup.enter="EditAramaKeyupEnter()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Tarih</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Aranan müşteriye ait şehir bilgisi..."
              v-model="AramaParam.searchCity"
              @keyup.enter="EditAramaKeyupEnter()"
            />
          </div>
          <!--<div class="col-md-4 mb-3">
            <label class="text-primary">&nbsp;</label>
            <button type="button" @click="" class="btn btn-primary col-md-12">Listele</button>
          </div>-->
        </div>
        <!-- ARAMA FORM -->
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
              <b-td>{{ kambiyo.tip_id2 }}</b-td>
              <b-td>{{ kambiyo.TARIHVADE }}</b-td>
              <b-td>{{ kambiyo.CRISIM }}</b-td>
              <b-td>{{ kambiyo.TUTARB }}</b-td>
              <b-td>{{ kambiyo.TUTAR }}</b-td>
              <b-td class="text-center">
                <b-button
                  size="sm"
                  variant="alt-primary"
                  title="Düzenle"
                  v-b-modal.modal-block-vcenter
                  @click="btnDuzenleClick(kambiyo.kam_id)"
                >
                  <i class="fa fa-fw fa-pencil-alt"></i>
                </b-button>
                <b-button
                  size="sm"
                  variant="alt-danger"
                  title="Kaldır"
                  v-b-modal.modal-block-vcenter-delete
                  @click="btnDuzenleClick(kambiyo.kam_id)"
                >
                  <i class="fa fa-minus"></i>
                </b-button>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </base-block>
      <!-- CEKSENET BORDRO LISTE Full Table -->

      <!-- CEKSENET BORDRO EDIT Begin Modal -->
      <b-modal
        id="modal-block-vcenter"
        size="xl"
        body-class="p-0"
        centered
        hide-footer
        hide-header
      >
        <ceksenetedit />
      </b-modal>
      <!-- CEKSENET BORDRO EDIT End Modal -->

      <!--  -->
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
    this.EditAramaKeyupEnter();
  },
  methods: {
    async EditAramaKeyupEnter() {
      //sfatmast
      //this.firmaParam.MUTNAME = "SET_KAMBIYOMASTLIST"; //mutation name
      this.firmaParam.BELNO = this.AramaParam.searchBelge;
      this.firmaParam.FTTARIH = this.AramaParam.searchTarih;
      this.firmaParam.FTCRID = this.AramaParam.searchCari;
      this.firmaParam.USERCODE = this.AramaParam.searchUser;
      this.firmaParam.Table = "skambiyomaster";
      this.firmaParam.Yontem = "Liste";
      await resourceApi.getTable({ ...this.firmaParam });
    },
    async btnDuzenleClick(_ID) {
      //skambiyomaster
      this.firmaParam.kam_id = _ID;
      this.firmaParam.carbor_id = "";
      this.firmaParam.Table = "skambiyomaster";
      this.firmaParam.Yontem = "Edit";
      await resourceApi.getTableID({ ...this.firmaParam });
      this.ComboCariListe();

      //skambiyo
      this.firmaParam.kam_id = "";
      this.firmaParam.carbor_id = _ID;
      this.firmaParam.Table = "skambiyo";
      this.firmaParam.Yontem = "Liste";
      await resourceApi.getTable({ ...this.firmaParam });
    },
    async ComboCariListe() {
      this.comboParam.SECIM = this.kambiyoMasterEdit.cari_id;
      this.comboParam.VALUE = "CRID";
      this.comboParam.TEXT = "CRISIM";
      this.comboParam.TABLE = "scari";
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

<style >
</style>
