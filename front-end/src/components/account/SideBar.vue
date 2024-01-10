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
            <router-link to="/admin/manage-author">Manage authors</router-link>
          </li>
          <li class="navigation-link">
            <router-link to="/admin/manage-category"
              >Manage categories</router-link
            >
          </li>
          <li class="navigation-link">
            <router-link to="/admin/order">Manage orders</router-link>
          </li>
        </template>
        <li class="navigation-link">
          <router-link to="/account-wallet">My wallet</router-link>
        </li>
        <li class="navigation-link" @click="LogOut">
          <router-link to="/">Log out</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { getTokenInfo } from "../../helpers/helperFunctions";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "../../config/axios";
export default {
  name: "SideBar",

  components: {},
  setup() {
    let admin = ref(false);
    async function LogOut() {
      const response = await axios.post(
        `https://localhost:3000/account/logout`
      );
      let res = response.data;

      if (res.result === "success") {
        localStorage.removeItem("token");
        window.location.href = "https://localhost:8080/";
      }
    }

    async function checkAdmin() {
      const { isAdmin = false } = await getTokenInfo();
      admin.value = isAdmin;
    }
    return { LogOut, checkAdmin, admin };
  },
  async mounted() {
    await this.checkAdmin();
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/account/sidebar.scss";
</style>
