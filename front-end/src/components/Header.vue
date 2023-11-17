<template>
  <header class="header">
    <div class="logo">
      <img src="../assets/img/logo.png" alt="logo" />
    </div>
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
@import "../assets/scss/header.scss";
</style>
