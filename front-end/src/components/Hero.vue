<template>
  <div class="hero">
    <p class="sub-heading text-uppercase text-center">
      Quick &amp; easy for you
    </p>
    <h1 class="heading text-center">
      Find the book <br />
      you're looking for easier to read.
    </h1>

    <div class="search-container d-flex">
      <div class="select-menu text-uppercase">
        <div class="select-btn">
          <i class="fa-solid fa-grid-2"></i>
          <span class="sBtn-text">All category</span>
          <i class="fa-solid fa-caret-down ms-auto"></i>
        </div>
        <ul class="options">
          <li class="option">
            <span class="option-text">Github</span>
          </li>
          <li class="option">
            <span class="option-text">Instagram</span>
          </li>
          <li class="option">
            <span class="option-text">Linkedin</span>
          </li>
          <li class="option">
            <span class="option-text">Facebook</span>
          </li>
          <li class="option">
            <span class="option-text">Twitter</span>
          </li>
        </ul>
      </div>
      <div class="select-menu text-uppercase">
        <div class="select-btn">
          <i class="fa-solid fa-square-pen"></i>
          <span class="sBtn-text">Book author</span>
          <i class="fa-solid fa-caret-down ms-auto"></i>
        </div>
        <ul class="options">
          <li class="option">
            <span class="option-text">Github</span>
          </li>
          <li class="option">
            <span class="option-text">Instagram</span>
          </li>
          <li class="option">
            <span class="option-text">Linkedin</span>
          </li>
          <li class="option">
            <span class="option-text">Facebook</span>
          </li>
          <li class="option">
            <span class="option-text">Twitter</span>
          </li>
        </ul>
      </div>
      <button class="search-btn">
        <i class="fa-regular fa-magnifying-glass"></i>
        <span class="text-uppercase">find book</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Hero",
  mounted() {
    this.makeSelectForm();
  },
  methods: {
    makeSelectForm() {
      const optionMenus = document.querySelectorAll(".select-menu");
      optionMenus.forEach(function (optionMenu) {
        const selectBtn = optionMenu.querySelector(".select-btn"),
          options = optionMenu.querySelectorAll(".option"),
          sBtn_text = optionMenu.querySelector(".sBtn-text");
        selectBtn.addEventListener("click", () =>
          optionMenu.classList.toggle("active")
        );
        options.forEach((option) => {
          option.addEventListener("click", () => {
            let selectedOption = option.querySelector(".option-text").innerText;
            sBtn_text.innerText = selectedOption;
            optionMenu.classList.remove("active");
          });
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/hero.scss";
</style>
