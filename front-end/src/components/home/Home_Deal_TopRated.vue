<template>
  <section class="deals">
    <div class="container">
      <DealsOfTheWeek />
      <TopRatedAuthor  :author="author"/>
    </div>
  </section>
</template>

<script>
import DealsOfTheWeek from "@/components/home/DealsOfTheWeek.vue";
import TopRatedAuthor from "@/components/home/TopRatedAuthor.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  components: {
    DealsOfTheWeek,
    TopRatedAuthor,
  },
  setup() {
    const route = useRoute();
    const id = ref(route.params.id);
    const author = ref({});
    
    onMounted(async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/author/list`
        );
        // console.log(response.data); 
        author.value = response.data;
        console.log(author.value);
        
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    });

    return {
      author,

    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/home/home_deal_toprated.scss";
</style>
