<template>
  <div>
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
            @keyup.enter="getvergidairelerFind(newVergIL, newVergILCE)"
            :value="newVergIL"
            placeholder="İl Adı"
            @input="newVergIL = $event.target.value"
          />
        </div>
        <div class="col-md-4">
          <label class="text-primary">Vergi Dairesi Adı</label>
          <input
            type="text"
            id="newVergILCE"
            class="form-control"
            @keyup.enter="getvergidairelerFind(newVergIL, newVergILCE)"
            :value="newVergILCE"
            placeholder="Vergi Dairesi Adı"
            @input="newVergILCE = $event.target.value"
          />
        </div>
        <div class="col-md-4">
          <label class="text-primary">&nbsp;</label>
          <b-button
            size="md"
            class="btn btn-success col-md-12"
            @click="getvergidairelerFind(newVergIL, newVergILCE)"
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
</template>

<script>
import { mapState } from "vuex";

export default {
  // name:,
  data() {
    return {};
  },
  mounted() {
    console.log("vergidaire: ");
    this.getvergidairelerFind(this.VergIL, this.VergILCE);
  },
  methods: {
    VergiDairesiSec(vergi) {
      const _vergi = [];
      _vergi.push(vergi);
      this.$store.dispatch("actSetVd", _vergi);
    },
    getvergidairelerFind(_IL, _ILCE) {
      let _frID = this.$session.get("FRID");
      let _Apikey = "8e86b685-88e6-11ea-943a-000c292fbb99";
      this.$resource("getvergidaireList.php")
        .get({ FRID: _frID, Apikey: _Apikey, IL: _IL, ILCE: _ILCE })
        .then(response => {
          const _vergidLerFind = response.body.data;
          this.$store.dispatch("actSetVdFind", _vergidLerFind);
        });
    }
  },
  computed: {
    ...mapState({
      vergidLerFind: state => state.vergidLerFind,
      VergIL: state => state.VergIL,
      VergILCE: state => state.VergILCE
    })
  }
};
</script>

<style scoped>
</style>
