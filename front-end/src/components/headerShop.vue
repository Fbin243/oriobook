<template>
  <div class="container">
    
    <div class="box-wrapper" ref="boxWrapper">
 </div></div>
 
</template>

<script>
export default {
  name: "headerShop",
  data() {
    return {
      currentIndex: 0,
      boxWidth: 263, // Width of each box including margin
      boxesToShow: 5, // Number of boxes to show at a time
    };
  },
  methods: {
    next() {
      this.currentIndex = (this.currentIndex + 1) % (this.totalBoxes - this.boxesToShow + 1);
      this.updateTransform();
      console.log(this.currentIndex);

    },
    prev() {
      this.currentIndex = (this.currentIndex - 1 ) % (this.totalBoxes - this.boxesToShow + 1);
      if (this.currentIndex < 0)this.currentIndex = 2;
      this.updateTransform();
      console.log(this.currentIndex);

    },
    updateTransform() {
      this.$refs.boxWrapper.style.transform = `translateX(${-this.currentIndex * this.boxWidth}px)`;
    },
  },
  computed: {
    totalBoxes() {
      return this.$refs.boxWrapper.children.length;
    },
  },
  mounted() {
    this.updateTransform();
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/headerShop.scss";
</style>
