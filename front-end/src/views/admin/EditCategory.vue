<template>
  <section class="container">
    <section class="row">
      <Sidebar></Sidebar>
      <section class="edit-product col-9">
        <div class="d-flex align-items-center">
          <router-link
            class="edit-product-breadcrumb"
            to="/admin/manage-category"
          >
            <div class="d-flex align-items-center">
              <i class="fa-regular fa-caret-left me-2"></i>
              <span>Categories</span>
            </div>
          </router-link>
          <a
            type="submit"
            class="btn text-uppercase ms-auto js-save-btn"
            href="#"
            @click="addOrUpdateCategory"
            >Save</a
          >
        </div>
        <form class="edit-product-forms row gx-0" id="edit-form">
          <ul class="edit-product-form">
            <li class="edit-product-form-item mb-3">
              <label for="product-name">Name</label>
              <input
                id="product-name"
                type="text"
                :value="category.name"
                name="name"
              />
            </li>
            <li class="edit-product-form-item mb-3">
              <label for="product-description d-flex"
                ><span>Sub Categories</span>
                <a
                  data-v-5a43e406=""
                  class="btn text-uppercase py-2 px-3 ms-2"
                  href="#"
                  role="button"
                  style="width: fit-content"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  ><i class="fa-solid fa-plus"></i></a
              ></label>
              <div
                name="description"
                id="product-description"
                style="min-height: 200px; border: 1px solid #bbb; color: #fff"
                readonly
                class="p-3"
              ></div>
            </li>
          </ul>
        </form>
        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Add new sub category
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form id="add-category">
                  <label for="product-sub">Name</label>
                  <input
                    id="product-sub"
                    type="text"
                    name="sub"
                    class="w-100 p-1"
                    required
                  />
                </form>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-primary"
                  @click="addSubCategory"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import Sidebar from "@/components/account/SideBar";
import { onMounted, ref } from "vue";
import axios from "axios";

import { useRoute, useRouter } from "vue-router";
export default {
  name: "Edit",
  components: {
    Sidebar,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id = ref(route.params.id);
    let sub_cate = [];
    const category = ref({
      _id: "",
      name: "",
    });
    const isSelected = (option, productOption) => {
      return option == productOption;
    };
    const addSubCategory = () => {
      const name = $("#product-sub").val().trim();
      sub_cate.push(name);
      $("#product-sub").val("");
      var newElement = $(
        `<span style="border-radius: 4px" class="p-1 bg-primary me-1">${name}<i class="fa-sharp fa-solid fa-circle-xmark ms-2 js-delete-cate" role="button"></i></span>`
      );
      $("#product-description").append(newElement);
      $(".js-delete-cate").click(removeSubCategory);
    };

    const removeSubCategory = function () {
      sub_cate = sub_cate.filter((item) => item !== $(this).parent().text());
      $(this).parent().remove();
    };

    const addOrUpdateCategory = async () => {
      const formData = {
        name: $("#product-name").val(),
        sub_cate,
      };
      try {
        const idCategory = category.value._id ? category.value._id : "";
        // Hiển thị hiệu ứng loading
        $(".edit-product-forms").html(`
          <div class="w-100 text-center mt-5">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        `);
        const response = await axios.post(
          `https://localhost:3000/category/edit/save/${idCategory}`,
          formData
        );
        router.push("/admin/manage-category");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };

    if (route.name == "EditCategoryForUpdate") {
      onMounted(async () => {
        try {
          const response = await axios.get(
            `https://localhost:3000/category/edit/${id.value}`
          );
          if (response.status == 200) {
            console.log(response.data);
            category.value = response.data;
            category.value.sub_category.forEach((subCate) => {
              var newElement = $(
                `<span style="border-radius: 4px" class="p-1 bg-primary me-1">${subCate._id.name}<i class="fa-sharp fa-solid fa-circle-xmark ms-2 js-delete-cate" role="button"></i
                ></span>`
              );
              sub_cate.push(subCate._id.name);
              $("#product-description").append(newElement);
            });
            category.value.sub_category_id = category.value.sub_category.map(
              (subCate) => {
                subCate = subCate._id._id;
                return subCate;
              }
            );
            $(".js-delete-cate").click(removeSubCategory);
          } else
            throw {
              code: 400,
              errMsg: "Bad request",
            };
        } catch (error) {
          console.error("Error:", error);
        }
      });
    }

    return {
      category,
      isSelected,
      addOrUpdateCategory,
      addSubCategory,
      removeSubCategory,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/admin/edit.scss";
</style>
