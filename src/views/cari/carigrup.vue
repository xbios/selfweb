<template>
  <div>
    <!-- Hero -->
    <base-page-heading title="Cari Grup Listesi" subtitle="Cari Grup Tanımlama"></base-page-heading>
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
              v-model="searchName"
              @keyup.enter="getCariList()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Müşteri maili</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Aranan müşteriye ait mail bilgisi..."
              v-model="searchEmail"
              @keyup.enter="getCariList()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Müşteri telefonu</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Aranan müşteriye ait telefon bilgisi..."
              v-model="searchTelephone"
              @keyup.enter="getCariList()"
            />
          </div>
          <div class="col-md-3">
            <label class="text-primary">Müşteri şehir</label>
            <input
              type="text"
              class="form-control col-12"
              placeholder="Aranan müşteriye ait şehir bilgisi..."
              v-model="searchCity"
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
              <!-- form -->
              <div class="col-md-12 mb-4">
                <label class="text-primary" for="newCRISIM">Müşteri Adı</label>
                <input
                  :value="newCRISIM"
                  @input="newCRISIM = $event.target.value"
                  class="form-control"
                  id="newCRISIM"
                  placeholder="Müşteri adı"
                  type="text"
                />
              </div>
              <div class="col-md-6 mb-4">
                <label class="text-primary" for="newCRISIM">Müşteri Soyadı</label>
                <input
                  :value="newCRISIM"
                  @input="newCRISIM = $event.target.value"
                  class="form-control"
                  id="newCRISIM"
                  placeholder="Müşteri adı"
                  type="text"
                />
              </div>
              <div class="col-md-6 mb-4">
                <label class="text-primary" for="newCRISIM">Müşteri Adı</label>
                <input
                  :value="newCRISIM"
                  @input="newCRISIM = $event.target.value"
                  class="form-control"
                  id="newCRISIM"
                  placeholder="Müşteri adı"
                  type="text"
                />
              </div>
              <div class="col-md-6 mb-4">
                <label class="text-primary">Şehir</label>
                <select
                  @change="
                    (newCRSEHIR = $event.target.value), getIlceler(newCRSEHIR)
                  "
                  class="form-control"
                  id="newCRSEHIR"
                >
                  <option
                    v-for="sehir in sehirler"
                    v-bind:key="sehir.name"
                    v-bind:value="sehir.name"
                    :selected="newCRSEHIR == sehir.name"
                  >{{ sehir.name }}</option>
                </select>
              </div>

              <!-- form -->
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
  </div>
</template>

<script>
export default {
  // name:,
  data() {
    return {
      cariList: [
        {
          FRID: null,
          CRID: null,
          CRISIM: null,
          CRADRES: null,
          CRSEHIR: null,
          CRILCE: null,
          CRTEL: null,
          CREMAIL: null,
          CRVERGD: null,
          CRVERGNO: null,
          CRAD: null,
          CRSOYAD: null
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped></style>
