<template>
  <div>
    <div class="form-row">
      <div class="col-md-12 mb-4">
        <label for="newCRISIM" class="text-primary">Müşteri Adı</label>
        <input
          type="text"
          id="newCRISIM"
          class="form-control"
          placeholder="Müşteri adı"
          v-model="CRISIM"
        />
      </div>

      <div class="col-md-12 mb-4">
        <label for="newCRADRES" class="text-primary">Adres</label>
        <input
          type="text"
          id="newCRADRES"
          class="form-control"
          placeholder="Adres"
          v-model="CRADRES"
        />
      </div>
      <div class="col-md-6 mb-4">
        <label class="text-primary">Şehir</label>
        <select v-model="CRSEHIR" class="form-control" id="newCRSEHIR">
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
        <select v-model="CRILCE" class="form-control" id="newCRILCE">
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
        <select v-model="CRVERGD" class="form-control" id="newCRVERGD">
          <option disabled value="0" :selected="CRVERGD == 0">Lütfen Vergi Dairesi seçimi yapınız</option>
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
          v-model="CRVERGNO"
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
        <input type="text" id="newCRTEL" class="form-control" placeholder="Telefon" v-model="CRTEL" />
      </div>
      <div class="col-md-6 mb-4">
        <label for="newCREMAIL" class="text-primary">E-mail</label>
        <input
          type="text"
          id="newCREMAIL"
          class="form-control"
          placeholder="E-mail"
          v-model="CREMAIL"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // name:,
  data() {
    return {};
  },
  mounted() {
    console.log("cariedit: ");
  },
  methods: {}
};
</script>

<style scoped>
</style>
