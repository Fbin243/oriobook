<template>
  <Hero />
  <featureRow />
  <Category />
  <Deal_TopRated />
  <HomeProduct :topRatedProducts="topRatedProducts" :bestSeller="bestSeller" />
  <HomeBanner />
  <Testimonial />
  <emailSupscription />
  <div class="back-top">
    <i class="fa-solid fa-arrow-up" @click="scrollToTop"></i>
  </div>
</template>

<script>
import Hero from "@/components/Hero.vue";
import Deal_TopRated from "@/components/home/Home_Deal_TopRated.vue";
import HomeProduct from "@/components/home/HomeProductSection.vue";
import HomeBanner from "@/components/home/HomeBanner.vue";
import featureRow from "@/components/featureRow.vue";
import Category from "@/components/Category.vue";
import Testimonial from "@/components/Testimonial.vue";
import emailSupscription from "@/components/emailSupscription.vue";

import { ref, onMounted } from "vue";
import axios from "../config/axios";

import { scrollToTop } from "@/helpers/helperFunctions";
export default {
  name: "Home",
  components: {
    Hero,
    featureRow,
    Category,
    Deal_TopRated,
    HomeProduct,
    HomeBanner,
    featureRow,
    Testimonial,
    emailSupscription,
  },
  setup() {
    const bestSeller = ref([]);
    const topRatedProducts = ref([]);
    const displayBackToTop = () => {
      window.addEventListener("scroll", () => {
        // console.log(document.documentElement.scrollTop);
        if (
          document.documentElement.scrollTop > 2000 ||
          document.body.scrollTop > 2000
        ) {
          $(".back-top").addClass("button-show");
        } else {
          $(".back-top").removeClass("button-show");
        }
      });
    };
    onMounted(async () => {
      try {
        let response = await axios.get(
          "https://localhost:3000/product/best-seller"
        );
        bestSeller.value = response.data;
        response = await axios.get("https://localhost:3000/product/top-rated");
        topRatedProducts.value = response.data;
        displayBackToTop();
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    });
    return {
      bestSeller,
      topRatedProducts,
      scrollToTop,
    };
  },
};
</script>
