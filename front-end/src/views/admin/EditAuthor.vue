<template>
  <section class="container">
    <section class="row">
      <Sidebar></Sidebar>
      <section class="edit-product col-9">
        <div class="d-flex align-items-center">
          <router-link
            class="edit-product-breadcrumb"
            to="/admin/manage-author"
          >
            <div class="d-flex align-items-center">
              <i class="fa-regular fa-caret-left me-2"></i>
              <span>Authors</span>
            </div>
          </router-link>
          <a
            type="submit"
            class="btn text-uppercase ms-auto js-save-btn"
            href="#"
            @click="addOrUpdateAuthor"
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
                :value="author.name"
                name="name"
              />
            </li>
            <li class="edit-product-form-item mb-3">
              <label for="product-description">Description</label>
              <textarea
                name="description"
                id="product-description"
                cols="30"
                rows="5"
                >{{ author.description }}</textarea
              >
            </li>
            <li class="edit-product-form-item mb-3 row">
              <div class="col">
                <label for="product-dob">Date of birth</label>
                <input
                  id="product-dob"
                  type="text"
                  :value="authorDOB"
                  name="date_of_birth"
                />
              </div>
              <div class="col d-none">
                <label for="product-publish_book">Published Book</label>
                <input
                  id="product-publish_book"
                  type="number"
                  :value="author.published_book ? author.published_book : 0"
                  name="published_book"
                />
              </div>
            </li>
            <li class="edit-product-form-item mb-3">
              <label for="product-style">Style</label>
              <input
                id="product-style"
                type="text"
                :value="author.style"
                name="style"
              />
            </li>
            <li class="edit-product-form-item mb-3">
              <label for="product-address">Address</label>
              <input
                id="product-address"
                type="text"
                :value="author.address"
                name="address"
              />
            </li>
          </ul>
          <div class="edit-product-form col">
            <div class="product-category">
              <label class="product-category-label">Gender</label>
              <select class="edit-product-select" name="gender">
                <option
                  v-for="gender in genders"
                  :key="gender"
                  :value="gender"
                  :selected="isSelected(gender, authorGender)"
                >
                  {{ gender }}
                </option>
              </select>
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
    const author = ref({
      _id: "",
      name: "",
      description: "",
      style: "",
      address: "",
      date_of_birth: "",
      published_book: "",
    });
    const genders = ["Male", "Female"];
    const authorGender = ref("");
    const authorDOB = ref("");
    const isSelected = (option, productOption) => {
      return option == productOption;
    };
    const addOrUpdateAuthor = async () => {
      const formData = new FormData(document.getElementById("edit-form"));
      const values = {};
      formData.forEach((value, key) => {
        values[key] = value;
      });
      console.log(values);

      try {
        const idAuthor = author.value._id ? author.value._id : "";
        // Hiển thị hiệu ứng loading
        $(".edit-product-forms").html(`
          <div class="w-100 text-center mt-5">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        `);
        const response = await axios.post(
          `https://localhost:3000/author/edit/save/${idAuthor}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        router.push("/admin/manage-author");
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
    if (route.name == "EditAuthorForUpdate") {
      onMounted(async () => {
        try {
          const response = await axios.get(
            `https://localhost:3000/author/edit/${id.value}`
          );
          if (response.status == 200) {
            author.value = response.data;
            authorGender.value = author.value.gender;
            const inputDate = new Date(author.value.date_of_birth);
            authorDOB.value = `${inputDate.getDate()}/${
              inputDate.getMonth() + 1
            }/${inputDate.getFullYear()}`;
            console.log(authorDOB.value);
            console.log(authorGender.value);
            // Hiển thị hình ảnh preview
            $(() => {
              $(".file-drop-zone-title").css({
                padding: "0px",
              });
              $(".file-drop-zone-title").html(`
            <img src="${author.value.image}"/>
          `);
            });
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
      isSelected,
      author,
      authorGender,
      addOrUpdateAuthor,
      genders,
      authorDOB,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/admin/edit.scss";
</style>
