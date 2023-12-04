<template>
  <div class="shop-page" style="margin-bottom: 100px">
    <div class="img-cover centered-nav">
      <ul
        class="nav nav-underline d-flex justify-content-center title-heading"
        style="padding-bottom: 150px"
      >
  
        <li class="nav-item">
          <a class="nav-link active" href="#">Checkout</a>
        </li>
        
      </ul>
    </div>
    <checkout />
  </div>
</template>

<script>
import Checkout from "@/components/Checkout";

export default {
  components: {
    Checkout,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mainCheck.scss";
@import "@/styles/Headcheckout.scss";
</style>
