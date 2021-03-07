<template>
  <div class="container">
    <div>
      <div>
        <b-card-group deck>
          <b-card
            class="shadow p-2 mb-2"
            header="primary"
            header-bg-variant="primary"
            header-text-variant="white"
            align="center"
          >
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>
          <b-card
            class="shadow p-2 mb-2 bg-white"
            border-variant="secondary"
            header="secondary"
            header-bg-variant="secondary"
            header-text-variant="white"
            align="center"
          >
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>

          <b-card
            class="shadow p-1 mb-2"
            border-variant="success"
            header="Success"
            header-bg-variant="success"
            header-text-variant="white"
            align="center"
          >
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing cşv şlfdlşdflş
              dflş kdflşl elit.</b-card-text
            >
          </b-card>
        </b-card-group>
      </div>
      <div class="mt-3">
        <b-card-group deck>
          <b-card
            class="shadow"
            border-variant="info"
            header="Info"
            header-bg-variant="info"
            header-text-variant="white"
            align="center"
          >
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>

          <b-card
            border-variant="warning"
            header="Warning"
            header-bg-variant="transparent"
            align="center"
          >
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>

          <b-card
            border-variant="danger"
            header="Danger"
            header-border-variant="danger"
            header-text-variant="danger"
            align="center"
          >
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>
        </b-card-group>
      </div>
      <div class="mt-3">
        <b-card-group deck class="mb-3">
          <b-card border-variant="light" header="Light" class="text-center">
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>

          <b-card border-variant="dark" header="Dark" align="center">
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>
        </b-card-group>
      </div>
    </div>
    <!--  -->

    <div>
      <b-input-group>
        <template v-slot:prepend>
          <b-dropdown text="Dropdown" variant="info">
            <b-dropdown-item>Action A</b-dropdown-item>
            <b-dropdown-item>Action B</b-dropdown-item>
          </b-dropdown>
        </template>

        <b-form-input></b-form-input>

        <template v-slot:append>
          <b-dropdown
            text="Dropdown"
            variant="outline-secondary"
            v-for="i in 2"
            :key="i"
          >
            <b-dropdown-item>Action C</b-dropdown-item>
            <b-dropdown-item>Action D</b-dropdown-item>
          </b-dropdown>
        </template>
      </b-input-group>
    </div>
    <!--  -->

    <br />
    <!-- card1 -->
    <div>
      <div>
        <b-card-group deck>
          <b-card
            bg-variant="primary"
            text-variant="white"
            header="Primary"
            class="text-center"
          >
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>

          <b-card
            bg-variant="secondary"
            text-variant="white"
            header="Secondary"
            class="text-center"
          >
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>

          <b-card
            bg-variant="success"
            text-variant="white"
            header="Success"
            class="text-center"
          >
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>
        </b-card-group>
      </div>
      <div class="mt-3">
        <b-card-group deck>
          <b-card
            bg-variant="info"
            text-variant="white"
            header="Info"
            class="text-center"
          >
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>

          <b-card
            bg-variant="warning"
            text-variant="white"
            header="Warning"
            class="text-center"
          >
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>

          <b-card
            bg-variant="danger"
            text-variant="white"
            header="Danger"
            class="text-center"
          >
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>
        </b-card-group>
      </div>
      <div class="mt-3">
        <b-card-group deck>
          <b-card bg-variant="light" header="Light" class="text-center">
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>

          <b-card
            bg-variant="dark"
            header="Dark"
            text-variant="white"
            class="text-center"
          >
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>

          <b-card header="Default" class="text-center">
            <b-card-text
              >Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</b-card-text
            >
          </b-card>
        </b-card-group>
      </div>
    </div>

    <!-- card1 -->
  </div>
</template>
<script>
export default {
  name: "card",
  props: {},
};
</script>
<style>
.card:hover {
  transform: scale(1.01);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}
</style>
