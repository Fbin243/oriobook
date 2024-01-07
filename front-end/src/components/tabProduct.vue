<template>
  <div class="container mt-5">
    <ul class="nav nav-underline justify-content-center">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="tab1"
          data-bs-toggle="tab"
          href="#content1"
          style="
            font-family: Jost, sans-serif;
            font-size: 29px;
            font-weight: 100;
          "
          >Description</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="tab2"
          data-bs-toggle="tab"
          href="#content2"
          style="
            font-family: Jost, sans-serif;
            font-size: 29px;
            font-weight: 100;
          "
          >Review</a
        >
      </li>
    </ul>

    <div class="tab-content mt-2">
      <div id="content1" class="tab-pane fade show active">
        <!-- Your content for the 'Active' link goes here -->
        <br /><br />
        <p style="font-size: 18px; color: #242424cc">
          {{ product.description }}
        </p>
      </div>
      <div id="content2" class="tab-pane fade">
        <div class="testimonial-box-container">
          <template v-for="review in product.reviews">
            <div class="testimonial-box">
              <!--top------------------------->
              <div class="box-top">
                <!--profile----->
                <div class="profile">
                  <!--img---->
                  <div class="profile-img">
                    <img src="https://i.imgur.com/g6xsj36.jpg" />
                  </div>
                  <!--name-and-username-->
                  <div class="name-user">
                    <strong>Noah Wood</strong>
                    <span>{{ convertDateFormat(review.date) }}</span>
                  </div>
                </div>
                <!--reviews------>
                <div class="reviews">
                  <span v-for="index in review.rating">&#9733;</span>
                  <span v-for="index in 5 - review.rating"
                    >&#9734;<!--Empty star--></span
                  >
                </div>
              </div>
              <!--Comments---------------------------------------->
              <div class="client-comment">
                <p class="overflow-ellipsis">
                  {{ review.content }}
                </p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { convertDateFormat } from "@/helpers/helperFunctions";
export default {
  name: "tabProduct",
  props: ["product"],
  setup() {
    return {
      convertDateFormat: convertDateFormat,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/tabProduct.scss";
@import "../styles/reviewProduct.scss";
</style>
