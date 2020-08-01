<template>
  <div>
    <!-- Full Table -->
    <base-block title>
      <div class="col-lg-12 alert alert-info" v-if="alertDiv">{{ alertMessage }}</div>
      <p class="text-right">
        <button
          type="button"
          v-b-modal.modal-block-vcenter
          @click="fatdetModal((FTID = -999))"
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
                v-b-modal.modal-block-vcenter
                @click="fatdetModal(fatura.SFATMASTID)"
              >
                <i class="fa fa-fw fa-pencil-alt"></i>
              </b-button>
              <b-button
                size="sm"
                variant="alt-danger"
                title="Kaldır"
                v-b-modal.modal-block-vcenter-delete
                @click="fatdetModal(fatura.SFATMASTID)"
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
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

export default {
  // name:,
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
  },
  computed: {
    ...mapFields([
      //
      "fatdetList",
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
