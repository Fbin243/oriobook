<template>
  <Hero />
  <HomeProduct/>
</template>

<script>
import Hero from "@/components/Hero.vue";
import HomeProduct from '@/components/product/HomeProductSection.vue';

export default {
  name: "Home",
  components: {
    Hero,
    HomeProduct,
  },
};
</script>
