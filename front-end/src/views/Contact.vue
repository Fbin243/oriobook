<template>
  <div class="shop-page" style="margin-bottom: 500px">
    <div class="img-cover" style="height:250px">
      <h1 class="title-heading "><div style="margin-top: -50px;">Contact</div></h1>
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
