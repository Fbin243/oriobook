<template>
  <div class="product-card" style="position: relative">
    <div class="image-container">
      <a
        :href="'/products/' + product._id"
        class="img-1"
        @click="handleLinkClick('/products')"
      >
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

    <div style="position: absolute; top: -3px; right: 0" v-if="!product.stock">
      <span class="badge bg-danger" style="border-radius: 0">SOLD OUT</span>
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
            `${process.env.MAIN_URL}/account/addToCart/${id}/${quantity}`
          );
          if (response.data.status == true) {
            const response1 = await axios.get(
              `${process.env.MAIN_URL}/account/getCart`
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
          window.location.href = "/login";
        }
      } else {
        toast.error("Sold out!", {
          autoClose: 1000,
        });
      }
    },
  },

  setup() {
    const imgHover = ref(true);

    function handleLinkClick(to) {
      localStorage.setItem("activeLink", to);
    }

    return {
      imgHover,
      handleLinkClick,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/home/home_product_cart.scss";
</style>
