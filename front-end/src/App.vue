<template>
  <section class="header-wrapper">
    <section class="container">
      <Nav />
      <Header />
      <Hero />
    </section>
  </section>
</template>

<script>
import Header from "./components/Header.vue";
import Nav from "./components/Nav.vue";
import Hero from "./components/Hero.vue";

export default {
  name: "App",
  components: {
    Header,
    Nav,
    Hero,
  },
};
</script>

<style lang="scss">
@import "./styles/app.scss";
</style>
