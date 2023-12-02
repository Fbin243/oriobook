<template>
  <div class="right-col">
    <div class="elementor-element-populated">
      <div class="elementor-widget-container">
        <h2 class="elementor-heading-title">Top Rated Author</h2>
      </div>

      <div class="block_content row" v-for="item in number" :key="item">
        <div class="item col-xl-12 col-lg-12 col-md-12 col-12">
          <div class="item-content">
            <div class="item-image">
              <a
                href="https://wpbingosite.com/wordpress/oriobook/product_author/bo-eriksson/"
                ><span>#1</span
                ><img
                  decoding="async"
                  src="https://wpbingosite.com/wordpress/oriobook/wp-content/uploads/2023/07/Author-5.jpg"
                  alt="Bo Eriksson"
              /></a>
            </div>
            <div class="content">
              <h2 class="item-title">
                <a
                  href="https://wpbingosite.com/wordpress/oriobook/product_author/bo-eriksson/"
                  ><span>Bo Eriksson</span></a
                >
              </h2>
              <div class="item-count">3<span> Published Book</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "TopRatedAuthor",
  setup() {
    const number = ref(6);

    return {
      number,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/home/home_toprated.scss";
</style>
