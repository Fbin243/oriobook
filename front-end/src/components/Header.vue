<template>
  <header
    class="header container"
    :class="{
      'at-home': $route.name == 'Home' || $route.name == 'Shop',
    }"
  >
    <router-link to="/" class="logo">
      <img src="@/assets/img/logo.png" alt="logo" />
    </router-link>
    <div class="d-flex align-items-center">
      <div
        class="search me-3 align-items-center"
        role="button"
        v-if="$route.name != 'Home'"
        @click="handleSearchForm"
      >
        <i class="fa-regular fa-magnifying-glass"></i>
        <span>Search</span>
      </div>
      <form
        class="search-input"
        role="search"
        v-if="$route.name !== 'Home'"
        @submit.prevent="submitSearch"
      >
        <i
          class="fa-sharp fa-regular fa-xmark search-close-btn"
          role="button"
        ></i>
        <input
          v-model="searchQuery"
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button type="submit">Search</button>
      </form>
      <button class="cart-btn">
        <i class="fa-sharp fa-regular fa-basket-shopping-simple"></i>
        <span id="lblCartCount"> {{ cart.length }} </span>
        <span>Cart</span>
      </button>
    </div>
  </header>
</template>

<script>
import axios from "../config/axios";

import { ref, onMounted } from "vue";

export default {
  name: "Header",
  methods: {
    submitSearch() {
      // Add your logic to handle the search query (e.g., redirect to search results page)
      this.$router
        .push({ name: "Shop", query: { search: this.searchQuery } })
        .then(() => {
          // Reload the current route
          this.$router.go();
        });
    },
  },
  setup() {
    const cart = ref([]);

    const handleSearchForm = () => {
      $(".search").css({
        display: "none",
      });
      $(".search-input").css({
        display: "flex",
      });
      $(".search-close-btn").click(function () {
        $(".search").css({
          display: "unset",
        });
        $(".search-input").css({
          display: "none",
        });
      });
    };

    onMounted(async () => {
      try {
        console.log("cart");
        const response = await axios.get(
          `https://localhost:3000/account/getCart`
        );
        cart.value = response.data;
        console.log(response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API", error);
      }
    });

    return {
      handleSearchForm,
      cart,
    };
  },
  mounted() {
    // Check if the search parameter exists in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get("search");

    // Set searchQuery based on the URL parameter
    if (searchParam) {
      this.searchQuery = searchParam;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/header.scss";
</style>
