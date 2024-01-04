<template>
  <div class="left-col">
    <div class="left-col-content">
      <div class="content-heading">
        <h1>The New Collection Of Books</h1>
      </div>

      <div class="list-product">
        <div
          class="content-product-list"
          v-for="group in productGroups"
          :key="group"
        >
          <HomeProductDeal :group="group" />
          <!-- v-for="item in group" :key="item" :item="item" -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeProductDeal from "../product/HomeProductDeal.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  name: "DealsOfTheWeek",

  components: {
    HomeProductDeal,
  },

  setup() {
    const number = ref(2);
    const route = useRoute();
    const id = ref(route.params.id);
    const productGroups = ref([]);
    onMounted(async () => {
      try {
        const response = await axios.get(`https://localhost:3000/product/hot`);
        const products = response.data.products; // Access 'products' property

        // Ensure products is an array
        if (Array.isArray(products)) {
          // Split the products into two groups using array indexing
          const firstTwoProducts = products.slice(0, 2);
          const nextTwoProducts =
            products.length > 2 ? products.slice(2, 4) : [];

          // Assign the groups to productGroups
          productGroups.value = [firstTwoProducts, nextTwoProducts];
          console.log(productGroups);
        } else {
          console.error("API did not return an array of products.");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    });
    return {
      productGroups,
      number,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/home/home_deal.scss";
</style>
