<template>
  <div class="right-col">
    <div class="elementor-element-populated">
      <div class="elementor-widget-container">
        <h2 class="elementor-heading-title">Top Rated Author</h2>
      </div>

      <div
        class="block_content row"
        v-for="(item, index) in author"
        :key="item"
      >
        <div class="item col-xl-12 col-lg-12 col-md-12 col-12">
          <div class="item-content">
            <div class="item-image">
              <a :href="'/authors/' + item._id"
                ><span>#{{ index + 1 }}</span
                ><img decoding="async" :src="item.image" :alt="item.name"
              /></a>
            </div>
            <div class="content">
              <h2 class="item-title">
                <a
                  :href="'/authors/' + item._id"
                  @click="handleLinkClick('/authors')"
                  ><span>{{ item.name }}</span></a
                >
              </h2>
              <div class="item-count">
                {{ item.published_book }}<span> Published Book</span>
              </div>
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
  props: ["author"],
  setup() {
    function handleLinkClick(to) {
      localStorage.setItem("activeLink", to);
    }
    return { handleLinkClick };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/home/home_toprated.scss";
</style>
