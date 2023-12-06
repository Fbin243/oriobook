<template>
  <div class="home-product-section container">
    <div class="type-filter">
      <h4
        class="best-seller underline-animation"
        :class="{ active: toggle }"
        @click="bestSellerClick"
      >
        Best sellers
      </h4>
      <h4
        class="feature-products underline-animation"
        :class="{ active: !toggle }"
        @click="featureClick"
      >
        Top Rating
      </h4>
    </div>
    <div class="row gx-2 gy-3 row-products">
      <div class="col m-20" v-for="product in products" :key="product._id">
        <HomeProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import HomeProductCard from "../product/HomeProductCard.vue";

export default {
  name: "HomeProductSection",
  props: ["topRatedProducts", "bestSeller"],
  components: {
    HomeProductCard,
  },
  setup(props) {
    console.log("Best seller", props.topRatedProducts);
    const number = ref(5);
    const products = ref(props.bestSeller);
    const toggle = ref(true);

    const bestSellerClick = () => {
      products.value = props.bestSeller;
      toggle.value = true;
    };

    const featureClick = () => {
      products.value = props.topRatedProducts;
      toggle.value = false;
    };

    watch(
      () => props.bestSeller,
      (newBestSeller, oldBestSeller) => {
        // Update products when bestSeller changes
        products.value = newBestSeller;
      }
    );

    return {
      number,
      bestSellerClick,
      featureClick,
      toggle,
      products,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/home/home_product_section.scss";
</style>
