<template>
  <div class="item-product">
    <div class="items" v-for="item in group" :key="item">
      <div class="product-button">
        <div class="products-thumb">
          <div class="product-lable">
            <div class="hot">Hot</div>
          </div>
          <div class="product-thumb-hover">
            <a
              :href="'/products/' + item._id"
              class="woocommerce-LoopProduct-link"
            >
              <img
                loading="lazy"
                :src="item.image"
                :alt="item.name"
                class="fade-in lazyload wp-post-image"
                decoding="async"
              />
            </a>
          </div>
          <button class="add-to-cart" @click="AddProduct(item._id)">
            <i class="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>

      <div class="products-content">
        <div class="contents">
          <div class="list-author">
            <span>
              <a :href="'/authors/' + item.id_author._id" class="item-author">{{
                item.id_author.name
              }}</a>
            </span>
          </div>
          <h3>
            <a :href="'/products/' + item._id" class="product-title"
              >{{ item.name }}
            </a>
          </h3>
          <span class="price">
            <span class="woocommerce-Price-amount amount">
              <bdi>
                {{ item.price
                }}<span class="woocommerce-Price-currencySymbol">&#36;</span>
              </bdi>
            </span>
          </span>
          <div class="available-box">
            <label class="hugry">Hugry Up!</label>
          </div>
        </div>
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
  name: "HomeProductDeal",
  props: ["group"],
  setup() {
    const number = ref(2);

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
      number,
      AddProduct,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/home/home_deal.scss";
</style>
