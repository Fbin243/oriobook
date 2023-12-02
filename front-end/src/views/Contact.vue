<template>
  <div class="shop-page" style="margin-bottom: 500px">
    <div class="img-cover">
      <h1 class="title-heading">Contact</h1>
    </div>
    <Contact />
  </div>
</template>

<script>
import Contact from "@/components/Contact.vue";

export default {
  components: {
    Contact,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/shop/shop.scss";
</style>
