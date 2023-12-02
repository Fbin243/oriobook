<template>
  <div class="author-page">
    <div class="img-cover">
      <h1 class="title-heading">Bo Eriksson</h1>
    </div>

    <AuthorDetails />
  </div>
</template>

<script>
import AuthorDetails from "@/components/author/Author.vue";

export default {
  components: {
    AuthorDetails,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/author/authors_detail.scss";
</style>
