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
        >
          {{ selectedSorting.label }}
        </span>
        <ul
          class="pwb-dropdown-menu dropdown-menu"
          :class="[{ show: toggleMenu }]"
          x-placement="bottom-start"
        >
          <li
            v-for="option in sortingOptions"
            :key="option.value"
            :data-value="option.value"
            :class="{ active: selectedSorting.value === option.value }"
          >
            <a role="button" @click="selectSorting(option)">
              {{ option.label }}
            </a>
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
      <ul class="pagination justify-content-end me-3">
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
import { useRoute } from "vue-router";
import axios from "axios";
import HomeProductCard from "./HomeProductCard.vue";
import { displayLoading, removeLoading } from "@/helpers/loadingScreen";
import { scrollToTop } from "@/helpers/helperFunctions";

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
    const perPage = 8;
    const toggleMenu = ref(false);
    const author_page = ref(props.author_page);

    const selectedSorting = ref({
      value: "menu_order",
      label: "Default sorting",
    });
    const route = useRoute();
    const searchQuery = route.query.search;
    const sortingOptions = [
      { value: "menu_order", label: "Default sorting" },
      { value: "popularity", label: "Sort by popularity" },
      { value: "rating", label: "Sort by average rating" },
      { value: "date", label: "Sort by latest" },
      { value: "price", label: "Sort by price: low to high" },
      { value: "price-desc", label: "Sort by price: high to low" },
    ];

    const selectSorting = async (option) => {
      try {
        selectedSorting.value = option;
        toggleMenu.value = false;
        console.log("Selected Sorting:", selectedSorting.value);
        // Do something with the selected sorting value
        const response = await axios.get(
          `http://localhost:3000/product/sort?page=${page}&perPage=${perPage}&sort=${selectedSorting.value.value}&search=${searchQuery}`
        );
        curPage.value = page;
        products.value = response.data.products;
        totalPages.value = response.data.totalPages;
      } catch (error) {
        console.error(error);
      }
    };

    const clickDropdown = () => {
      toggleMenu.value = !toggleMenu.value;
    };

    const requestPage = async () => {
      try {
        scrollToTop(656);
        displayLoading(".js-product-wrapper", -32);
        if (searchQuery == "" || !searchQuery) {
          const response = await axios.get(
            `http://localhost:3000/product/shop?page=${page}&perPage=${perPage}`
          );
          curPage.value = page;
          products.value = response.data.products;
          totalPages.value = response.data.totalPages;
        } else {
          const response = await axios.get(
            `http://localhost:3000/product/search?page=${page}&perPage=${perPage}&search=${searchQuery}`
          );
          curPage.value = page;
          products.value = response.data.products;
          totalPages.value = response.data.totalPages;
        }
        removeLoading();
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
      selectedSorting,
      sortingOptions,
      clickDropdown,
      selectSorting,
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
