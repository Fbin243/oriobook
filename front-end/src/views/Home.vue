<template>
  <Hero />
  <featureRow />
  <Category />
  <Deal_TopRated />
  <HomeProduct />
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
};
</script>
