<template>
  <!-- Page Content -->
  <div class="hero">
    <div class="hero-inner text-center">
      <div class="bg-white overflow-hidden">
        <div class="content content-full">
          <div class="py-4">
            <!-- Error Header -->
            <h1 class="display-1 text-city">404</h1>
            <h2 class="h3 font-w300 text-muted mb-5">Üzgünüz ama aradığınız sayfa bulunamadı.</h2>
            <!-- END Error Header -->

            <!-- Search Form -->
            <b-form @submit.prevent>
              <b-row class="form-group justify-content-center">
                <b-col sm="6" xl="4">
                  <b-input-group>
                    <b-form-input placeholder="uygulama Ara.."></b-form-input>
                    <b-input-group-append>
                      <b-button type="submit" variant="secondary">
                        <i class="fa fa-search"></i>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-col>
              </b-row>
            </b-form>
            <!-- END Search Form -->
          </div>
        </div>
      </div>
      <div class="content content-full font-size-sm text-muted">
        <!-- Error Footer -->
        <p class="mb-1">Bunu bize bildirmek ister misiniz??</p>
        <a href="javascript:void(0)" class="link-fx">Rapor Et</a>
        yada
        <router-link to="/backend/pages/errors/all" class="link-fx">Giriş Sayfasına Git</router-link>
        <!-- END Error Footer -->
      </div>
    </div>
  </div>
  <!-- END Page Content -->
</template>
