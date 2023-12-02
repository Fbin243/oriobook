<template>
  <Hero />
  <Deal_TopRated />
  <HomeProduct />
  <HomeBanner />
</template>

<script>
import Hero from "@/components/Hero.vue";
import Deal_TopRated from "@/components/home/Home_Deal_TopRated.vue";
import HomeProduct from "@/components/home/HomeProductSection.vue";
import HomeBanner from "@/components/home/HomeBanner.vue";

export default {
  name: "Home",
  components: {
    Hero,
    Deal_TopRated,
    HomeProduct,
    HomeBanner,
  },
};
</script>
