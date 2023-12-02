<template>
  <div class="container">
    <div class="row" v-for="item in number" :key="item">
      <div class="item">
        <div class="image-position-top">
          <div class="item-image">
            <a href="/author"
              ><img
                decoding="async"
                src="https://wpbingosite.com/wordpress/oriobook/wp-content/uploads/2023/07/Author-5.jpg"
                alt="Bo Eriksson"
            /></a>
          </div>
          <div class="content">
            <h2 class="item-title">
              <a href="/author"><span>Bo Eriksson</span></a>
            </h2>
            <div class="item-count">3<span> Published Book</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Authors",
  setup() {
    const number = ref(6);

    return {
      number,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/author/authors.scss";
</style>
