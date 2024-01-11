<template>
  <nav
    aria-label="Page navigation example"
    :class="totalPages == 0 ? 'd-none' : ''"
    class="mt-1"
  >
    <ul class="pagination justify-content-end me-3">
      <li class="page-item">
        <a class="page-link js-prev-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li v-for="page in totalPages" class="page-item">
        <a
          class="page-link js-number-link"
          :class="{ active: page == curPage }"
          href="#"
          >{{ page }}</a
        >
      </li>
      <li class="page-item">
        <a class="page-link js-next-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref, onMounted, watch } from "vue";
export default {
  name: "Pagination",
  props: ["totalPages", "curPage"],
  setup(props) {
    const curPage = ref(props.curPage);
    const totalPages = ref(props.totalPages);

    watch(
      () => props.curPage,
      (newCurPage) => {
        curPage.value = newCurPage;
      }
    );

    watch(
      () => props.totalPages,
      (newTotalPages) => {
        totalPages.value = newTotalPages;
      }
    );

    return {
      curPage,
      totalPages,
    };
  },
};
</script>

<style lang="scss" scoped></style>
