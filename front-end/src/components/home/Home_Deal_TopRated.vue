<template>
  <section class="deals">
    <div class="container">
      <DealsOfTheWeek />
      <TopRatedAuthor />
    </div>
  </section>
</template>

<script>
import DealsOfTheWeek from "@/components/home/DealsOfTheWeek.vue";
import TopRatedAuthor from "@/components/home/TopRatedAuthor.vue";

export default {
  components: {
    DealsOfTheWeek,
    TopRatedAuthor,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/home/home_deal_toprated.scss";
</style>
