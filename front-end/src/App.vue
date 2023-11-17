<template>
  <section class="header-wrapper">
    <section class="container">
      <Nav />
      <Header />
    </section>
  </section>
</template>

<script>
import Header from "./components/Header.vue";
import Nav from "./components/Nav.vue";

export default {
  name: "App",
  components: {
    Header,
    Nav,
  },
};
</script>

<style>
@import "./assets/scss/app.scss";
</style>
