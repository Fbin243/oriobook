<template>
  <header class="header container">
    <router-link to="/" class="logo">
      <img src="../assets/img/logo.png" alt="logo" />
    </router-link>
    <div class="cart">
      <i class="fa-sharp fa-regular fa-basket-shopping-simple cart-icon"></i>
      <span>Cart</span>
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
