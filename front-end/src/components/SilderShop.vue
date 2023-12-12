<template>
  <h6>Categories:</h6>
  <form style="padding-left: 20px" @submit.prevent="handleSubmit">
    <h6>Categories:</h6>
    <div class="form-group form-check" v-for="category in categories" :key="category.id">
      <input
        type="radio"
        class="form-check-input"
        :id="'category-' + category.id"
        name="category"
        v-model="selectedCategory"
        :value="category.id"
      />
      <label class="form-check-label" :for="'category-' + category.id">{{ category.name }}</label>
    </div>

    <br />

    <h6>Author:</h6>
    <div class="form-group form-check" v-for="author in authors" :key="author.id">
      <input
        type="radio"
        class="form-check-input"
        :id="'author-' + author.id"
        name="author"
        v-model="selectedAuthor"
        :value="author.id"
      />
      <label class="form-check-label" :for="'author-' + author.id">{{ author.name }}</label>
    </div>

    <br />


  </form>
  <br />
</template>

<script>
export default {
  name: "SliderShop",
  data() {
    return {
      title: "Product Slider",
      selectedCategory: null,
      selectedAuthor: null,
      selectedCategoryName: "",
      selectedAuthorName: "",
      categories: [
        { id: 1, name: "Chilldren's books" },
        { id: 2, name: "Comedy" },
        { id: 3, name: "Family Story" },
        { id: 4, name: "Fiction" },
        { id: 5, name: "History" },
        { id: 6, name: "Modern Fiction" },
        { id: 7, name: "Romance" },

        // Add other category options as needed
      ],
      authors: [
        { id: 1, name: "Liz Cheney" },
        { id: 2, name: "Arthur Conan Doyle" },
        { id: 3, name: "Jeff Kinney" },
        { id: 4, name: "Julia Quinn" },
        { id: 5, name: "Keigo Higashino" },
        { id: 6, name: "Daniel Gerhard Brown" },
        // Add other author options as needed
      ],
    };
  },
  methods: {
    toggleAdditionalCheckboxes(id) {
      var additionalCheckboxes = document.getElementById(id);
      if (additionalCheckboxes) {
        additionalCheckboxes.classList.toggle("active");
        var chevronIcon = document.getElementById("chevronIcon");
        if (chevronIcon) {
          chevronIcon.classList.toggle("fa-chevron-up");
          chevronIcon.classList.toggle("fa-chevron-down");
        }
      }
    },
    
    
    handleSubmit() {
      this.$router.push({
        name: 'Shop', // Assuming 'ShopProduct' is the name of the route for the product page
        query: {
          category: this.selectedCategory,
          author: this.selectedAuthor
        }
      });
    },
    getCategoryName(id) {
      const category = this.categories.find((c) => c.id === id);
      return category ? category.name : "";
    },
    getAuthorName(id) {
      const author = this.authors.find((a) => a.id === id);
      return author ? author.name : "";
    },
    toggleAdditionalCheckboxes2(id) {
      var additionalCheckboxes = document.getElementById(id);
      if (additionalCheckboxes) {
        additionalCheckboxes.classList.toggle("active");
        var chevronIcon = document.getElementById("chevronIcon2");
        if (chevronIcon) {
          chevronIcon.classList.toggle("fa-chevron-up");
          chevronIcon.classList.toggle("fa-chevron-down");
        }
      }
    },
  },
  watch: {
  selectedCategory: function (newValue, oldValue) {
    console.log("Selected Category changed from", this.getCategoryName(oldValue), "to", this.getCategoryName(newValue));
    console.log("Selected Author:", this.getAuthorName(this.selectedAuthor));
    this.$router.push({
    name: 'Shop', // Assuming 'ShopProduct' is the name of the route for the product page
    query: {
      category: this.getCategoryName(newValue),
      author: this.getAuthorName(this.selectedAuthor)
    }
  }).then(() => {
    // Reload the current route
    this.$router.go();
  });
  },
  selectedAuthor: function (newValue, oldValue) {
    console.log("Selected Author changed from", this.getAuthorName(oldValue), "to", this.getAuthorName(newValue));
    console.log("Selected Category:", this.getCategoryName(this.selectedCategory));
    this.$router.push({
    name: 'Shop', // Assuming 'ShopProduct' is the name of the route for the product page
    query: {
      category: this.getCategoryName(this.selectedCategory),
      author: this.getAuthorName(newValue)
    }
  }).then(() => {
    // Reload the current route
    this.$router.go();
  });
  },
},
  mounted() {
    // Set initial names
    this.selectedCategoryName = this.getCategoryName(this.selectedCategory);
    console.log(this.selectedCategoryName);
    this.selectedAuthorName = this.getAuthorName(this.selectedAuthor);
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/SliderShop.scss";
</style>
