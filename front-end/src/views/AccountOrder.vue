<template>
  <div class="account-page container">
    <div class="row content">
      <SideBar/>
      <OrderSection/>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import SideBar from "@/components/account/SideBar.vue";
import OrderSection from "@/components/order/OrderAccount.vue";

export default {
  components: {
    SideBar,
    OrderSection,
  },
  setup(){
    const account = ref('account')
    // console.log(account.value);

    return{
      account,
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/account/account_order.scss";
</style>