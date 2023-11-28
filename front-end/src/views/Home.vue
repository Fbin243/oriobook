<template>
  <Hero />
  <HomeProduct/>
  <HomeBanner/>
</template>

<script>
import Hero from "@/components/Hero.vue";
import HomeProduct from '@/components/home/HomeProductSection.vue';
import HomeBanner from '@/components/home/HomeBanner.vue'

export default {
  name: "Home",
  components: {
    Hero,
    HomeProduct,
    HomeBanner,
  },
};
</script>
