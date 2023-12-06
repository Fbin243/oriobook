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
          <a class="btn text-uppercase ms-auto" href="#" role="button">Save</a>
        </div>
        <section class="edit-product-forms row gx-0">
          <ul class="edit-product-form col-7">
            <li class="edit-product-form-item mb-3">
              <label for="product-name">Name</label>
              <input id="product-name" type="text" :value="product.name" />
            </li>
            <li class="edit-product-form-item mb-3">
              <label for="product-description">Description</label>
              <textarea name="" id="product-description" cols="30" rows="10">{{
                product.description
              }}</textarea>
            </li>
            <li class="edit-product-form-item mb-3 row">
              <div class="col">
                <label for="product-price">Price ($)</label>
                <input
                  id="product-price"
                  type="number"
                  :value="product.price"
                />
              </div>
              <div class="col">
                <label for="product-stock">Stock (items)</label>
                <input
                  id="product-stock"
                  type="number"
                  :value="product.stock"
                />
              </div>
            </li>
          </ul>
          <div class="edit-product-form col">
            <div class="product-category mb-3">
              <label class="product-category-label">Category</label>
              <select class="edit-product-select">
                <option
                  v-for="category in categories"
                  :key="category"
                  :value="category"
                  :selected="isSelected(category, product.category)"
                >
                  {{ category }}
                </option>
              </select>
            </div>
            <div class="product-category">
              <label class="product-category-label">Author</label>
              <select class="edit-product-select">
                <option
                  v-for="author in authors"
                  :key="author"
                  :value="author"
                  :selected="isSelected(author, authorName)"
                >
                  {{ author }}
                </option>
              </select>
            </div>
            <button class="product-image mt-4">Click to Add an Image</button>
          </div>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import Sidebar from "@/components/account/SideBar";
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
export default {
  name: "Edit",
  components: {
    Sidebar,
  },
  setup() {
    const route = useRoute();
    const id = ref(route.params.id);
    const product = ref({
      name: "",
      price: "",
      description: "",
      stock: "",
      category: "",
    });
    const categories = [
      "Romance",
      "Fiction",
      "Family Story",
      "Comedy",
      "History",
      "Other",
    ];
    const authors = [
      "Liz Cheney",
      "Jeff Kinney",
      "Author 3",
      "Arthur Conan Doyle",
      "Julia Quinn",
      "Author 6",
      "Other",
    ];
    const authorName = ref("");
    const isSelected = (option, productOption) => {
      return option == productOption;
    };
    if (route.name == "EditForUpdate") {
      console.log("OK");
      onMounted(async () => {
        const response = await axios.get(
          `http://localhost:3000/product/edit/${id.value}`
        );
        product.value = response.data;
        console.log(response.data);
        authorName.value = product.value.id_author.name;
      });
    }
    return {
      product,
      categories,
      isSelected,
      authors,
      authorName,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/admin/edit.scss";
</style>
