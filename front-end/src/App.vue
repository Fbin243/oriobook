<template>
  <Nav />
  <Header :addCartBool="addCartBool" />
  <Cart @add-cart="addCart" />
  <router-view @add-cart="addCart" />
  <Footer />
</template>

<script>
import Nav from "@/components/Nav.vue";
import Header from "@/components/Header.vue";
import Cart from "@/components/Cart.vue";
import Footer from "@/components/Footer";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "App",
  components: {
    Nav,
    Header,
    Cart,
    Footer,
  },
  setup(props, { emit }) {
    const addCartBool = ref(false);

    const addCart = () => {
      addCartBool.value = !addCartBool.value;
    };

    return {
      addCart,
      addCartBool,
    };
  },
};
</script>

<style lang="scss">
@import "@/styles/app.scss";
</style>
