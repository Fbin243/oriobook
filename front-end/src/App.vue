<template>
  <Nav />
  <Header />
  <router-view />
</template>

<script>
import Nav from "@/components/Nav.vue";
import Header from "@/components/Header.vue";
export default {
  name: "App",
  components: {
    Nav,
    Header,
  },
};
</script>

<style lang="scss">
@import "@/styles/app.scss";
</style>
