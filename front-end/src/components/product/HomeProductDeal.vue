<template>
  <div class="item-product">
    <div class="items" v-for="item in number" :key="item">
      <div class="product-button">
        <div class="products-thumb">
          <div class="product-lable">
            <div class="hot">Hot</div>
          </div>
          <div class="product-thumb-hover">
            <a
              href="https://wpbingosite.com/wordpress/oriobook/shop/emotionally-intelligent/"
              class="woocommerce-LoopProduct-link"
            >
              <img
                loading="lazy"
                src="https://wpbingosite.com/wordpress/oriobook/wp-content/uploads/2019/04/product-1.jpg"
                class="fade-in lazyload wp-post-image"
                alt=""
                decoding="async"
              />
            </a>
          </div>
          <div class="add-to-cart">
            <i class="fa-solid fa-cart-plus"></i>
          </div>
        </div>
      </div>

      <div class="products-content">
        <div class="contents">
          <div class="list-author">
            <span>
              <a
                href="https://wpbingosite.com/wordpress/oriobook/product_author/dan-gordon/"
                class="item-author"
                >Dan Gordon</a
              >
            </span>
          </div>
          <h3>
            <a
              href="https://wpbingosite.com/wordpress/oriobook/shop/emotionally-intelligent/"
              class="product-title"
              >Emotionally Intelligent</a
            >
          </h3>
          <span class="price">
            <span class="woocommerce-Price-amount amount">
              <bdi>
                65.00<span class="woocommerce-Price-currencySymbol">&#36;</span>
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

export default {
  name: "HomeProductDeal",
  setup() {
    const number = ref(2);

    return {
      number,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/home/home_deal.scss";
</style>
