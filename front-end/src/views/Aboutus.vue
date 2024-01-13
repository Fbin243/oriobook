<template>
  <div class="shop-page">
    <div
      class="img-cover d-flex align-items-center justify-content-center"
      style="height: 250px"
    >
      <h1 class="title-heading">About us</h1>
    </div>
    <br />
    <featureRow />
    <br />
    <!-- <vidOffer /> -->
    <ourHisAndTeam />
    <Testimonial />
    <br />
    <!-- <emailSupscription /> -->
  </div>
</template>

<script>
import Testimonial from "@/components/Testimonial.vue";
import Contact from "@/components/Contact.vue";
import featureRow from "@/components/featureRow2.vue";
import ourHisAndTeam from "@/components/ourHisAndTeam.vue";
import vidOffer from "@/components/vidOffer.vue";
import emailSupscription from "@/components/emailSupscription.vue";

export default {
  components: {
    Contact,
    featureRow,
    Testimonial,
    ourHisAndTeam,
    vidOffer,
    emailSupscription,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/shop/fakeShop.scss";
</style>
