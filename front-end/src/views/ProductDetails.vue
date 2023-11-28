<template>
  <div class="product-details container">
    <div class="row">
      <div class="col-12 title">Related Products</div>

      <div class="row">
        <div class="col-3 mt-3" v-for="index in 4" :key="index">
          <HomeProductCard />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import HomeProductCard from "@/components/product/HomeProductCard.vue";

export default {
  name: "ProductDetails",
  components:{
    HomeProductCard,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/product/product_details.scss";
</style>
