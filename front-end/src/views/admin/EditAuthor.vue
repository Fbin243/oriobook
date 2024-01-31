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
            @click.prevent="addOrUpdateAuthor"
            >Save</a
          >
        </div>
        <form class="edit-product-forms row gx-0" id="edit-form">
          <ul class="edit-product-form col-7">
            <li class="edit-product-form-item mb-3">
              <label for="product-name"
                >Name <span class="text-danger">{{ nameError }}</span></label
              >
              <input
                id="product-name"
                type="text"
                :value="author.name"
                name="name"
              />
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
                rows="5"
                >{{ author.description }}</textarea
              >
            </li>
            <li class="edit-product-form-item mb-3 row">
              <div class="col">
                <label for="datepicker"
                  >Date of birth
                  <span class="text-danger">{{ dobError }}</span></label
                >
                <input
                  type="date"
                  :value="author.date_of_birth"
                  name="date_of_birth"
                  class="pe-2"
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
              <label for="product-style"
                >Style <span class="text-danger">{{ styleError }}</span></label
              >
              <input
                id="product-style"
                type="text"
                :value="author.style"
                name="style"
              />
            </li>
            <li class="edit-product-form-item mb-3">
              <label for="product-address"
                >Address
                <span class="text-danger">{{ addressError }}</span></label
              >
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

    // Refs for validation error messages
    const nameError = ref("");
    const dobError = ref("");
    const styleError = ref("");
    const addressError = ref("");
    const descriptionError = ref("");

    const validateForm = (values) => {
      let isValid = true;

      // Validation for name
      values.name = values.name.trim();
      author.value.name = values.name;
      if (values.name === "") {
        nameError.value = "cannot be empty.";
        isValid = false;
      } else if (values.name.length > 150) {
        nameError.value = "cannot exceed 150 characters.";
        isValid = false;
      } else {
        nameError.value = "";
      }

      // Validation for style
      values.style = values.style.trim();
      author.value.style = values.style;
      if (values.style === "") {
        styleError.value = "cannot be empty.";
        isValid = false;
      } else if (values.style.length > 300) {
        styleError.value = "cannot exceed 300 characters.";
        isValid = false;
      } else {
        styleError.value = "";
      }

      // Validation for address
      values.address = values.address.trim();
      author.value.address = values.address;
      if (values.address === "") {
        addressError.value = "cannot be empty.";
        isValid = false;
      } else if (values.address.length > 300) {
        addressError.value = "cannot exceed 300 characters.";
        isValid = false;
      } else {
        addressError.value = "";
      }

      // Validation for date_of_birth
      author.value.date_of_birth = values.date_of_birth;
      if (values.date_of_birth === "") {
        dobError.value = "cannot be empty.";
        isValid = false;
      } else {
        dobError.value = "";
      }

      // Validation for description
      values.description = values.description.trim();
      author.value.description = values.description;
      if (values.description === "") {
        descriptionError.value = "cannot be empty.";
        isValid = false;
      } else if (values.description.length > 2000) {
        descriptionError.value = "cannot exceed 2000 characters.";
        isValid = false;
      } else {
        descriptionError.value = "";
      }

      return isValid;
    };

    const addOrUpdateAuthor = async () => {
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
          `${process.env.MAIN_URL}/author/edit/save/${idAuthor}`,
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
            `${process.env.MAIN_URL}/author/edit/${id.value}`
          );
          if (response.status == 200) {
            author.value = response.data;
            authorGender.value = author.value.gender;
            const date = new Date(author.value.date_of_birth);
            // Lấy các thành phần ngày tháng
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            author.value.date_of_birth = year + "-" + month + "-" + day;
            console.log("AuhtorDOB: ", author.value.date_of_birth);
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
      nameError,
      dobError,
      styleError,
      addressError,
      descriptionError,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/admin/edit.scss";
</style>
