<template>
  <Nav />
  <Header />
  <Cart />

  <router-view />
  <featureRow />
  <Category />
</template>

<script>
import Nav from "@/components/Nav.vue";
import Header from "@/components/Header.vue";
import Cart from "@/components/Cart.vue";
import featureRow from "@/components/featureRow.vue";
import Category from "@/components/Categogy.vue";

export default {
  name: "App",
  components: {
    Nav,
    Header,
    Cart,
    featureRow,
    Category,
  },
};
</script>

<style lang="scss">
@import "@/styles/app.scss";
</style>
