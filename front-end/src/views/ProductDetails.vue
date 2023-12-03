<template>
  <div class="product-details container">
    <div class="breadcrumb" itemprop="breadcrumb">
      <a href="/">Home</a>
      <span class="delimiter"></span>
      <a href="/shop">Shop</a>
      <span class="delimiter"></span>
      <a href="/shop">Romance</a>
      <span class="delimiter"></span>
      I Don’t Forget Anyone
    </div>

    <div class="product-content row">
      <div class="product-img col-6">
        <img src="@/assets/img/products/product-76.jpg" alt="" />
      </div>
      <div class="product-info col-6">
        <div class="product-title">I Don’t Forget Anyone</div>
        <div class="product-price">100.00$</div>
        <p class="product-desc">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </p>
        <div class="d-flex">
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
    <tabProduct />
    <div class="row mt-5 gx-2">
      <div class="col-12 title">Related Products</div>

      <div class="col-3 mt-3 m-20" v-for="index in 5" :key="index">
          <HomeProductCard />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import HomeProductCard from "@/components/product/HomeProductCard.vue";
import tabProduct from "@/components/tabProduct.vue";


export default {
  name: "ProductDetails",
  components: {
    HomeProductCard,
    tabProduct,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/product/product_details.scss";
</style>
