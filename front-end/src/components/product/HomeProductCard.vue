<template>
  <div class="product-card">
    <div class="image-container">
      <a :href="'/products/' + product._id" class="img-1">
        <img :src="product.image" :alt="product.name" class="img-1" />
      </a>
      <button
        class="add-to-cart"
        @click="AddProduct(product._id, product.stock)"
      >
        <i class="fa-solid fa-cart-plus"></i>
      </button>
    </div>
    <div class="product-info">
      <a class="author-name" href="#">{{ product.id_author.name }} </a>
      <div class="product-name-box">
        <a class="product-name ellipsis-custom-1 me-2" href="#">{{
          product.name
        }}</a>
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
  inject: ["eventBus"],
  props: ["product"],

  methods: {
    async AddProduct(id, stock) {
      if (stock > 0) {
        try {
          console.log(id);
          const quantity = 1;
          const response = await axios.post(
            `https://localhost:3000/account/addToCart/${id}/${quantity}`
          );
          if (response.data.status == true) {
            const response1 = await axios.get(
              `https://localhost:3000/account/getCart`
            );
            let newquantity = ref(0);
            for (let i = 0; i < response1.data.length; i++) {
              newquantity.value += response1.data[i].quantities;
            }
            this.eventBus.emit("reload", newquantity.value);
            toast.success("Added Product!", {
              autoClose: 1000,
            });
          }
        } catch (error) {
          console.error("Lỗi khi gọi API", error);
          window.location.href = "https://localhost:8080/login";
        }
      }
    },
  },

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
