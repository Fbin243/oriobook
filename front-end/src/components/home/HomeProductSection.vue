<template>
  <div class="home-product-section container">
    <div class="type-filter">
      <h4 class="best-seller underline-animation active" @click="bestSellerClick">Best sellers</h4>
      <h4 class="feature-products underline-animation" @click="featureClick">Feature products</h4>
    </div>
    <div class="row gx-2 gy-3 row-products">
      <div class="col m-20" v-for="item in number" :key="item">
        <HomeProductCard/>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import HomeProductCard from '../product/HomeProductCard.vue';

export default {
  name: 'HomeProductSection',
  components: {
    HomeProductCard,
  },
  setup(){
    const number = ref(5)

    const bestSellerClick = () => {
      number.value = 5
    }

    const featureClick = () => {
      number.value = 9
    }

    return{
      number,
      bestSellerClick,
      featureClick,
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/home/home_product_section.scss";
</style>
