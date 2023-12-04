<template>
  <div class="shop-page" style="margin-bottom: 3800px">
    <div class="img-cover">
      <h1 class="title-heading">About us</h1>
      <br /><br /><br /><br />
      <featureRow />
      <vidOffer />
      <ourHisAndTeam />
      <Testimonial />
      <br /><br /><br /><br />
      <emailSupscription />
    </div>
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
