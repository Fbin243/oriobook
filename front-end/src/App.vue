<template>
  <Nav />
  <Header />
  <Cart />
  <router-view />
  <Footer />
</template>

<script>
import Nav from "@/components/Nav.vue";
import Header from "@/components/Header.vue";
import Cart from "@/components/Cart.vue";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Nav,
    Header,
    Cart,
    Footer,
  },
};
</script>

<style lang="scss">
@import "@/styles/app.scss";
</style>
