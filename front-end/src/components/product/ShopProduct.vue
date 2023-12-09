<template>
  <div class="shop-product" :class="author_page ? 'col-12' : 'col-9'">
    <div class="row gx-2">
      <div
        class="col-12 woocommerce-ordering pwb-dropdown dropdown show"
        :class="{ 'no-show': author_page }"
      >
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
      <div
        class="mt-3"
        :class="author_page ? 'm-20' : 'col-3'"
        v-for="index in 9"
        :key="index"
      >
        <HomeProductCard />
      </div>
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
  props: ["author_page"],
  setup(props) {
    const toggleMenu = ref(false);
    const author_page = ref(props.author_page);

    const clickDropdown = () => {
      console.log("click");
      toggleMenu.value = !toggleMenu.value;
    };

    console.log(author_page.value);

    return {
      clickDropdown,
      toggleMenu,
      author_page,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/product/shop_product.scss";
</style>
