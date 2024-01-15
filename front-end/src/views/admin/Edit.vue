<template>
  <section class="container">
    <section class="row">
      <Sidebar></Sidebar>
      <section class="edit-product col-9">
        <div class="d-flex align-items-center">
          <router-link class="edit-product-breadcrumb" to="/admin/manage">
            <div class="d-flex align-items-center">
              <i class="fa-regular fa-caret-left me-2"></i>
              <span>Products</span>
            </div>
          </router-link>
          <a
            class="btn text-uppercase ms-auto js-save-btn"
            href="#"
            @click.prevent="addOrUpdateProduct"
            >Save</a
          >
        </div>
        <form class="edit-product-forms row gx-0" id="edit-form">
          <ul class="edit-product-form col-7">
            <li class="edit-product-form-item mb-3">
              <label for="product-name"
                >Name <span class="text-danger">{{ nameError }}</span>
              </label>
              <input
                id="product-name"
                type="text"
                :value="product.name"
                name="name"
              />
            </li>
            <li class="edit-product-form-item mb-3 row">
              <div class="col">
                <label for="product-price"
                  >Price ($)
                  <span class="text-danger">{{ priceError }}</span></label
                >
                <input
                  id="product-price"
                  type="number"
                  :value="product.price"
                  name="price"
                />
              </div>
              <div class="col">
                <label for="product-stock"
                  >Stock
                  <span class="text-danger">{{ stockError }}</span></label
                >
                <input
                  id="product-stock"
                  type="number"
                  :value="product.stock"
                  name="stock"
                />
              </div>
            </li>
            <li class="edit-product-form-item mb-3">
              <label for="product-description"
                >Description
                <span class="text-danger">{{ descriptionError }}</span></label
              >
              <textarea
                name="description"
                id="product-description"
                cols="30"
                rows="20"
                >{{ product.description }}</textarea
              >
            </li>
          </ul>
          <div class="edit-product-form col">
            <div class="product-category mb-3">
              <label class="product-category-label"> Category </label>
              <select class="edit-product-select" name="id_category">
                <option
                  v-for="category in categories"
                  :key="category"
                  :value="category._id"
                  :selected="isSelected(category._id, product.id_category)"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="product-category">
              <label class="product-category-label"> Author </label>
              <select class="edit-product-select" name="id_author">
                <option
                  v-for="author in authors"
                  :key="author"
                  :value="author._id"
                  :selected="isSelected(author._id, authorName)"
                >
                  {{ author.name }}
                </option>
              </select>
            </div>

            <div class="mb-2">
              <input
                type="file"
                name="image"
                class="form-control"
                id="formFile"
                accept="image/*"
              />
            </div>
          </div>
        </form>
      </section>
    </section>
  </section>
</template>

<script>
import Sidebar from "@/components/account/SideBar";
import { onMounted, ref } from "vue";
import axios from "@/config/axios";

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
    const product = ref({
      _id: "",
      name: "",
      price: "",
      description: "",
      stock: "",
      id_category: "",
    });
    const categories = ref([]);
    const categoryList = ref([]);
    const authors = ref({});
    const authorName = ref("");
    const isSelected = (option, productOption) => {
      return option == productOption;
    };

    // Refs for validation error messages
    const nameError = ref("");
    const priceError = ref("");
    const stockError = ref("");
    const descriptionError = ref("");

    const validateForm = (values) => {
      let isValid = true;

      // Validation for name
      values.name = values.name.trim();
      product.value.name = values.name;
      if (values.name === "") {
        nameError.value = "cannot be empty.";
        isValid = false;
      } else if (values.name.length > 150) {
        nameError.value = "cannot exceed 150 characters.";
        isValid = false;
      } else {
        nameError.value = "";
      }

      // Validation for price
      values.price = parseFloat(values.price);
      product.value.price = values.price;
      if (isNaN(values.price)) {
        priceError.value = "cannot be empty.";
        isValid = false;
      } else if (values.price < 0) {
        priceError.value = "cannot be negative.";
        isValid = false;
      } else if (values.price > 1000) {
        priceError.value = "cannot exceed 1000$.";
        isValid = false;
      } else {
        priceError.value = "";
      }

      // Validation for stock
      values.stock = parseFloat(values.stock);
      product.value.stock = values.stock;
      if (isNaN(values.stock)) {
        stockError.value = "cannot be empty.";
        isValid = false;
      } else if (values.stock % 1 != 0) {
        stockError.value = "cannot be float.";
        isValid = false;
      } else if (values.stock < 0) {
        stockError.value = "cannot be negative.";
        isValid = false;
      } else if (values.stock > 1000) {
        stockError.value = "cannot exceed 1000 items.";
        isValid = false;
      } else {
        stockError.value = "";
      }

      // Validation for description
      values.description = values.description.trim();
      product.value.description = values.description;
      if (values.description === "") {
        descriptionError.value = "cannot be empty.";
        isValid = false;
      } else if (values.description.length > 2000) {
        descriptionError.value = "cannot exceed 2000 characters.";
        isValid = false;
      } else {
        descriptionError.value = "";
      }

      console.log("Values: ", values);

      return isValid;
    };

    const addOrUpdateProduct = async () => {
      const formData = new FormData(document.getElementById("edit-form"));
      const values = {};
      formData.forEach((value, key) => {
        values[key] = value;
      });

      // Validate before submitting
      if (!validateForm(values)) {
        return;
      }

      try {
        const idProduct = product.value._id ? product.value._id : "";
        // Hiển thị hiệu ứng loading
        $(".edit-product-forms").html(`
          <div class="w-100 text-center mt-5">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        `);
        const response = await axios.post(
          `https://localhost:3000/product/edit/save/${idProduct}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        router.push("/admin/manage");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };

    $(() => {
      $("#formFile").fileinput({
        theme: "fa6 ",
        showUpload: false,
        previewFileType: "any",
      });
    });

    onMounted(async () => {
      try {
        // Lấy tất cả category
        let response = await axios.get(`https://localhost:3000/category/all`);
        categoryList.value = response.data;
        for (let cate of categoryList.value) {
          console.log(cate);
          categories.value.push({
            _id: cate._id,
            name: cate.name,
          });
          for (let subCate of cate.sub_category) {
            // console.log(subCate);
            categories.value.push({
              _id: subCate._id._id,
              name: cate.name + " / " + subCate._id.name,
            });
          }
        }
        // Lấy tất cả author
        response = await axios.get(`https://localhost:3000/author/all`);
        authors.value = response.data;

        if (route.name == "EditForUpdate") {
          response = await axios.get(
            `https://localhost:3000/product/edit/${id.value}`
          );
          if (response.status == 200) {
            product.value = response.data;
            authorName.value = product.value.id_author._id;
            // Hiển thị hình ảnh preview
            $(() => {
              $(".file-drop-zone-title").css({
                padding: "0px",
              });
              $(".file-drop-zone-title").html(`
            <img src="${product.value.image}"/>
          `);
            });
          } else
            throw {
              code: 400,
              errMsg: "Bad request",
            };
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });

    return {
      product,
      categories,
      isSelected,
      authors,
      authorName,
      addOrUpdateProduct,
      // Expose error messages
      nameError,
      priceError,
      stockError,
      descriptionError,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/admin/edit.scss";
</style>
