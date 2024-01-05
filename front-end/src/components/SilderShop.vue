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
          :class="{ 'selected': isSelectedSubCategory(subCategory) }"
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


    <h6>Authors:</h6>
    <div
      class="form-group form-check"
      v-for="author in authorsAll"
      :key="author.id"
    >
      <input
        :class="{ 'selected': isSelectedAuthor(author) }"
        type="radio"
        class="form-check-input"
        :id="'author-' + author.id"
        name="author"
        v-model="selectedAuthor"
        :value="author.id"
        @click="handleAuthorClick(author)"
      />
      <label
        class="form-check-label"
        :for="'author-' + author.id"
      >
        {{ author}}
      </label>
    </div>
    <br />
    <h6>Year:</h6>
    <!-- do here -->
    <div class="form-group form-check">
      <input
        type="radio"
        :id="'year-Before2000'"
        name="year"
        :value="'Before2000'"
        class="form-check-input"
        :class="{ 'selected': isSelectedYear('Before2000') }"
        @click="handleYearClick('Before2000')"
      />
      <label :for="'year-Before2000'" class="form-check-label" >
        Before 2000
      </label>
      <br>
      <input
        type="radio"
        :id="'year-2000-2010'"
        name="year"
        :value="'2000-2010'"
        class="form-check-input"
        :class="{ 'selected': isSelectedYear('2000-2010') }"

        @click="handleYearClick('2000-2010')"
      />
      <label :for="'year-2000-2010'" class="form-check-label">
        2000-2010
      </label>
      <br>
      <input
        type="radio"
        :id="'year-After2010'"
        name="year"
        :value="'After2010'"
        class="form-check-input"
        :class="{ 'selected': isSelectedYear('After2010') }"

        @click="handleYearClick('After2010')"
      />
      <label :for="'year-After2010'" class="form-check-label" >
        After 2010
      </label>
    </div>
    <br/>
    <h6>Price:</h6>
    <div class="form-group form-check">
    <input
      type="radio"
      :id="'price-LessThan50'"
      name="price"
      :value="'LessThan50'"
      class="form-check-input"
      :class="{ 'selected': isSelectedPrice('LessThan50') }"
      @click="handlePriceClick('LessThan50')"
    />
    <label :for="'price-LessThan50'" class="form-check-label">
      Less Than $50
    </label>
    <br>
    <input
      type="radio"
      :id="'price-50-100'"
      name="price"
      :value="'50-100'"
      class="form-check-input"
      :class="{ 'selected': isSelectedPrice('50-100') }"
      @click="handlePriceClick('50-100')"
    />
    <label :for="'price-50-100'" class="form-check-label">
      $50 - $100
    </label>
    <br>
    <input
      type="radio"
      :id="'price-MoreThan100'"
      name="price"
      :value="'MoreThan100'"
      class="form-check-input"
      :class="{ 'selected': isSelectedPrice('MoreThan100') }"
      @click="handlePriceClick('MoreThan100')"
    />
    <label :for="'price-MoreThan100'" class="form-check-label">
      More Than $100
    </label>
  </div>
  <br/>
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
    const authorsAll = ref([]);    

    const id = ref(route.params.id);
    

    onMounted(async () => {
      try {
        console.log("Running...");
        const response = await axios.get(`http://localhost:3000/product/productCate`);
        const response2 = await axios.get(`http://localhost:3000/product/allAuthor`);

        authorsAll.value = response2.data.allMainCategoriesArray; // Access 'authorsAll' property
        console.log(authorsAll.value);

        products.value = response.data.allMainCategoriesArray; // Access 'products' property
        console.log(products.value);
        // Ensure products is an array
       
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    });
    return {
      products,
      authorsAll
    };
    
  },
  computed: {
    isSelectedCategory() {
      return (categoryName) =>
        this.$route.query.category === categoryName;
    },
    isSelectedSubCategory() {
    return (subCategoryName) => this.$route.query.subCategories === subCategoryName;
  },
    isSelectedAuthor() {
      return (authorName) =>
        this.$route.query.author === authorName;
    },
    isSelectedYear() {
      return (year) =>
        this.$route.query.publishYear === year;
    },
    isSelectedPrice() {
      return (money) =>
        this.$route.query.price === money;
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
    handlePriceClick(money){
      let years;
      years= this.$route.query.publishYear;
      if (typeof this.$route.query.publishYear === 'undefined'){ years=""}
    if(typeof years === 'undefined'){ years=""}
      let authorsss;
      authorsss= this.$route.query.author;
      if (typeof this.$route.query.author === 'undefined'){ authorsss=""}
    if(typeof authorsss === 'undefined'){ authorsss=""}
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
      author: authorsss,
      publishYear:years,
      price: money
    }
  }).then(() => {
    this.$router.go();
    // Reload the current route
  });

    },

    handleYearClick(year){
      let money;
      money= this.$route.query.price;
      if (typeof this.$route.query.price === 'undefined'){ money=""}
      let authorsss;
      authorsss= this.$route.query.author;
      if (typeof this.$route.query.author === 'undefined'){ authorsss=""}
    if(typeof authorsss === 'undefined'){ authorsss=""}
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
      author: authorsss,
      publishYear:year,
      price:money
    }
  }).then(() => {
    this.$router.go();
    // Reload the current route
  });
    },


    handleAuthorClick(author){
      let money;
      money= this.$route.query.price;
      if (typeof this.$route.query.price === 'undefined'){ money=""}
      let years;
      years= this.$route.query.publishYear;
      if (typeof this.$route.query.publishYear === 'undefined'){ years=""}
    if(typeof years === 'undefined'){ years=""}

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
      author: author,
      publishYear:years,
      price:money

    }
  }).then(() => {
    this.$router.go();
    // Reload the current route
  });


    },

    handleCategoryClick(categoryName) {
      let money;
      money= this.$route.query.price;
      if (typeof this.$route.query.price === 'undefined'){ money=""}
      let years;
      years= this.$route.query.publishYear;
      if (typeof this.$route.query.publishYear === 'undefined'){ years=""}
    if(typeof years === 'undefined'){ years=""}
      let authorsss;
      authorsss= this.$route.query.author;
      if (typeof this.$route.query.author === 'undefined'){ authorsss=""}
    if(typeof authorsss === 'undefined'){ authorsss=""}


      this.$router.replace({
      name: 'Shop', // Assuming 'ShopProduct' is the name of the route for the product page
      query: {
        category: categoryName,
        subCategories: "",
        author: authorsss,
        publishYear:years,
        price:money


      }
  }).then(() => {
    this.$router.go();
    // Reload the current route
  });
    console.log("Clicked on main category:", categoryName);},

    handleSubCategoryClick(mainCategory, subCategory) {
      let money;
      money= this.$route.query.price;
      if (typeof this.$route.query.price === 'undefined'){ money=""}
      let years;
      years= this.$route.query.publishYear;
      if (typeof this.$route.query.publishYear === 'undefined'){ years=""}
    if(typeof years === 'undefined'){ years=""}
      let authorsss;
      authorsss= this.$route.query.author;
      if (typeof this.$route.query.author === 'undefined'){ authorsss=""}
    if(typeof authorsss === 'undefined'){ authorsss=""}
    console.log("author",years);
      this.$router.replace({
      name: 'Shop', // Assuming 'ShopProduct' is the name of the route for the product page
      query: {
        category: mainCategory,
        subCategories: subCategory,
        author: authorsss,
        publishYear:years,
        price:money


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
