<template>
  <div class="left-col">
    <div class="left-col-content">
      <div class="content-heading">
        <h1>The New Collection Of Books</h1>
      </div>

      <div class="list-product">
        <div class="content-product-list" v-for="item in number" :key="item">
          <HomeProductDeal />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import HomeProductDeal from "../product/HomeProductDeal.vue";

export default {
  name: "DealsOfTheWeek",

  components: {
    HomeProductDeal,
  },

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
