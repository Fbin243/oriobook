<template>
  <div class="container">
    <section class="row">
      <Sidebar></Sidebar>
      <section class="manage-product col-9">
        <div class="d-flex align-items-center">
          <p class="manage-product-breadcrumb">Products</p>
          <a class="btn text-uppercase ms-auto" href="/admin/edit" role="button"
            >Add product</a
          >
        </div>
        <section class="manage-product-content">
          <div class="manage-product-controll row gx-0 mb-5">
            <div class="col-4 manage-product-search-bar">
              <label for="search-input-id" class="search-label">
                <i class="fa-solid fa-magnifying-glass search-icon"></i>
              </label>
              <input
                type="email"
                class="search-input"
                id="search-input-id"
                placeholder="Search for product"
              />
            </div>
            <div class="col-4 manage-product-select-container">
              <select class="manage-product-select">
                <option selected>All categories</option>
                <option value="Romance">Romance</option>
                <option value="Fiction">Fiction</option>
                <option value="Family-story">Family Story</option>
                <option value="Comedy">Comedy</option>
                <option value="History">History</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="col-4 manage-product-select-container">
              <select class="manage-product-select">
                <option selected>Sort by</option>
                <option value="Name">Name</option>
                <option value="Category">Category</option>
                <option value="Price">Price</option>
              </select>
            </div>
          </div>
          <ul class="manage-product-titles row gx-0">
            <input
              class="manage-product-checkbox col-1"
              type="checkbox"
              value=""
            />
            <p class="manage-product-title text-center col-1">Image</p>
            <p class="manage-product-title text-center col">Name</p>
            <p class="manage-product-title text-center col-2">Category</p>
            <p class="manage-product-title text-center col-2">Stock</p>
            <p class="manage-product-title text-center col-2">Price</p>
          </ul>
          <ul class="manage-product-list">
            <template v-for="product in products">
              <article class="manage-product-item row gx-0">
                <input
                  class="manage-product-checkbox col-1"
                  type="checkbox"
                  value=""
                />
                <a
                  :href="'/admin/edit/' + product._id"
                  class="manage-product-item-link col"
                >
                  <ul
                    class="manage-product-item-infos row gx-0 align-items-center"
                  >
                    <li class="manage-product-info text-center col-1">
                      <img
                        :src="product.image"
                        :alt="product.name"
                        class="manage-product-img"
                      />
                    </li>
                    <li class="manage-product-info text-center col">
                      {{ product.name }}
                    </li>
                    <li class="manage-product-info text-center col-2 me-2">
                      {{ product.category }}
                    </li>
                    <li class="manage-product-info text-center col-2 me-2">
                      {{ product.stock }}
                    </li>
                    <li class="manage-product-info text-center col-2">
                      ${{ product.price }}
                    </li>
                  </ul>
                </a>
              </article>
            </template>
          </ul>
        </section>
        <a class="btn text-uppercase js-delete-btn" href="#" role="button"
          >Delete</a
        >
      </section>
    </section>
  </div>
</template>

<script>
import Sidebar from "@/components/account/SideBar";
import { onMounted, ref } from "vue";
import axios from "axios";
export default {
  name: "Manage",
  components: {
    Sidebar,
  },
  setup() {
    const init = function () {
      const numberOfItems = 5;
      const manageProductScreen = document.querySelector(".manage-product");
      const manageProductContent = document.querySelector(
        ".manage-product-content"
      );
      const deleteBtn = document.querySelector(
        ".manage-product .js-delete-btn"
      );

      if (numberOfItems === 0) {
        manageProductContent.classList.add("d-none");
        deleteBtn.classList.add("d-none");
        manageProductScreen.insertAdjacentHTML(
          "beforeend",
          `<p class="text-center" style="font-size: 2rem; margin-top: 2rem;">You haven't add any products! </p>`
        );
      } else {
        const mainCheckbox = document.querySelector(
          ".manage-product-titles .manage-product-checkbox"
        );
        const checkboxes = document.querySelectorAll(
          ".manage-product-item .manage-product-checkbox"
        );
        const searchInputManageProduct = document.querySelector(
          ".manage-product .search-input"
        );

        mainCheckbox.addEventListener("click", () => {
          if (mainCheckbox.checked)
            checkboxes.forEach((checkbox) => {
              checkbox.checked = true;
            });
          else
            checkboxes.forEach((checkbox) => {
              checkbox.checked = false;
            });
        });

        deleteBtn.addEventListener("click", () => {
          checkboxes.forEach((checkbox) => {
            if (checkbox.checked) checkbox.parentElement.remove();
            mainCheckbox.checked = false;
          });
        });

        searchInputManageProduct.addEventListener("focus", function () {
          searchInputManageProduct.placeholder = "";
        });

        searchInputManageProduct.addEventListener("blur", function () {
          searchInputManageProduct.placeholder = "Search for product";
        });
      }
    };
    const products = ref([]);
    onMounted(async () => {
      const response = await axios.get("http://localhost:3000/product/manage");
      products.value = response.data;
      init();
    });
    return {
      products,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/admin/manage.scss";
</style>
