<template>
  <div class="container">
    
    <div class="box-wrapper" ref="boxWrapper">
      <div class="box">
        <div><img src="../assets/img/childbookslide.jpg">
        </div>
        <div class="words"><a href="">Children's books</a></div>
      </div>
      <div class="box">
        <div><img src="../assets/img/comedySlide.jpg">
        </div>
        <div class="words"><a href="">Comedy</a></div>
      </div>
      <div class="box">
        <div><img src="../assets/img/familySlide.jpg">
        </div>
        <div class="words"><a href="">Family Story</a></div>
      </div>
      <div class="box">
        <div><img src="../assets/img/fictionSlide.jpg">
        </div>
        <div class="words"><a href="">Fiction</a></div>
      </div>
      <div class="box">
        <div><img src="../assets/img/historySlide.jpg">
        </div>
        <div class="words"><a href="">History</a></div>
      </div>
      <div class="box">
        <div><img src="../assets/img/modficSlide.jpg">
        </div>
        <div class="words"><a href="">Modern Fiction</a></div>
      </div>
      <div class="box">
        <div><img src="../assets/img/romanceSlide.jpg">
        </div>
        <div class="words"><a href="">Romance</a></div>
      </div>
      <!-- Repeat the pattern for more boxes -->
    </div>

    <div class="controls" style="position: absolute;left:170px;top:410px;background-color: #eb5e37;color:white;border-radius: 50%;width: 35px;text-align: center;" @click="prev">❮</div>
    <div class="controls" style="position: absolute;right:180px;top:410px;background-color: #eb5e37;color:white;border-radius: 50%;width: 35px;text-align: center;" @click="next">❯</div>
  </div>
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

    },
    prev() {
      this.currentIndex = (this.currentIndex - 1 ) % (this.totalBoxes - this.boxesToShow + 1);
      if (this.currentIndex < 0)this.currentIndex = 2;
      this.updateTransform();

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
