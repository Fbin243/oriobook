<template>
  <div class="col-3">
    <form style="padding-left: 20px">
      <h6 style="margin-top: 56px">Categories:</h6>
      <div
        class="form-group form-check"
        v-for="category in categories"
        :key="category._id"
      >
        <input
          type="radio"
          class="form-check-input js-category-option"
          :id="category._id"
          @click="selectCategory(category.name, category._id)"
        />
        <div class="d-flex align-items-center justify-content-between">
          <label class="form-check-label" :for="category._id">{{
            category.name
          }}</label>
          <i
            class="fa-regular fa-chevron-down"
            :id="'sub-container-btn-' + category._id"
            data-v-9d9a21ac=""
            :class="category.sub_category.length > 0 ? '' : 'd-none'"
            role="button"
            @click="showSubCategory(category._id)"
          ></i>
        </div>
        <div :id="'sub-container-' + category._id" class="sub-container d-none">
          <div
            class="form-group form-check ml-4"
            v-for="subCate in category.sub_category"
            :key="subCate._id._id"
          >
            <input
              type="radio"
              class="form-check-input js-category-option"
              :id="subCate._id._id"
              @click="selectCategory(subCate._id.name, subCate._id._id)"
            />
            <label class="form-check-label" :for="subCate._id._id">
              {{ subCate._id.name }}
            </label>
          </div>
        </div>
      </div>

      <br />

      <h6>Author:</h6>
      <div
        class="form-group form-check"
        v-for="author in authors"
        :key="author._id"
      >
        <input
          type="radio"
          class="form-check-input js-author-option"
          :id="author._id"
          @click="selectAuthor(author.name, author._id)"
        />
        <label class="form-check-label" :for="author._id">{{
          author.name
        }}</label>
      </div>

      <br />
    </form>
    <br />
  </div>
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
          {{ sort.label }}
        </span>
        <ul
          class="pwb-dropdown-menu dropdown-menu p-0"
          :class="[{ show: toggleMenu }]"
          x-placement="bottom-start"
        >
          <li
            v-for="option in sortingOptions"
            :key="option.value"
            :data-value="option.value"
            :class="{ active: sort.value === option.value }"
            class="dropdown-menu-option"
          >
            <a role="button" @click="selectSorting(option)">
              {{ option.label }}
            </a>
          </li>
        </ul>
      </div>
      <div class="row gx-3 px-0 js-product-wrapper" style="min-height: 806px">
        <div
          class="mt-3"
          :class="author_page ? 'm-20' : 'col-3'"
          v-for="product in products"
          :key="product._id"
        >
          <HomeProductCard :product="product" @add-cart="addCart" />
        </div>
        <div
          class="d-flex mt-5 justify-content-center"
          :class="totalPages > 0 ? 'd-none' : ''"
        >
          <p class="woocommerce-info">
            No products were found matching your selection.
          </p>
        </div>
      </div>
    </div>
    <Pagination :totalPages="totalPages" :curPage="curPage" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import HomeProductCard from "./HomeProductCard.vue";
import { displayLoading, removeLoading } from "@/helpers/loadingScreen";
import { scrollToTop } from "@/helpers/helperFunctions";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "ShopProduct",
  components: {
    HomeProductCard,
    Pagination,
  },
  props: ["author_page"],
  setup(props, { emit }) {
    const products = ref([]);
    const totalPages = ref(0);
    const author_page = ref(props.author_page);
    const route = useRoute();
    const toggleMenu = ref(false);
    const sortingOptions = [
      { value: "default", label: "Default sorting" },
      { value: "rating", label: "Sort by average rating" },
      { value: "latest", label: "Sort by latest" },
      { value: "price", label: "Sort by price: low to high" },
      { value: "price-desc", label: "Sort by price: high to low" },
    ];
    // Sidebar shop
    const categories = ref([]);
    const authors = ref([]);
    const showSubCategory = function (idSubContainer) {
      $(`#sub-container-btn-${idSubContainer}`).toggleClass("active");
      $(`#sub-container-${idSubContainer}`).toggleClass("d-none");
    };
    let page = 1;
    const curPage = ref(page);
    const perPage = 8;
    const sort = ref({
      value: "default",
      label: "Default sorting",
    });
    const queryObject = {
      search: route.query.search ? route.query.search : "",
      category: "",
      author: "",
      sort: sort.value.value,
    };
    if (route.query.category || route.query.author) {
      queryObject.category = route.query.category
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
      queryObject.author = route.query.author
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }

    const clickDropdown = () => {
      toggleMenu.value = !toggleMenu.value;
    };

    const selectCategory = async (newCategory, newCategoryID) => {
      if (queryObject.category == newCategory) {
        $(`#${newCategoryID}`).prop("checked", false);
        queryObject.category = "";
      } else {
        queryObject.category = newCategory;
      }
      $(`.js-category-option:not(#${newCategoryID})`).prop("checked", false);
      page = 1;
      await requestPage();
      paginationControl();
    };

    const selectAuthor = async (newAuthor, newAuthorID) => {
      if (queryObject.author == newAuthor) {
        $(`#${newAuthorID}`).prop("checked", false);
        queryObject.author = "";
      } else {
        queryObject.author = newAuthor;
      }
      $(`.js-author-option:not(#${newAuthorID})`).prop("checked", false);
      page = 1;
      await requestPage();
      paginationControl();
    };

    const selectSorting = async (option) => {
      sort.value = option;
      toggleMenu.value = false;
      queryObject.sort = option.value;
      page = 1;
      await requestPage();
      paginationControl();
    };

    const requestPage = async () => {
      try {
        // scrollToTop(440);
        displayLoading(".js-product-wrapper", -32);
        const params = new URLSearchParams(queryObject).toString();
        const response = await axios.get(
          `https://localhost:3000/product/shop?page=${page}&perPage=${perPage}&${params}`
        );
        console.log(page);
        curPage.value = page;
        products.value = response.data.products;
        console.log(products.value);
        totalPages.value = response.data.totalPages;
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
    };

    $(() => {
      $(".js-prev-link").click(async function (e) {
        e.preventDefault();
        page = page > 1 ? page - 1 : page;
        requestPage();
      });

      $(".js-next-link").click(async function (e) {
        e.preventDefault();
        page = page < totalPages.value ? page + 1 : page;
        requestPage();
      });
    });

    onMounted(async () => {
      try {
        let response = await axios.get(`https://localhost:3000/category/all`);
        categories.value = response.data;

        // Lấy tất cả tác giả
        response = await axios.get(`https://localhost:3000/author/all`);
        authors.value = response.data;
        await requestPage();
        paginationControl();
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    });

    const addCart = () => {
      emit("add-cart");
    };

    return {
      toggleMenu,
      sort,
      sortingOptions,
      clickDropdown,
      selectSorting,
      author_page,
      products,
      totalPages,
      curPage,
      authors,
      categories,
      showSubCategory,
      selectCategory,
      selectAuthor,
      addCart,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/product/shop_product.scss";
@import "@/styles/SliderShop.scss";
</style>
