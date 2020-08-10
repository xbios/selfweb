<template>
  <div>
    <!-- Full Table -->
    <base-block title>
      <div class="col-lg-12 alert alert-info" v-if="alertDiv">{{ alertMessage }}</div>
      <p class="text-right">
        <button
          type="button"
          v-b-modal.modal-block-vcenter2
          @click="fatdetModal((FDID = -999))"
          class="btn btn-success"
        >
          Yeni Satır
          <i class="si si-plus"></i>
        </button>
      </p>

      <b-table-simple responsive striped table-class="table-vcenter">
        <b-thead>
          <b-tr class="text-primary">
            <b-th>St Kodu</b-th>
            <b-th>St Kodu</b-th>
            <b-th>Miktar</b-th>
            <b-th>Birim</b-th>
            <b-th>KDV</b-th>
            <b-th>İndirim %</b-th>
            <b-th class="text-right">Fiyat</b-th>
            <b-th class="text-right">Tutar</b-th>

            <b-th></b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="fatura in fatdetList" :key="fatura.SFATMASTID">
            <b-td>{{ fatura.FDSTKODU }}</b-td>
            <b-td>{{ fatura.FDSTKODU }}</b-td>
            <b-td>{{ fatura.FDMIKTAR }}</b-td>
            <b-td>{{ fatura.FDBIRIM }}</b-td>
            <b-td>{{ fatura.FDKDV }}</b-td>
            <b-td>{{ fatura.FDINDIRIMYUZDE }}</b-td>
            <b-td class="text-right">{{ fatura.FDFIYAT }}</b-td>
            <b-td class="text-right">{{ fatura.FDTUTAR }}</b-td>

            <b-td class="text-center">
              <b-button
                size="sm"
                variant="alt-primary"
                title="Düzenle"
                v-b-modal.modal-block-vcenter2
                @click="fatdetModal(fatura.FDID)"
              >
                <i class="fa fa-fw fa-pencil-alt"></i>
              </b-button>
              <b-button
                size="sm"
                variant="alt-danger"
                title="Kaldır"
                v-b-modal.modal-block-vcenter-delete
                @click="fatdetModal(fatura.FDID)"
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
      <faturadetayedit />
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
                <b>Fatura satır kaydını silmek istediğinizden emin misiniz?</b>
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
                        faturaDetaySil()
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
</template>

<script>
import { mapFields } from "vuex-map-fields";
import faturadetayedit from "@/views/fatura/faturadetayedit.vue";

import resourceApi from "@/api/smSelf";

export default {
  // name:,
  components: {
    faturadetayedit,
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
    async fatdetModal(_ID) {
      //sfatdet
      this.firmaParam.MUTNAME = "SET_FATDETEDIT";
      this.firmaParam.FDID = _ID;
      await resourceApi.getTableID("sfatdet", { ...this.firmaParam });
    },
    async faturaDetaySil() {
      console.log("sfatdetSil: deleteSfatdet");
      this.firmaParam.FDID = this.fatdetEdit.FDID;
      await resourceApi.deleteTable("sfatdet", { ...this.firmaParam });
      this.faturaDetay(this.fatdetEdit.FTID);
    },
    async faturaDetay(_ID) {
      //sfatdet
      this.firmaParam.MUTNAME = "SET_FATDETLIST";
      this.firmaParam.FTID = _ID;
      await resourceApi.getTable("sfatdet", { ...this.firmaParam });
    },
  },
  computed: {
    ...mapFields([
      //
      "AramaParam",
      "firmaParam",
      "fatdetList",
      "fatdetEdit",
      "editApikey",
      "editFRID",
      "editUserID",
    ]),
    _FIYATSUM: function () {
      let sum = 0;
      this.fatdetList.forEach(function (smm) {
        sum += parseFloat(smm.FDFIYAT);
      });
      return sum;
    },
    _TUTARSUM: function () {
      let sum = 0;
      this.fatdetList.forEach(function (smm) {
        sum += parseFloat(smm.FDTUTAR);
      });
      return sum;
    },
  },
};
</script>

<style scoped>
b-thead {
  text-transform: none !important;
}
</style>
