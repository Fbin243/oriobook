<template>
  <div class="product-card">
    <a class="image-container" href="/product-details">
      <img src="../../assets//img/products/product-106.jpg" alt="Image 1" class="img-1" />
      <div class="add-to-cart">
        <i class="fa-solid fa-cart-plus"></i>
      </div>
    </a>
    <div class="product-info">
      <a class="author-name" href="#">GUNVOR HOFMO </a>
      <a class="product-name" href="#">Product Name </a>
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
  name: 'HomeProductCard',
  setup() {
    const imgHover = ref(true);



    return {
      imgHover,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/home/home_product_cart.scss";
</style>
