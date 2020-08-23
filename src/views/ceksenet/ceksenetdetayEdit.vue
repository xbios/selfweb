<template>
  <div>
    <!-- Begin Modal block-->
    <div class="block block-themed block-transparent mb-0">
      <div class="block-header bg-secondery-dark">
        <h3 class="block-title">Çek Senet Satırı</h3>
        <div class="block-options">
          <button
            type="button"
            class="btn-block-option"
            @click="$bvModal.hide('modal-block-vcenter2')"
          >
            <i class="fa fa-fw fa-times"></i>
          </button>
        </div>
      </div>
      <div class="block-content font-size-sm">
        <!--  <div class="form-row"> </div>-->
      </div>
      <div class="block-content block-content-full text-right border-top">
        <b-button variant="light" size="sm" @click="$bvModal.hide('modal-block-vcenter2')">Vazgeç</b-button>
        <b-button
          variant="primary"
          size="sm"
          @click="$bvModal.hide('modal-block-vcenter2'), detayKaydet()"
        >
          <i class="fa fa-check mr-1"></i> Kaydet
        </b-button>
      </div>
    </div>
    <!-- End Modal block-->
  </div>
</template>

<script>
export default {
  // name:,
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
</style>
