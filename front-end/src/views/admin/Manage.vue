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
          <ul class="manage-product-titles row gx-0">
            <input
              class="manage-product-checkbox col-1"
              type="checkbox"
              value=""
            />
            <p class="manage-product-title text-center mb-0 col-1">Image</p>
            <p class="manage-product-title text-center mb-0 col">Name</p>
            <p class="manage-product-title text-center mb-0 col-2">Category</p>
            <p class="manage-product-title text-center mb-0 col-2">Stock</p>
            <p class="manage-product-title text-center mb-0 col-2">Price</p>
          </ul>
          <ul class="manage-product-list">
            <template v-for="product in products">
              <article class="manage-product-item row gx-0">
                <input
                  class="manage-product-checkbox col-1"
                  type="checkbox"
                  :value="product._id"
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
        <div class="d-flex justify-content-between">
          <a class="btn text-uppercase js-delete-btn" href="#" role="button"
            >Delete</a
          >
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a
                  class="page-link js-prev-link"
                  href="#"
                  aria-label="Previous"
                >
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
      </section>
    </section>
  </div>
</template>

<script>
import Sidebar from "@/components/account/SideBar";
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "Manage",
  components: {
    Sidebar,
  },
  setup() {
    const router = useRouter();
    const products = ref([]);
    const totalPages = ref([]);
    let page = 1;
    const curPage = ref(page);
    const perPage = 4;

    const displayLoading = () => {
      $(".manage-product-list").html(`
        <div class="w-100 text-center mt-5">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      `);
    };

    const requestPage = async () => {
      const response = await axios.get(
        `http://localhost:3000/product/manage?page=${page}&perPage=${perPage}`
      );
      curPage.value = page;
      products.value = response.data.products;
      totalPages.value = response.data.totalPages;
    };

    const init = function () {
      $(() => {
        const deleteBtn = document.querySelector(
          ".manage-product .js-delete-btn"
        );

        if (totalPages === 0) {
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

          deleteBtn.addEventListener("click", (e) => {
            e.preventDefault();
            // Remove item khỏi giao diện
            checkboxes.forEach(async (checkbox) => {
              if (checkbox.checked) {
                const id_product = $(checkbox).val();
                displayLoading();
                const response = await axios.delete(
                  `http://localhost:3000/product/delete/${id_product}`
                );
                checkbox.parentElement.remove();
                // console.log(window.location);
                window.location.reload();
                // router.(window.location.pathname + "?page=2");
              }
              mainCheckbox.checked = false;
            });
          });

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
        }
      });
    };
    onMounted(async () => {
      const response = await axios.get("http://localhost:3000/product/manage");
      products.value = response.data.products;
      totalPages.value = response.data.totalPages;
      init();
    });
    return {
      products,
      totalPages,
      curPage,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/admin/manage.scss";
</style>
