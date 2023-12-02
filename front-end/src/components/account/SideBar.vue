<template>
  <div class="col-3">
    <nav class="navigation">
      <ul>
        <li class="navigation-link shop-permis">
          <a href="/">Dashboard</a>
        </li>
        <li class="navigation-link">
          <a href="/account-details">Account details</a>
        </li>
        <li class="navigation-link">
          <a href="/">Orders</a>
        </li>
        <li class="navigation-link shop-permis">
          <a href="/">Products</a>
        </li>
        <li class="navigation-link">
          <a href="/">Log out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SideBar",
  components: {},
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/account/sidebar.scss";
</style>
