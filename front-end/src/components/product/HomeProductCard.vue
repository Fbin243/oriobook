<template>
  <div class="product-card">
    <div class="image-container">
      <img src="https://picsum.photos/200/300" alt="Image 1" class="img-1" />
      <div class="add-to-cart">
        <i class="fa-solid fa-cart-plus"></i>
      </div>
    </div>
    <div class="product-info">
      <h3>Product Name</h3>
      <p>$19.99</p>
    </div>
    <div class="overlay d-none">
      <div class="overlay-icons">
        <i class="fas fa-shopping-cart"></i>
        <i class="fas fa-heart"></i>
        <i class="fas fa-search"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const imgHover = ref(true);



    return {
      imgHover,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/home_product_cart.scss";
</style>
