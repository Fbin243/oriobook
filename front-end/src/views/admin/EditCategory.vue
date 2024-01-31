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
              <label for="product-name"
                >Name <span class="text-danger">{{ nameError }}</span></label
              >
              <input
                id="product-name"
                type="text"
                :value="category.name"
                name="name"
              />
              <input
                id="product-id"
                type="hidden"
                :value="category._id"
                name="id"
              />
            </li>
            <li class="edit-product-form-item mb-3">
              <label for="product-description d-flex"
                ><span>Sub Categories</span>
                <a
                  data-v-5a43e406=""
                  class="btn text-uppercase py-2 px-3 mx-2"
                  href="#"
                  role="button"
                  style="width: fit-content"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  @click="resetToEmpty"
                  ><i class="fa-solid fa-plus"></i></a
              ></label>
              <span class="text-danger">{{ nameSubError }}</span>
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
                  <input
                    id="product-sub-id"
                    type="hidden"
                    class="w-100 p-1"
                    value="new-cate"
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
import axios from "../../config/axios";

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
    const categories = ref([]);
    const category = ref({
      _id: "",
      name: "",
    });
    const isSelected = (option, productOption) => {
      return option == productOption;
    };

    // Refs for validation error messages
    const nameError = ref("");
    const nameSubError = ref("");

    const validateSubForm = (name) => {
      let isValid = true;

      name = name.trim();
      $("#product-sub").val(name);
      if (name === "") {
        nameSubError.value = "cannot be empty.";
        isValid = false;
      } else if (name.length > 30) {
        nameSubError.value = "cannot exceed 30 characters.";
        isValid = false;
      } else {
        nameSubError.value = "";
      }

      return isValid;
    };

    const validateMainForm = (values) => {
      let isValid = true;
      // Validation for main name
      values.name = values.name.trim();
      category.value.name = values.name;
      if (values.name === "") {
        nameError.value = "cannot be empty.";
        isValid = false;
      } else if (values.name.length > 30) {
        nameError.value = "cannot exceed 30 characters.";
        isValid = false;
      } else {
        nameError.value = "";
      }
      return isValid;
    };

    const resetToEmpty = () => {
      $("#product-sub").val("");
      $("#product-sub-id").val("new-cate");
      $(".js-sub-cate.active").removeClass("active");
    };

    const addSubCategory = () => {
      const name = $("#product-sub").val().trim();
      const _id = $("#product-sub-id").val();
      // Validate before submitting
      if (!validateSubForm(name)) {
        return;
      }
      $("#product-sub").val("");
      $("#product-sub-id").val("");
      if (_id != "new-cate") {
        // Sửa tên sub cate trên giao diện và trong list sub_cate
        $(".js-sub-cate.active").find(".sub-cate-title").text(name);
        sub_cate.forEach((cate) => {
          if (cate._id == _id) {
            cate.name = name;
          }
        });
        $(".js-sub-cate.active").removeClass("active");
      } else {
        sub_cate.push({
          _id: "",
          name: name,
        });
        var newElement = $(
          `<span style="border-radius: 4px" class="p-1 bg-primary me-1">
          <span class="js-sub-cate" data-bs-toggle="modal" 
           data-bs-target="#exampleModal" role="button">
            <span class="sub-cate-title">${name} </span>
            <span>(0)</span>
            <input type="hidden" value="">
          </span>
          <i class="fa-sharp fa-solid fa-circle-xmark ms-2 js-delete-cate" role="button"></i>
        </span>`
        );
        $("#product-description").append(newElement);
        $(".js-delete-cate").click(removeSubCategory);
        $(".js-sub-cate").click(updateSubCategory);
      }
    };

    const removeSubCategory = function (e) {
      e.stopPropagation();
      sub_cate = sub_cate.filter(
        (item) => item._id !== $(this).parent().find("input").val()
      );
      $(this).parent().remove();
    };

    const updateSubCategory = function () {
      $("#product-sub").val($(this).find(".sub-cate-title").text().trim());
      $("#product-sub-id").val($(this).find("input").val());
      $(".js-sub-cate").removeClass("active");
      $(this).addClass("active");
    };

    const addOrUpdateCategory = async () => {
      const formData = {
        id: $("#product-id").val(),
        name: $("#product-name").val(),
        sub_cate,
      };

      // Validate before submitting
      if (!validateMainForm(formData)) {
        return;
      }

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
          `${process.env.MAIN_URL}/category/edit/save/${idCategory}`,
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
            `${process.env.MAIN_URL}/category/edit/${id.value}`
          );
          if (response.status == 200) {
            console.log(response.data);
            category.value = response.data;
            category.value.sub_category.forEach((subCate) => {
              var newElement = $(
                `<span style="border-radius: 4px" class="p-1 bg-primary me-1">
                  <span class="js-sub-cate" data-bs-toggle="modal"
                  data-bs-target="#exampleModal" role="button">
                    <span class="sub-cate-title">${subCate._id.name}</span>
                    <span> (${subCate._id.num_product})</span>
                    <input type="hidden" value="${subCate._id._id}">
                  </span>
                  <i class="fa-sharp fa-solid fa-circle-xmark ms-2 js-delete-cate" role="button"></i>
                  </span>`
              );
              sub_cate.push({ _id: subCate._id._id, name: subCate._id.name });
              $("#product-description").append(newElement);
            });
            $(".js-delete-cate").click(removeSubCategory);
            $(".js-sub-cate").click(updateSubCategory);
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
      resetToEmpty,
      nameError,
      nameSubError,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/admin/edit.scss";
</style>
