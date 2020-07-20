<template>
  <div>
    <!-- Hero -->
    <base-page-heading title="Fatura Listesi" subtitle="Fatura Oluşturma"></base-page-heading>
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
            @click="faturaModal((newSFATMASTID = -999))"
            class="btn btn-success"
          >
            Yeni Fatura
            <i class="si si-plus"></i>
          </button>
        </p>
        <div class="form-row mb-3">
          <div class="col-12 mb-3">
            <b-alert show dismissible variant="primary">
              Form üzerinden girdiğiniz bilgiler ile faturalarınızı kolayca
              listeleyebilirsiniz. Bilgileri doğru bir şekilde girdiğinizden
              emin olun ve ardından klavyede bulunan "Enter" tuşuna
              basın.
            </b-alert>
          </div>
          <div class="col-md-3">
            <label class="text-primary">Belge No</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Fatura Belge bilgisi..."
              v-model="AramaParam.searchBelge"
              @keyup.enter="getFaturaList()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Tarih</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Fatura Tarih bilgisi..."
              v-model="AramaParam.searchTarih"
              @keyup.enter="getFaturaList()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Cari Hesap</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Cari bilgisi..."
              v-model="AramaParam.searchCari"
              @keyup.enter="getFaturaList()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Kullanıcı</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Kullanıcı bilgisi..."
              v-model="AramaParam.searchUser"
              @keyup.enter="getFaturaList()"
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
              <b-th>Onaylı</b-th>
              <b-th>İptal</b-th>
              <b-th>Yaz</b-th>
              <b-th>e-Ft</b-th>
              <b-th>Cari Hesap</b-th>
              <b-th>Tarih</b-th>
              <b-th>No</b-th>
              <b-th>Tür</b-th>
              <b-th></b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="fatura in faturaList" :key="fatura.SFATMASTID">
              <b-td>
                <b-badge v-if="fatura.FTACIK==1" variant="success">{{ fatura.FTACIK2 }}</b-badge>
                <b-badge v-else variant="warning">{{ fatura.FTACIK2 }}</b-badge>
              </b-td>
              <b-td>
                <b-badge variant="danger">{{ fatura.FTIPTAL2 }}</b-badge>
              </b-td>
              <b-td>
                <b-badge variant="info">{{ fatura.YAZ2 }}</b-badge>
              </b-td>
              <b-td>{{ fatura.CRADRES }}</b-td>
              <b-td>{{ fatura.CRISIM }}</b-td>
              <b-td>{{ fatura.FTTARIH }}</b-td>
              <b-td>{{ fatura.FTBELNO }}</b-td>
              <b-td>{{ fatura.FTTUR2 }}</b-td>
              <b-td class="text-center">
                <b-button
                  size="sm"
                  variant="alt-primary"
                  title="Düzenle"
                  v-b-modal.modal-block-vcenter
                  @click="faturaModal(fatura.SFATMASTID)"
                >
                  <i class="fa fa-fw fa-pencil-alt"></i>
                </b-button>
                <b-button
                  size="sm"
                  variant="alt-danger"
                  title="Kaldır"
                  v-b-modal.modal-block-vcenter-delete
                  @click="faturaModal(fatura.SFATMASTID)"
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
        <faturaedit />
      </b-modal>
      <!-- End Modal -->
    </div>
    <!-- END Page Content -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
//import flatPickr from "vue-flatpickr-component";
import faturaedit from "@/views/fatura/faturaedit.vue";

export default {
  // name:,
  components: {
    // flatPickr,
    faturaedit
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
  created() {
    this.getFaturaList();
  },
  methods: {
    getFaturaList() {
      let _frID = this.$session.get("FRID");
      let _Apikey = "8e86b685-88e6-11ea-943a-000c292fbb99";

      this.fatmastParam.FRID = _frID;
      this.fatmastParam.Apikey = _Apikey;
      this.fatmastParam.FTBELNO = this.AramaParam.searchBelge;

      // CRSEHIR: this.searchCity,
      // CRTEL: this.searchTelephone,
      // CREMAIL: this.searchEmail

      this.$resource("getSfatmastList.php")
        .get({
          ...this.fatmastParam
        })
        .then(response => {
          let _faturaList = response.body.data;
          this.$store.dispatch("actSetfaturaList", _faturaList);
        });
    },
    faturaModal(_ID) {
      let _frID = this.$session.get("FRID");
      let _Apikey = "8e86b685-88e6-11ea-943a-000c292fbb99";

      ///fatmast
      this.$resource("getSfatmastID.php")
        .get({ FRID: _frID, Apikey: _Apikey, SFATMASTID: _ID })
        .then(response => {
          let _fatmastEdit = response.body.data[0];
          this.$store.dispatch("actSetFatmastEdit", _fatmastEdit);

          if (_ID <= 0) {
            this.KAYITDATE = "2020-01-01";
          }
        });

      //fatdet
      this.$resource("getSfatdetList.php")
        .get({ FRID: _frID, Apikey: _Apikey, FTID: _ID })
        .then(response => {
          let _fatdetList = response.body.data;
          this.$store.dispatch("actSetfatdetList", _fatdetList);
        });
    }
  },
  computed: {
    ...mapState({
      // vergidLer: state => state.vergidLer
    }),
    ...mapFields([
      //
      "faturaList",
      "AramaParam"
    ])
  }
};
</script>

<style scoped>
</style>
