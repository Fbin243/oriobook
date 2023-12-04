<template>
  <div
    class="col-3"
    :class="{
      'pe-3':
        $route.name == 'Manage' ||
        $route.name == 'Edit' ||
        $route.name == 'Dashboard',
    }"
  >
    <nav class="navigation">
      <ul>
        <li class="navigation-link">
          <router-link to="/account-details">Account details</router-link>
        </li>
        <template v-if="!admin">
          <li class="navigation-link">
            <router-link to="/account-order">Orders</router-link>
          </li>
        </template>
        <template v-if="admin">
          <li class="navigation-link">
            <router-link to="/admin/dashboard">Dashboard</router-link>
          </li>
          <li class="navigation-link">
            <router-link to="/admin/manage">Manage products</router-link>
          </li>
          <li class="navigation-link">
            <router-link to="/admin/order">Manage orders</router-link>
          </li>
        </template>
        <li class="navigation-link">
          <router-link to="/">Log out</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SideBar",
  data() {
    return {
      admin: true,
    };
  },
  components: {},
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/account/sidebar.scss";
</style>
