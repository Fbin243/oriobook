<template>
  <div class="account-page container">
    <div class="row content">
      <SideBar/>
      <OrderSection/>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/account/SideBar.vue";
import OrderSection from "@/components/order/OrderSection.vue";

export default {
  components: {
    SideBar,
    OrderSection,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/account/account.scss";
</style>
