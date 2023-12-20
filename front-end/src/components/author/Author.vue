<template>
  <div class="author-details-section container">
    <div class="row">
      <div class="col-12 bwp-author-heading">
        <div class="author-image">
          <div class="images">
            <img :src="author.image" :alt="author.name" />
          </div>
        </div>

        <div class="author-content">
          <div class="author-title">
            <h2>
              <span>{{ author.name }}</span>
            </h2>
          </div>
          <div class="author-description">
            <div class="term-description">
              <p>
                {{ author.description }}
              </p>
            </div>
          </div>
          <div class="author-infomation">
            <ul class="author-info">
              <li><label>Style:</label> {{ author.style }}</li>
              <li><label>Address:</label> {{ author.address }}</li>
              <li>
                <label>Year of Birth:</label>
                {{ convertDateFormat(author.date_of_birth) }}
              </li>
              <li><label>Gender:</label> {{ author.gender }}</li>
              <li>
                <label>Published Book:</label> {{ author.published_book }}
              </li>
            </ul>
          </div>
          <ul class="social-link">
            <li>
              <a href="#" class="facebook"
                ><i class="fa fa-facebook"></i>Facebook</a
              >
            </li>
            <li>
              <a href="#" class="twitter"
                ><i class="fa fa-twitter"></i>Twitter</a
              >
            </li>
            <li>
              <a href="#" class="google"
                ><i class="fa fa-google-plus-g"></i>Google</a
              >
            </li>
            <li>
              <a href="#" class="instagram"
                ><i class="fa fa-instagram"></i>Instagram</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="row gx-2 gy-3 row-products">
        <div class="col m-20" v-for="product in products" :key="product">
          <HomeProductCard :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShopProduct from "../product/ShopProduct.vue";
import { convertDateFormat } from "@/helpers/helperFunctions";
import HomeProductCard from "../product/HomeProductCard.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  name: "Author",
  components: {
    ShopProduct,
    HomeProductCard,
  },
  props: ["author"],
  setup() {
    const route = useRoute();

    const products = ref([]);
    const id = ref(route.params.id);

    onMounted(async () => {
      try {
        console.log(id.value);
        const response = await axios.get(
          `http://localhost:3000/product/productAuthor/${id.value}`
        );
        products.value = response.data.products; // Access 'products' property
        console.log(products);
        // Ensure products is an array
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    });
    return {
      products,
      convertDateFormat: convertDateFormat,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/author/authors_detail.scss";
</style>
