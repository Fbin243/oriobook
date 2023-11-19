<template>
  <Nav />
  <Header />
  <Cart />
  <router-view />
</template>

<script>
import Nav from "@/components/Nav.vue";
import Header from "@/components/Header.vue";
import Cart from "./components/Cart.vue";
export default {
  name: "App",
  components: {
    Nav,
    Header,
    Cart,
  },
};
</script>

<style lang="scss">
@import "@/styles/app.scss";
</style>
