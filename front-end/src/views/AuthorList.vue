<template>
  <div class="authorlist-page">
    <div class="img-cover">
      <h1 class="title-heading">List Athors</h1>
    </div>

    <Authors :author="author" />
  </div>
</template>

<script>
import Authors from "@/components/author/Authors.vue";
import { ref, onMounted } from "vue";
import axios from "../config/axios";

import { useRoute } from "vue-router";

export default {
  components: {
    Authors,
  },
  setup() {
    const route = useRoute();
    const id = ref(route.params.id);
    const author = ref({});

    onMounted(async () => {
      try {
        const response = await axios.get(`http://localhost:3000/author/list`);
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
@import "@/styles/author/authors.scss";
</style>
