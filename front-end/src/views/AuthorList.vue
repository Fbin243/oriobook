<template>
  <div class="authorlist-page">
    <div class="img-cover">
      <h1 class="title-heading">List Athors</h1>
    </div>

    <Authors />
  </div>
</template>

<script>
import Authors from "@/components/author/Authors.vue";

export default {
  components: {
    Authors,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/author/authors.scss";
</style>
