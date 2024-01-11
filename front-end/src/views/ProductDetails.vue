<template>
  <div class="product-details container">
    <div class="product-content row mt-5">
      <div class="col-6 justify-content-center d-flex">
        <img
          :src="product.image"
          :alt="product.name"
          class="col-8 product-img"
        />
      </div>
      <div class="product-info col-6 ms-auto">
        <div class="product-title">{{ product.name }}</div>
        <div class="product-rating">
          {{ productRating }} / 5.0
          <i class="fa-solid fa-star" style="color: orange"></i>
        </div>
        <div class="product-price mt-4">${{ product.price }}</div>
        <p class="product-desc d-flex justify-content-between">
          <span>Author: {{ nameAuthor }}</span>
          <span>Category: {{ product.category_name }}</span>
          <span>Stock: {{ product.stock }}</span>
        </p>
        <div class="d-flex pt-5">
          <div class="product-quantity row gx-0 me-2">
            <button class="col">
              <i class="fa-light fa-minus"></i>
            </button>
            <input type="text" class="col text-center" value="5" />
            <button class="col">
              <i class="fa-light fa-plus"></i>
            </button>
          </div>
          <button class="product-add-cart-btn">
            <span class="text-uppercase">Add to cart</span>
          </button>
        </div>
        <button class="product-quick-buy-btn">
          <span class="text-uppercase">Buy now</span>
        </button>

        <ul class="product-shipping-delivers d-flex">
          <li class="product-shipping">
            <div class="content-info">
              <div class="content">
                <i class="fa-light fa-box"></i>
                <p>Free worldwide shipping on all orders over $100</p>
              </div>
            </div>
          </li>
          <li class="product-delivers">
            <div class="content-info">
              <div class="content">
                <i class="fa-light fa-clock-three"></i>
                <p>
                  Delivers in: 3-7 Working Days
                  <a href="/refund-policy">Shipping &amp; Return </a>
                </p>
              </div>
            </div>
          </li>
        </ul>

        <div class="safe-checkout">
          <div class="title-safe-checkout">Guaranteed Checkout</div>
          <div class="img-safe-checkout">
            <img
              src="https://wpbingosite.com/wordpress/oriobook/wp-content/themes/oriobook/images/payment-product.png"
              alt="Image Checkout"
            />
          </div>
        </div>
      </div>
    </div>
    <tabProduct :product="product" />
    <div class="row mt-5 gx-2 justify-content-center">
      <div class="col-12 title">Related Products</div>

      <div class="js-related-product row">
        <div
          class="col-4 mt-3 m-20"
          v-for="relatedProduct in relatedProducts"
          :key="relatedProduct._id"
        >
          <HomeProductCard :product="relatedProduct" />
        </div>
      </div>
      <Pagination :totalPages="totalPages" :curPage="curPage" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "../config/axios";

import HomeProductCard from "@/components/product/HomeProductCard.vue";
import tabProduct from "@/components/tabProduct.vue";
import { useRoute } from "vue-router";
import { displayLoading, removeLoading } from "@/helpers/loadingScreen";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "ProductDetails",
  components: {
    HomeProductCard,
    tabProduct,
    Pagination,
  },
  setup() {
    const route = useRoute();
    const id = ref(route.params.id);
    const product = ref({});
    const relatedProducts = ref({});
    const nameAuthor = ref("");
    const productRating = ref(0);

    const totalPages = ref(0);
    let page = 1;
    const curPage = ref(page);
    const perPage = 5;

    const paginationControl = () => {
      $(".js-number-link").click(async function (e) {
        e.preventDefault();
        page = parseInt($(this).text());
        requestPage();
      });

      $(".js-prev-link").click(async function (e) {
        e.preventDefault();
        page = page > 1 ? page - 1 : page;
        requestPage();
      });

      $(".js-next-link").click(async function (e) {
        e.preventDefault();
        page = page < totalPages.value ? page + 1 : page;
        requestPage();
      });
    };

    const requestPage = async () => {
      try {
        displayLoading(".js-related-product", -50, 0);
        const response = await axios.get(
          `https://localhost:3000/product/detail/${id.value}?page=${page}&perPage=${perPage}`
        );
        product.value = response.data.product;
        productRating.value = response.data.productRating;
        product.value.category_name = product.value.id_category.name;
        relatedProducts.value = response.data.relatedProducts;
        nameAuthor.value = product.value.id_author.name;
        curPage.value = page;
        totalPages.value = response.data.totalPages;
        removeLoading();
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(async () => {
      try {
        await requestPage();
        paginationControl();
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    });

    return {
      product,
      nameAuthor,
      relatedProducts,
      productRating,
      curPage,
      totalPages,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/product/product_details.scss";
</style>
