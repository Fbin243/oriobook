<template>
  <div class="container">
    <div class="row" v-for="item in author" :key="item">
      <div class="item">
        <div class="image-position-top">
          <div class="item-image">
            <a  :href="'/authors/' + item._id"
              ><img
                decoding="async"
                :src="item.image" :alt="item.name"
            /></a>
          </div>
          <div class="content">
            <h2 class="item-title">
              <a  :href="'/authors/' + item._id"><span>{{ item.name }}</span></a>
            </h2>
            <div class="item-count">{{ item.published_book }}<span> Published Book</span></div>
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
  props: ["author"],

  setup() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/author/authors.scss";
</style>
