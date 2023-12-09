<template>
  <div class="author-page">
    <div class="img-cover">
      <h1 class="title-heading"> {{ author.name }}</h1> 
    </div>

    <AuthorDetails  :author="author" />
  </div>
</template>

<script>
import AuthorDetails from "@/components/author/Author.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";


export default {
  components: {
    AuthorDetails,
  },
  setup() {
    const route = useRoute();
    const id = ref(route.params.id);
    const author = ref({});
   
    onMounted(async () => {
      try {
        console.log(id.value);
        const response = await axios.get(
          `http://localhost:3000/author/detail/${id.value}`
        );
        console.log(response.data); 
        author.value = response.data.author;
        
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
@import "@/styles/author/authors_detail.scss";
</style>
