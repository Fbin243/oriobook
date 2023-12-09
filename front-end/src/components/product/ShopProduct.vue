<template>
  <div class="shop-product" :class="author_page ? 'col-12' : 'col-9'">
    <div class="row gx-0">
      <div
        class="col-12 woocommerce-ordering pwb-dropdown dropdown show px-3"
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
            <a href="?show-subcategories=hide&amp;orderby=date"
              >Sort by latest</a
            >
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
      <div class="row gx-3 px-0 js-product-wrapper">
        <div
          class="mt-3"
          :class="author_page ? 'm-20' : 'col-3'"
          v-for="product in products"
          :key="product._id"
        >
          <HomeProductCard :product="product" />
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation example" class="mt-3">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link js-prev-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li v-for="page in totalPages" class="page-item">
          <a
            class="page-link js-number-link"
            :class="{ active: page == curPage }"
            href="#"
            >{{ page }}</a
          >
        </li>
        <li class="page-item">
          <a class="page-link js-next-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import HomeProductCard from "./HomeProductCard.vue";
import { displayLoading, removeLoading } from "@/helpers/loadingScreen";

export default {
  name: "ShopProduct",
  components: {
    HomeProductCard,
  },
  props: ["author_page"],
  setup(props) {
    const products = ref([]);
    const totalPages = ref(0);
    let page = 1;
    const curPage = ref(page);
    const perPage = 12;
    const toggleMenu = ref(false);
    const author_page = ref(props.author_page);
    const clickDropdown = () => {
      toggleMenu.value = !toggleMenu.value;
    };

    const requestPage = async () => {
      try {
        // displayLoading(".manage-product-list", -32, -32);
        const response = await axios.get(
          `http://localhost:3000/product/shop?page=${page}&perPage=${perPage}`
        );
        curPage.value = page;
        products.value = response.data.products;
        totalPages.value = response.data.totalPages;
        // removeLoading();
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    const paginationControl = () => {
      $(".js-number-link").click(async function (e) {
        e.preventDefault();
        page = parseInt($(this).text());
        requestPage();
      });

      $(".js-prev-link").click(async function (e) {
        e.preventDefault();
        page = page > 0 ? page - 1 : page;
        requestPage();
      });

      $(".js-next-link").click(async function (e) {
        e.preventDefault();
        console.log(totalPages.value);
        page = page < totalPages.value ? page + 1 : page;
        requestPage();
      });
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
      clickDropdown,
      toggleMenu,
      author_page,
      products,
      totalPages,
      curPage,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/product/shop_product.scss";
</style>
