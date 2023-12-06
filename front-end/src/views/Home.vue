<template>
  <Hero />
  <featureRow />
  <Category />
  <Deal_TopRated />
  <HomeProduct :topRatedProducts="topRatedProducts" :bestSeller="bestSeller" />
  <HomeBanner />
  <Testimonial />
  <emailSupscription />
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
import axios from "axios";
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
    onMounted(async () => {
      try {
        let response = await axios.get(
          "http://localhost:3000/product/best-seller"
        );
        bestSeller.value = response.data;
        response = await axios.get("http://localhost:3000/product/top-rated");
        topRatedProducts.value = response.data;
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    });
    return {
      bestSeller,
      topRatedProducts,
    };
  },
};
</script>
