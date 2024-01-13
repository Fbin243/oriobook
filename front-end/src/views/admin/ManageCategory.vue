<template>
  <div class="container">
    <section class="row">
      <Sidebar></Sidebar>
      <section class="manage-product col-9">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <!-- <p class="manage-product-breadcrumb">Categories</p> -->
          <div class="manage-product-search-bar">
            <label for="search-input-id" class="search-label">
              <i class="fa-solid fa-magnifying-glass search-icon"></i>
            </label>
            <input
              type="email"
              class="search-input"
              id="search-input-id"
              placeholder="Search for product"
              :value="searchQuery"
            />
          </div>
          <a
            class="btn text-uppercase"
            href="/admin/edit-category"
            role="button"
            >Add main category</a
          >
        </div>
        <section class="manage-product-content">
          <ul class="manage-product-titles row gx-0">
            <input
              class="manage-product-checkbox col-1"
              type="checkbox"
              value=""
            />

            <p class="manage-product-title text-center mb-0 col">Name</p>
            <p class="manage-product-title text-center mb-0 col-2">
              Sub-categories
            </p>
          </ul>
          <ul class="manage-product-list">
            <template v-for="category in categories">
              <article
                class="manage-product-item row gx-0"
                style="height: fit-content"
              >
                <input
                  class="manage-product-checkbox col-1"
                  type="checkbox"
                  :value="category._id"
                />
                <a
                  :href="'/admin/edit-category/' + category._id"
                  class="manage-product-item-link col"
                >
                  <ul
                    class="manage-product-item-infos row gx-0 align-items-center"
                  >
                    <li class="manage-product-info text-center col">
                      {{ category.name }}
                    </li>
                    <li class="manage-product-info text-center col-2 me-2">
                      {{ category.num_sub }}
                    </li>
                  </ul>
                </a>
              </article>
            </template>
          </ul>
        </section>
        <div class="d-flex justify-content-between mt-2">
          <a class="btn text-uppercase js-delete-btn" href="#" role="button"
            >Delete</a
          >
          <Pagination :totalPages="totalPages" :curPage="curPage" />
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import Sidebar from "@/components/account/SideBar";
import { onMounted, ref } from "vue";
import axios from "../../config/axios";
import { displayLoading, removeLoading } from "@/helpers/loadingScreen";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "Manage",
  components: {
    Sidebar,
    Pagination,
  },
  setup() {
    const categories = ref([]);
    const totalPages = ref(0);
    let page = 1;
    const curPage = ref(page);
    const perPage = 4;
    const searchQuery = ref("");

    const handleSearchQuery = () => {
      $(`#search-input-id`).keypress(async function (event) {
        var keycode = event.keyCode ? event.keyCode : event.which;
        if (keycode == "13") {
          searchQuery.value = $("#search-input-id").val();
          await requestPage();
        }
      });
    };

    const requestPage = async () => {
      try {
        displayLoading(".manage-product-list", -32, -32);
        let url = `https://localhost:3000/category/manage?page=${page}&perPage=${perPage}`;
        if (searchQuery) url += `&search=${searchQuery.value}`;
        const response = await axios.get(url);
        console.log(response.data);
        curPage.value = page;
        categories.value = response.data.categories;
        totalPages.value = response.data.totalPages;
        categories.value = categories.value.map((cate) => {
          cate.num_sub = cate.sub_category.length;
          return cate;
        });
        removeLoading();
        $(() => {
          handleDelete();
        });
      } catch (error) {
        console.error(error);
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
        page = page > 1 ? page - 1 : page;
        requestPage();
      });

      $(".js-next-link").click(async function (e) {
        e.preventDefault();
        console.log(totalPages.value);
        page = page < totalPages.value ? page + 1 : page;
        requestPage();
      });
    };

    const handleDelete = () => {
      const deleteBtn = document.querySelector(
        ".manage-product .js-delete-btn"
      );

      if (totalPages === 0) {
        manageProductContent.classList.add("d-none");
        deleteBtn.classList.add("d-none");
        manageProductScreen.insertAdjacentHTML(
          "beforeend",
          `<p class="text-center" style="font-size: 2rem; margin-top: 2rem;">You haven't add any items! </p>`
        );
      } else {
        const mainCheckbox = document.querySelector(
          ".manage-product-titles .manage-product-checkbox"
        );
        const checkboxes = document.querySelectorAll(
          ".manage-product-item .manage-product-checkbox"
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

        deleteBtn.addEventListener("click", (e) => {
          e.preventDefault();
          // Remove item khỏi giao diện
          checkboxes.forEach(async (checkbox) => {
            if (checkbox.checked) {
              const id_product = $(checkbox).val();
              displayLoading(".manage-product-list", -32, -32);
              const response = await axios.delete(
                `https://localhost:3000/category/delete/${id_product}`
              );
              checkbox.parentElement.remove();
              removeLoading();
              window.location.reload();
            }
            mainCheckbox.checked = false;
          });
        });
      }
    };

    const init = function () {
      $(() => {
        handleDelete();
        paginationControl();
      });
    };
    onMounted(async () => {
      try {
        await requestPage();
        handleSearchQuery();
        init();
      } catch (error) {
        console.error(error);
      }
    });
    return {
      categories,
      totalPages,
      curPage,
      searchQuery,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/admin/manage.scss";
</style>
