<template>
    <div class="shop-product" style = "margin-bottom: 500px;">
      <div class="img-cover">
        <h1 class="title-heading">About us</h1>
        <br><br><br><br>
        <featureRow />
        <Testimonial />
      </div>
    </div>
    <footers />
  </template>
  
  <script>
  import Testimonial from "@/components/Testimonial.vue";
  import Contact from '@/components/Contact.vue';
  import featureRow from "@/components/featureRow2.vue";

  import footers from "@/components/footer.vue";

  
  export default {
    components: {
        Contact,
        footers,
        featureRow,
        Testimonial,
    }
  }
  </script>
  
  <style lang="scss" scoped>
  @import "@/styles/shop/shop.scss";
  </style>