<template>
  <div class="product-card">
    <router-link
      class="image-container"
      :to="{
        name: 'ProductDetails',
        params: { id: product._id },
      }"
    >
      <img :src="product.image" :alt="product.name" class="img-1" />
      <div class="add-to-cart">
        <i class="fa-solid fa-cart-plus"></i>
      </div>
    </router-link>
    <div class="product-info">
      <a class="author-name" href="#">{{ product.id_author.name }} </a>
      <a class="product-name" href="#">{{ product.name }}</a>
      <p>${{ product.price.toFixed(2) }}</p>
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
  name: "HomeProductCard",
  props: ["product"],
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
