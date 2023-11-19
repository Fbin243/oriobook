<template>
  <header class="header container">
    <router-link to="/" class="logo">
      <img src="@/assets/img/logo.png" alt="logo" />
    </router-link>
    <div class="d-flex align-items-center">
      <div
        class="search me-3 d-flex align-items-center"
        role="button"
        v-if="$route.name != 'Home'"
      >
        <i class="fa-regular fa-magnifying-glass"></i>
        <span>Search</span>
      </div>
      <div class="cart-btn" role="button">
        <i class="fa-sharp fa-regular fa-basket-shopping-simple"></i>
        <span id="lblCartCount"> 0 </span>
        <span>Cart</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
@import "@/styles/header.scss";
</style>
