<template>
  <div>
    <!-- Full Table -->
    <base-block title>
      <div class="col-lg-12 alert alert-info" v-if="alertDiv">{{ alertMessage }}</div>
      <p class="text-right">
        <button
          type="button"
          v-b-modal.modal-block-vcenter2
          @click="getModal((cek_id = -999))"
          class="btn btn-success"
        >
          Yeni Satır
          <i class="si si-plus"></i>
        </button>
      </p>

      <b-table-simple responsive striped table-class="table-vcenter">
        <b-thead>
          <b-tr class="text-primary">
            <b-th>Bordro No</b-th>
            <b-th>Çek Kayıt No</b-th>
            <b-th>Çek Tarih</b-th>
            <b-th>Banka</b-th>
            <b-th>Çek No</b-th>
            <b-th>İşlem</b-th>
            <b-th>Bağlantı</b-th>
            <b-th class="text-right">Borç</b-th>
            <b-th class="text-right">Alacak</b-th>

            <b-th></b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="kambiyoDetay in kambiyoDetayList" :key="kambiyoDetay.cek_id">
            <b-td>{{ kambiyoDetay.carbor_id }}</b-td>
            <b-td>{{ kambiyoDetay.cek_id }}</b-td>
            <b-td>{{ kambiyoDetay.TARIHVADE }}</b-td>
            <b-td>{{ kambiyoDetay.ACIKLAMABANKA }}</b-td>
            <b-td>{{ kambiyoDetay.CEKNO }}</b-td>

            <b-td>{{ kambiyoDetay.islem }}</b-td>
            <b-td>{{ kambiyoDetay.bag_id }}</b-td>
            <b-td class="text-right">{{ kambiyoDetay.TUTARB }}</b-td>
            <b-td class="text-right">{{ kambiyoDetay.TUTAR }}</b-td>

            <b-td class="text-center">
              <b-button
                size="sm"
                variant="alt-primary"
                title="Düzenle"
                v-b-modal.modal-block-vcenter2
                @click="getModal(kambiyoDetay.cek_id)"
              >
                <i class="fa fa-fw fa-pencil-alt"></i>
              </b-button>
              <b-button
                size="sm"
                variant="alt-danger"
                title="Kaldır"
                v-b-modal.modal-block-vcenter-delete
                @click="getModal(kambiyoDetay.cek_id)"
              >
                <i class="fa fa-minus"></i>
              </b-button>
            </b-td>
          </b-tr>
        </b-tbody>

        <b-tfoot class="bg-black-10">
          <b-tr>
            <b-th></b-th>
            <b-th></b-th>
            <b-th></b-th>
            <b-th></b-th>
            <b-th></b-th>
            <b-th></b-th>
            <b-th></b-th>
            <b-th class="text-right text-primary">{{formatPrice(_FIYATSUM)}}</b-th>
            <b-th class="text-right text-primary">{{formatPrice(_TUTARSUM)}}</b-th>
            <b-th></b-th>
          </b-tr>
        </b-tfoot>
      </b-table-simple>
    </base-block>
    <!-- END Full Table -->

    <!-- Begin Modal -->
    <b-modal id="modal-block-vcenter2" size="xl" body-class="p-0" centered hide-footer hide-header>
      <ceksenetdetayEdit />
    </b-modal>
    <!-- End Modal -->
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import resourceApi from "@/api/smSelf";

import ceksenetdetayEdit from "@/views/ceksenet/ceksenetdetayEdit.vue";

export default {
  // name:,
  components: {
    ceksenetdetayEdit,
  },
  data() {
    return {
      sonuc: "",
      alertDiv: null,
      alertMessage: null,
    };
  },
  methods: {
    formatPrice(value) {
      if (value > 0) {
        let val = (value / 1).toFixed(2).replace(".", ",");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    },
    async getModal(_ID) {
      //sfatdet
      this.firmaParam.MUTNAME = "SET_KAMBIYODETEDIT";
      this.firmaParam.cek_id = _ID;
      await resourceApi.getTableID("skambiyo", { ...this.firmaParam });
    },
  },
  computed: {
    ...mapFields([
      //
      "AramaParam",
      "firmaParam",
      "kambiyoDetayList",
      "kambiyoDetayEdit",

      "editApikey",
      "editFRID",
      "editUserID",
    ]),
    _FIYATSUM: function () {
      let sum = 0;
      this.kambiyoDetayList.forEach(function (smm) {
        sum += parseFloat(smm.TUTARB);
      });
      return sum;
    },
    _TUTARSUM: function () {
      let sum = 0;
      this.kambiyoDetayList.forEach(function (smm) {
        sum += parseFloat(smm.TUTAR);
      });
      return sum;
    },
  },
};
</script>

<style scoped>
</style>
