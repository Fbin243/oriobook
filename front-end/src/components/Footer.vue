<template>
  <div
    class="mt-5"
    style="display: flex; margin-left: auto; margin-right: auto; color: #cfcfcf; border-bottom: 1px solid #cecece;"
  >
  
  </div>
  <br /><br />
  <div class="container">
    <div class="box box1">
      <strong style="font-size: 22px; font-family: Lora, serif"
        >Customer Services</strong
      >
      <br /><br />
      <div
        style="font-size: 15px; color: #242424; font-family: Jost, sans-serif"
      >
        Got Question? Call us 24/7
      </div>

      <a href="tel:(+84)943018664" style="text-decoration: none"
        ><strong
          style="
            font-size: 28px;
            font-family: Jost, sans-serif;
            color: rgb(255, 102, 0);
          "
          >(+84) 94 301 8664</strong
        ></a
      >
      <br /><br />

      <div
        style="
          font-weight: 400;
          color: #242424;
          font-family: Jost, sans-serif;
          font-size: 15px;
        "
      >
        227 Nguyen Van Cu, District 5, Ho Chi Minh City.
      </div>
    </div>
    <div class="box box2">
      <strong style="font-size: 22px; font-family: Lora, serif"
        >Publisher</strong
      >
      <br /><br />
      <a href="#" style="text-decoration: none"
        ><div class="footer-link">Norstedt's history</div>
      </a>

      <a href="#" style="text-decoration: none"
        ><div class="footer-link">Norstedt's Publishing Group</div>
      </a>
      <a href="#" style="text-decoration: none"
        ><div class="footer-link">Norstedt's Agency</div>
      </a>
      <a href="#" style="text-decoration: none"
        ><div class="footer-link">The book club</div>
      </a>
      <a href="#" style="text-decoration: none"
        ><div class="footer-link">Environment and sustainability</div>
      </a>
      <a href="#" style="text-decoration: none"
        ><div class="footer-link">Work with us</div>
      </a>
      <a href="#" style="text-decoration: none"
        ><div class="footer-link">Book Fairs</div>
      </a>
    </div>
    <div class="box box3">
      <strong style="font-size: 22px; font-family: Lora, serif"
        >Information</strong
      >
      <br /><br />
      <a
        href="/aboutus"
        style="text-decoration: none"
        @click="handleLinkClick('/aboutus')"
        ><div class="footer-link">About us</div>
      </a>
      <a
        href="/contact"
        style="text-decoration: none"
        @click="handleLinkClick('/contact')"
        ><div class="footer-link">Contact</div>
      </a>
      <a
        href="/faq"
        style="text-decoration: none"
        @click="handleLinkClick('/faq')"
        ><div class="footer-link">FAQs</div>
      </a>
      <a href="/refund-policy" style="text-decoration: none"
        ><div class="footer-link">Refund and Returns Policy</div>
      </a>
    </div>
    <div class="box box4">
      <strong style="font-size: 22px; font-family: Lora, serif"
        >Social Media</strong
      >
      <br /><br />
      <a
        href="https://www.facebook.com/VNUHCM.US"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="fab fa-facebook icon"></i> </a
      >ㅤ
      <a href="#" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-instagram icon"></i> </a
      >ㅤ
      <a href="#" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-twitter icon"></i> </a
      >ㅤ
      <a href="#" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-wordpress-simple icon"></i>
      </a>
      <br /><br />
      <!-- <img src="../assets/img/money.jpg" style="margin-left: -30px" /> -->
    </div>
  </div>
  <div
    style="
      text-align: center;
      font-size: 15px;
      color: #242424;
      font-family: Jost, sans-serif;
      margin-top: 100px;
      padding-bottom: 50px;
    "
  >
    Copyright © 2023 Oriobook | Powered by Wpbingo
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  name: "footer",
  setup() {
    // Step 1: Create a ref to store the active link
    const activeLink = ref("/");

    // Step 2: Handle router link click event
    function handleLinkClick(to) {
      activeLink.value = to;
      localStorage.setItem("activeLink", to);
    }

    // Step 3: Check localStorage on component mount
    onMounted(() => {
      const storedActiveLink = localStorage.getItem("activeLink");
      if (storedActiveLink) {
        activeLink.value = storedActiveLink;
      }
    });

    return {
      activeLink,
      handleLinkClick,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/footer.scss";
</style>
