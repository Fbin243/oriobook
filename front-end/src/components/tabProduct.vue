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
          <template v-for="(review, index) in reviews" :key="index">
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
                    <strong>{{review.id_account?.firstName}} {{ review.id_account?.lastName }}</strong>
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
                <p class="ellipsis-custom-3">
                  {{ review.content }}
                </p>
              </div>
            </div>
          </template>
          <p :class="reviews.length == 0 ? '' : 'd-none'" class="mt-5">
            There isn't any reviews yet!
          </p>
        </div>
        <nav
          aria-label="Page navigation example"
          :class="totalPages == 0 ? 'd-none' : ''"
          class="mt-1"
        >
          <ul class="pagination justify-content-end me-3">
            <li class="page-item">
              <a
                href="#"
                class="page-link js-prev-link-review"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li v-for="page in totalPages" class="page-item">
              <a
                href="#"
                class="page-link js-number-link-review"
                :class="{ active: page == curPage }"
                >{{ page }}</a
              >
            </li>
            <li class="page-item">
              <a
                href="#"
                class="page-link js-next-link-review"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { convertDateFormat } from "@/helpers/helperFunctions";
import Pagination from "@/components/Pagination.vue";
import { displayLoading, removeLoading } from "@/helpers/loadingScreen";

export default {
  name: "tabProduct",
  components: { Pagination },
  props: ["product"],
  setup(props) {
    let page = 1;
    const curPage = ref(page);
    const perPage = 6;
    const product = ref(props.product);
    const reviews = ref([]);
    const totalPages = ref(0);

    watch(
      () => props.product,
      async (newProduct) => {
        product.value = newProduct;
        totalPages.value = Math.ceil(product.value.reviews.length / perPage);
        await requestPage();
        paginationControl();
      }
    );

    const paginationControl = () => {
      $(".js-number-link-review").click(async function (e) {
        e.preventDefault();
        page = parseInt($(this).text());
        await requestPage();
      });

      $(".js-prev-link-review").click(async function (e) {
        e.preventDefault();
        page = page > 1 ? page - 1 : page;
        await requestPage();
      });

      $(".js-next-link-review").click(async function (e) {
        e.preventDefault();
        page = page < totalPages.value ? page + 1 : page;
        await requestPage();
      });
    };

    const requestPage = async () => {
      try {
        console.log("OK: ", product.value, reviews.value);
        const point = (page - 1) * perPage;
        reviews.value = product.value.reviews.slice(
          point,
          Math.min(point + perPage, product.value.reviews.length)
        );
        curPage.value = page;
        removeLoading();
      } catch (error) {
        console.error(error);
      }
    };

    return {
      convertDateFormat: convertDateFormat,
      curPage,
      totalPages,
      reviews,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/tabProduct.scss";
@import "../styles/reviewProduct.scss";
</style>
