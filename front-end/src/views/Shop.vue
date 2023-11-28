<template>
  <div class="shop-page">
    <div class="img-cover">
      <h1 class="title-heading">Shop</h1>
    </div>
    <div class="product-section container">
      <div class="row">
        <div class="col-3">
          <SliderShop />
        </div>
        <ShopProduct/>
      </div>
    </div>
  </div>
</template>

<script>
import ShopProduct from '@/components/product/ShopProduct.vue';
import SliderShop from '@/components/SilderShop.vue';


export default {
  components: {
    ShopProduct,
    SliderShop,
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/shop/shop.scss";
</style>