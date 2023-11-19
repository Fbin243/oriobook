<template>
  <div class="home-product-section">
    <div class="type-filter">
      <h4 class="best-seller underline-animation" @click="bestSellerClick">Best sellers</h4>
      <h4 class="feature-products underline-animation" @click="featureClick">Feature products</h4>
    </div>
  </div>
  <div class="row gx-2 row-products">
    <div class="col m-20" v-for="item in number" :key="item">
      <HomeProductCard/>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import HomeProductCard from './HomeProductCard.vue';

export default {
  components: {
    HomeProductCard,
  },
  setup(){
    const number = ref(5)

    const bestSellerClick = () => {
      number.value = 5
    }

    const featureClick = () => {
      number.value = 9
    }

    return{
      number,
      bestSellerClick,
      featureClick,
    }
  }
};
</script>

<style scoped>

.home-product-section{
  padding-top: 30px;
}

.type-filter {
  display: flex;
  justify-content: center;
}

.type-filter h4 {
  font-size: 36px;
  font-family: Lora, serif;
  padding: 5px;
  position: relative;
  cursor: pointer;
  color: #242424cc;
}

.type-filter h4:hover {
  color: #242424;
}

.type-filter h4:nth-child(2) {
  margin-left: 20px;
}

.underline-animation {
  position: relative;
  display: inline-block;
  text-decoration: none;
  color: #333; /* Màu chữ */
}

.underline-animation::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px; /* Độ dày của đường gạch chân */
  bottom: 0;
  left: 0;
  background-color: var(--black-color); /* Màu của đường gạch chân khi không hover */
  visibility: hidden;
  transform: scaleX(0);
  transition: all 0.3s ease-in-out;
}

.underline-animation:hover::before {
  visibility: visible;
  transform: scaleX(1);
}

/* Tùy chỉnh màu của đường gạch chân khi hover */
.underline-animation:hover {
  color: var(--black-color); /* Màu chữ khi hover */
}

.row-products{
  padding: 0 18px;
  margin: 0 85px;
}
</style>
