<template>
  <nav class="nav container">
    <ul class="nav-list">
      <li class="nav-item">
        <router-link to="/" class="nav-link"><span>Home</span></router-link>
      </li>
      <li class="nav-item">
        <router-link to="/products" class="nav-link"
          ><span>Shop</span></router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/authors" class="nav-link"
          ><span>Authors</span></router-link
        >
      </li>
      <li class="nav-item sub-nav-container">
        <router-link to="/" class="nav-link">
          <span class="d-flex align-items-center">
            More
            <i class="fa-regular fa-angle-down down-icon"></i>
            <i class="fa-regular fa-angle-up up-icon"></i>
          </span>
        </router-link>
        <ul class="sub-nav">
          <li class="nav-item">
            <router-link to="/aboutus" class="nav-link">About Us</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link">Contact</router-link>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="nav-list">
      <li class="nav-item">
        <router-link to="/faq" class="nav-link">
          <i class="fa-regular fa-circle-question me-2"></i>
          <span>Frequently Asked Question?</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="login_path" class="nav-link" @mouseover="Click">
          <i class="fa-regular fa-user me-2"></i>
          <span>Account</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "Nav",

  setup() {
    const router = useRouter();

    let Token;
    const login_path = ref("");
    function Click() {
      Token = localStorage.getItem("token");
      // console.log(Token);
      if (Token) {
        login_path.value = "/account-details";
      } else {
        login_path.value = "/login";
      }
    }

    onMounted(() => {
      $(".nav-link").click(function () {
        $(".nav-link").removeClass("active");
        $(this).addClass("active");
      });
    });

    return {
      Click,
      Token,
      login_path,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/nav.scss";
</style>
