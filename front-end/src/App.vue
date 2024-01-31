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
import { ref, provide, onMounted } from "vue";
import axios from "./config/axios";

const quantity = ref(0); // Khai báo biến quantity là biến toàn cục

export default {
  name: "App",

  components: {
    Nav,
    Header,
    Cart,
    Footer,
  },

  inject: ["eventBus"],
  methods: {
    getCookie() {
      const username = this.$cookies;
    },
  },
  setup() {
    onMounted(async () => {
      try {
        const response = await axios.get(
          `${process.env.MAIN_URL}/account/getCart`
        );

        for (let i = 0; i < response.data.length; i++) {
          quantity.value += response.data[i].quantities;
        }
      } catch (error) {
        console.error("Lỗi khi gọi API", error);
      }
    });

    provide("quantity", quantity);
  },

  mounted() {
    this.eventBus.on("reload", (newquantity) => {
      console.log("newquantity " + newquantity);
      // Cập nhật giá trị mới cho quantity
      quantity.value = newquantity;
    });
  },
};
</script>

<style lang="scss">
@import "@/styles/app.scss";
</style>
