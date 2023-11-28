<template>
  <div class="product-details container">
    <div class="row">
      <div class="col-12 title">Related Products</div>

      <div class="row">
        <div class="col-3 mt-3" v-for="index in 4" :key="index">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SideBar",
  components:{
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/sidebar.scss";
</style>
