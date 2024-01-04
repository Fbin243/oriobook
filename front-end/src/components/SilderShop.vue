<template>
  <form style="padding-left: 20px" @submit.prevent="handleSubmit">
    <h6>Categories:</h6>
    <div
      class="form-group form-check"
      v-for="category in products"
      :key="category.mainCategory"
    >
      <input
        :class="{ 'selected': isSelectedCategory(category.mainCategory) }"
        type="radio"
        class="form-check-input"
        :id="'category-' + category.mainCategory"
        name="category"
        v-model="selectedCategory"
        :value="category.mainCategory"
        @click="handleCategoryClick(category.mainCategory)"
      />
      <label
        class="form-check-label"
        :for="'category-' + category.mainCategory"
      >
        {{ category.mainCategory }}
      </label>

      <!-- Display subcategories for the selected main category or all subcategories -->
      <div>
        <div
          class="form-group form-check ml-4"
          v-for="subCategory in category.subCategories"
          :key="subCategory"
        >
          <input
            type="radio"
            class="form-check-input"
            :id="'subCategory-' + subCategory"
            name="subCategory"
            v-model="selectedSubCategory"
            :value="subCategory"
            @click="handleSubCategoryClick(category.mainCategory, subCategory)"
          />
          <label
            class="form-check-label"
            :for="'subCategory-' + subCategory"
          >
            {{ subCategory }}
          </label>
        </div>
      </div>
    </div>
    <br />


    <h6>Author:</h6>
    <div
      class="form-group form-check"
      v-for="author in authors"
      :key="author.id"
    >
      <input
      :class="{ 'selected': isSelectedAuthor(author.name) }"

        type="radio"
        class="form-check-input"
        :id="'author-' + author.id"
        name="author"
        v-model="selectedAuthor"
        :value="author.id"
      />
      <label
        class="form-check-label"
        :for="'author-' + author.id"
      >
        {{ author.name }}
      </label>
    </div>

    <br />
  </form>
  <br />
</template>


<script>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';

import axios from "axios";
export default {
  
  name: "SliderShop",
  setup() {
    const route = useRoute();

    const products = ref([]);    
    const id = ref(route.params.id);
    

    onMounted(async () => {
      try {
        console.log("Running...");
        const response = await axios.get(`http://localhost:3000/product/productCate`);
        products.value = response.data.allMainCategoriesArray; // Access 'products' property
        console.log(products.value);
        // Ensure products is an array
       
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    });
    return {
      products,

    };
    
  },
  computed: {
    isSelectedCategory() {
      return (categoryName) =>
        this.$route.query.category === categoryName;
    },
    isSelectedAuthor() {
      return (authorName) =>
        this.$route.query.author === authorName;
    },
  },
  data() {
    return {
      title: "Product Slider",
      selectedCategory: null,
      selectedAuthor: null,
      selectedCategoryName: "",
      selectedAuthorName: "",
      categories: [
        //Show list of maincategories
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
    

    handleCategoryClick(categoryName) {

      let authorsss;
      authorsss= this.$route.query.author;
      if (typeof this.$route.query.author === 'undefined'){ authorsss=""}
    if(typeof authorsss === 'undefined'){ authorsss=""}


      this.$router.replace({
      name: 'Shop', // Assuming 'ShopProduct' is the name of the route for the product page
      query: {
        category: categoryName,
        subCategories: "",
        author: authorsss
      }
  }).then(() => {
    this.$router.go();
    // Reload the current route
  });
    console.log("Clicked on main category:", categoryName);},

    handleSubCategoryClick(mainCategory, subCategory) {
      let authorsss;
      authorsss= this.$route.query.author;
      if (typeof this.$route.query.author === 'undefined'){ authorsss=""}
    if(typeof authorsss === 'undefined'){ authorsss=""}
    console.log("author",authorsss);
      this.$router.replace({
      name: 'Shop', // Assuming 'ShopProduct' is the name of the route for the product page
      query: {
        category: mainCategory,
        subCategories: subCategory,
        author: authorsss
      }
  }).then(() => {
    this.$router.go();

    // Reload the current route
  });
    console.log("Clicked on subcategory:", subCategory, "of main category:", mainCategory);
    // You can perform additional actions based on the clicked subcategory
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
    
    // Update the route with the selected category and author
    this.$router.replace({
      name: 'Shop', // Assuming 'ShopProduct' is the name of the route for the product page
      query: {
        category: this.getCategoryName(newValue),
        author: this.getAuthorName(this.selectedAuthor)
      }
  }).then(() => {
    // Reload the current route
  });
  },
  selectedAuthor: function (newValue, oldValue) {
    console.log("Selected Author changed from", this.getAuthorName(oldValue), "to", this.getAuthorName(newValue));
    console.log("Selected Category:", this.getCategoryName(this.selectedCategory));


    let selectMainCate;
    let selsubCategory;
    selectMainCate =  this.$route.query.category;
    selsubCategory =  this.$route.query.subCategory;
    if (typeof this.$route.query.category === 'undefined'){ selectMainCate=""}
    if(typeof selectMainCate === 'undefined'){ selectMainCate=""}
    if (typeof this.$route.query.subCategory === 'undefined'){  selsubCategory=""}
    if(typeof selsubCategory === 'undefined'){ selsubCategory=""}
    console.log("route",this.$route.query.category);
    console.log("routeSub", this.$route.query.subCategory);
    console.log("sub",selectMainCate);



    this.$router.push({
    name: 'Shop', // Assuming 'ShopProduct' is the name of the route for the product page
    query: {
      category: selectMainCate,
      subCategory:selsubCategory,
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
.selected {
  border: 5px solid #007bff; /* Blue border when selected */
}
@import "../styles/SliderShop.scss";
</style>
