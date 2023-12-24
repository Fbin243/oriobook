<template>
  <div class="product-card">
    <div class="image-container">
      <a :href="'/products/' + product._id" class="img-1">
        <img :src="product.image" :alt="product.name" class="img-1" />
      </a>
      <button class="add-to-cart" @click="AddProduct(product._id)">
        <i class="fa-solid fa-cart-plus"></i>
      </button>
    </div>
    <div class="product-info">
      <a class="author-name" href="#">{{ product.id_author.name }} </a>
      <div class="product-name-box">
        <a class="product-name" href="#">{{ product.name }}</a>
      </div>
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
import axios from "../../config/axios";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "HomeProductCard",
  props: ["product"],
  setup() {
    const imgHover = ref(true);

    async function AddProduct(id) {
      try {
        console.log(id);
        const response = await axios.post(
          `http://localhost:3000/account/addToCart/${id}`
        );

        if (response.data.status == true) {
          toast.success("Wow Success!", {
            autoClose: 2000,
          });
          window.location.reload();
        }
      } catch (error) {
        // console.error("Lỗi khi gọi API", error);
        window.location.href = "http://localhost:8080/login";
      }
    }

    return {
      AddProduct,
      imgHover,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/home/home_product_cart.scss";
</style>
