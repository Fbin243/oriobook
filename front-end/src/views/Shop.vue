<template>
  <div class="shop-page">
    <div
      class="img-cover d-flex align-items-center justify-content-center"
      style="height: 250px"
    >
      <h1 class="title-heading">Shop</h1>
    </div>
    <div class="product-section container">
      <div class="row">
        <ShopProduct />
      </div>
    </div>
  </div>
</template>

<script>
import ShopProduct from "@/components/product/ShopProduct.vue";
import headerShop from "@/components/headerShop.vue";

export default {
  components: {
    ShopProduct,
    headerShop,
  },
  setup(props, { emit }) {
    const addCart = () => {
      emit("add-cart");
    };

    return {
      addCart,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/shop/shop.scss";
</style>
