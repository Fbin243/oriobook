<template>
  <div class="shop-page">
    <div
      class="img-cover d-flex align-items-center justify-content-center"
      style="height: 250px"
    >
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
@import "@/styles/shop/fakeShop.scss";
</style>
