<template>
  <div class="payment-page container">
    <div class="row content">
      <div class="col-5">

      </div>
      <OrderPayment/>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import OrderPayment from "@/components/order/OrderPayment.vue";

export default {
  components: {
    OrderPayment,
  },
  setup(){

    return{
      
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/order/payment.scss";
</style>
