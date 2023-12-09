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
            type="submit"
            class="btn text-uppercase ms-auto js-save-btn"
            href="#"
            @click="addOrUpdateProduct"
            >Save</a
          >
        </div>
        <form class="edit-product-forms row gx-0" id="edit-form">
          <ul class="edit-product-form col-7">
            <li class="edit-product-form-item mb-3">
              <label for="product-name">Name</label>
              <input
                id="product-name"
                type="text"
                :value="product.name"
                name="name"
              />
            </li>
            <li class="edit-product-form-item mb-3">
              <label for="product-description">Description</label>
              <textarea
                name="description"
                id="product-description"
                cols="30"
                rows="20"
                >{{ product.description }}</textarea
              >
            </li>
            <li class="edit-product-form-item mb-3 row">
              <div class="col">
                <label for="product-price">Price ($)</label>
                <input
                  id="product-price"
                  type="number"
                  :value="product.price"
                  name="price"
                />
              </div>
              <div class="col">
                <label for="product-stock">Stock (items)</label>
                <input
                  id="product-stock"
                  type="number"
                  :value="product.stock"
                  name="stock"
                />
              </div>
            </li>
          </ul>
          <div class="edit-product-form col">
            <div class="d-flex align-items-center">
              <div class="product-category me-4">
                <label class="product-category-label">Category</label>
                <select class="edit-product-select" name="category">
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
                <select class="edit-product-select" name="author_name">
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
            </div>
            <div class="mb-2">
              <input
                type="file"
                name="image"
                class="form-control"
                id="formFile"
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
    const product = ref({
      _id: "",
      name: "",
      price: "",
      description: "",
      stock: "",
      category: "",
    });
    const categories = [
      "Romance",
      "Fiction",
      "Family",
      "Comedy",
      "History",
      "Other",
    ];
    const authors = [
      "Liz Cheney",
      "Jeff Kinney",
      "Keigo Higashino",
      "Arthur Conan Doyle",
      "Julia Quinn",
      "Daniel Gerhard Brown ",
      "Other",
    ];
    const authorName = ref("");
    const isSelected = (option, productOption) => {
      return option == productOption;
    };
    const addOrUpdateProduct = async () => {
      const formData = new FormData(document.getElementById("edit-form"));
      const values = {};
      formData.forEach((value, key) => {
        values[key] = value;
      });
      try {
        const idProduct = product.value._id ? product.value._id : "";
        const response = await axios.post(
          `/product/edit/save/${idProduct}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
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
    if (route.name == "EditForUpdate") {
      onMounted(async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/product/edit/${id.value}`
          );
          if (response.status == 200) {
            product.value = response.data;
            authorName.value = product.value.id_author.name;
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
        } catch (error) {
          // Chuyển trang lỗi
        }
      });
    }

    return {
      product,
      categories,
      isSelected,
      authors,
      authorName,
      addOrUpdateProduct,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/admin/edit.scss";
</style>
