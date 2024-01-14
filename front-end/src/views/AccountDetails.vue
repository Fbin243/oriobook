<template>
  <div class="accountdetails-page container">
    <div class="row content">
      <SideBar />
      <div class="woocommerce-MyAccount-content col-9">
        <AccountDetails />
        <AccountDetails_Pass v-if="display === true" />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/account/SideBar.vue";
import AccountDetails from "@/components/account/AccountDetails.vue";
import AccountDetails_Pass from "@/components/account/AccountDetails_Pass.vue";
import { onMounted, ref } from "vue";
import axios from "../config/axios";

export default {
  components: {
    SideBar,
    AccountDetails,
    AccountDetails_Pass,
  },
  setup() {
    let display = ref(true);
    onMounted(async () => {
      try {
        const response = await axios.get(
          `https://localhost:3000/account/getAccountDetail`
        );

        if (response.data.password == "") {
          display.value = false;
        }
      } catch (error) {
        console.error("Lỗi khi gọi API", error);
      }
    });

    return {
      display,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/account/account_detail.scss";
</style>
