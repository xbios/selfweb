<template>
  <div>
    <div class="block block-themed block-transparent mb-0">
      <div class="block-header bg-secondery-dark">
        <h3 class="block-title">{{secimCaption}} --- {{viewName}}</h3>
        <div class="block-options">
          <button
            type="button"
            class="btn-block-option"
            @click="$bvModal.hide('modal-block-secim')"
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
          <!-- <p>{{ secimDataValue }}</p> -->
          <div class="form-row mb-3">
            <div class="col-md-4">
              <label class="text-primary">Kodu</label>
              <input
                type="text"
                id="KODU"
                class="form-control"
                placeholder="Aranan Kod"
                v-model="secimParam.searchKodu"
                @keyup.enter="SecimListe()"
              />
            </div>
            <div class="col-md-4">
              <label class="text-primary">Adı</label>
              <input
                type="text"
                id="ADI"
                class="form-control"
                placeholder="Aranan Ad"
                v-model="secimParam.searchAdi"
                @keyup.enter="SecimListe()"
              />
            </div>
            <div class="col-md-4">
              <label class="text-primary">&nbsp;</label>
              <b-button size="md" class="btn btn-success col-md-12" @click="SecimListe()">
                Listele
                <i class="fa fa-fw fa-list"></i>
              </b-button>
            </div>
          </div>
          <b-table-simple responsive striped table-class="table-vcenter">
            <b-thead>
              <b-tr class="text-primary">
                <!-- <b-th>İl</b-th>
                <b-th>İlçe</b-th>-->
                <b-th>Kodu</b-th>
                <b-th>Adı</b-th>
                <b-th></b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="secim in secimData" :key="secim.value">
                <!-- <b-td class="font-weight-bolder">{{ vergi.IL }}</b-td>
                <b-td>{{ vergi.ILCE }}</b-td>-->
                <b-td class="font-weight-bolder">{{ secim.value }}</b-td>
                <b-td>{{ secim.text }}</b-td>
                <b-td class="text-center">
                  <b-button
                    size="sm"
                    variant="alt-primary"
                    title="Seç"
                    @click="
                    $bvModal.hide('modal-block-secim'),
                            DataSec(secim)
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
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

import resourceApi from "@/api/smSelf";

export default {
  // name:,
  props: {
    secimCaption: String,
    viewName: String,
  },
  data() {
    return {};
  },
  methods: {
    DataSec(secim) {
      if (this.viewName == "fatmastEdit.FTCRID") {
        this.scariCombo.push(secim);
        this.fatmastEdit.FTCRID = secim.value;
      }
    },
    async SecimListe() {
      this.secimParam.SECIM = this.secimParam.searchKodu;
      await resourceApi.getCombo({ ...this.secimParam });
    },
  },
  computed: {
    // ...mapState({
    //   //
    // }),
    ...mapFields([
      //
      "secimParam",
      "secimData",

      "fatmastEdit",
      "scariCombo",

      "editApikey",
      "editFRID",
      "editUserID",
    ]),
  },
};
</script>

<style scoped>
</style>
