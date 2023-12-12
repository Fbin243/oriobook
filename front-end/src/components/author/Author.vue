<template>
  <div class="author-details-section container">
    <div class="row">
      <div class="col-12 bwp-author-heading">
        <div class="author-image">
          <div class="images">
            <img
            :src="author.image" :alt="author.name" style="height: auto;"
/>

          </div>
        </div>
    
        <div class="author-content">
          <div class="author-title">
            <h2><span>{{ author.name }}</span></h2>
          </div>
          <div class="author-description">
            <div class="term-description">
              <p>
               {{author.description}}
              </p>
            </div>
          </div>
          <div class="author-infomation">
            <ul class="author-info">
              <li><label>Style:</label>   {{author.style}}</li>
              <li>
                <label>Address:</label>  {{author.address}}
              </li>
              <li><label>Year of Birth:</label>   {{ convertDateFormat(author.date_of_birth) }}</li>
              <li><label>Gender:</label>  {{author.gender}}</li>
              <li><label>Published Book:</label>  {{author.published_book}}</li>
            </ul>
          </div>
          <ul class="social-link">
            <li>
              <a href="#" class="facebook"
                ><i class="fa fa-facebook"></i>Facebook</a
              >
            </li>
            <li>
              <a href="#" class="twitter"><i class="fa fa-twitter"></i>Twitter</a>
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
      
      <ShopProduct/>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ShopProduct from "../product/ShopProduct.vue";
import { convertDateFormat } from "@/helpers/helperFunctions";


export default {
  name: "Author",
  components: {
    ShopProduct,
  },
  props: ["author"],
  setup() {
    return {
      convertDateFormat: convertDateFormat,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/author/authors_detail.scss";
</style>
