<template>
    <div class="shop-product" style = "margin-bottom: 500px;">
      <div class="img-cover">
        <h1 class="title-heading">Contact</h1>
        
      </div>
     <Contact />
    </div>
    <footers />
  </template>
  
  <script>
  import Contact from '@/components/Contact.vue';
  import footers from "@/components/footer.vue";

  
  export default {
    components: {
        Contact,
        footers,
    }
  }
  </script>
  
  <style lang="scss" scoped>
  @import "@/styles/shop/shop.scss";
  </style>