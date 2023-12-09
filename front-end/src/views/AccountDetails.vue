<template>
  <div class="accountdetails-page container">
    <div class="row content">
      <SideBar />
      <div class="woocommerce-MyAccount-content col-9">
        <AccountDetails />
        <AccountDetails_Pass />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/account/SideBar.vue";
import AccountDetails from "@/components/account/AccountDetails.vue";
import AccountDetails_Pass from "@/components/account/AccountDetails_Pass.vue";

export default {
  components: {
    SideBar,
    AccountDetails,
    AccountDetails_Pass,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/account/account_detail.scss";
</style>
