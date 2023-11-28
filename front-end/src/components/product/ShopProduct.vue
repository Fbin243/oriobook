<template>
  <div class="col-9 row">
    <div class="col-12 woocommerce-ordering pwb-dropdown dropdown show">
      <span
        class="pwb-dropdown-toggle dropdown-toggle"
        data-toggle="dropdown"
        aria-expanded="true"
        @click="clickDropdown"
        >Default sorting</span
      >
      <ul
        class="pwb-dropdown-menu dropdown-menu"
        :class="[{ show: toggleMenu }]"
        x-placement="bottom-start"
      >
        <li data-value="menu_order" class="active">
          <a href="?show-subcategories=hide&amp;orderby=menu_order"
            >Default sorting</a
          >
        </li>
        <li data-value="popularity">
          <a href="?show-subcategories=hide&amp;orderby=popularity"
            >Sort by popularity</a
          >
        </li>
        <li data-value="rating">
          <a href="?show-subcategories=hide&amp;orderby=rating"
            >Sort by average rating</a
          >
        </li>
        <li data-value="date">
          <a href="?show-subcategories=hide&amp;orderby=date">Sort by latest</a>
        </li>
        <li data-value="price">
          <a href="?show-subcategories=hide&amp;orderby=price"
            >Sort by price: low to high</a
          >
        </li>
        <li data-value="price-desc">
          <a href="?show-subcategories=hide&amp;orderby=price-desc"
            >Sort by price: high to low</a
          >
        </li>
      </ul>
    </div>
    <div class="col-4 mt-3" v-for="index in 9" :key="index">
      <HomeProductCard />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import HomeProductCard from "./HomeProductCard.vue";

export default {
  name: "ShopProduct",
  components: {
    HomeProductCard,
  },
  setup() {
    const toggleMenu = ref(false);

    const clickDropdown = () => {
      console.log("click");
      toggleMenu.value = !toggleMenu.value;
    };

    return {
      clickDropdown,
      toggleMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/product/shop_product.scss";
</style>
