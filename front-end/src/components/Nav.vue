<template>
  <nav class="nav">
    <ul class="nav-list">
      <li class="nav-item">
        <a href="#" class="nav-link"><span>Home</span></a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link"><span>Shop</span></a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link"><span>Products</span></a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link"><span>Authors</span></a>
      </li>
      <li class="nav-item sub-nav-container">
        <a href="#" class="nav-link sub-nav-container">
          <span class="d-flex align-items-center">
            More
            <i class="fa-regular fa-angle-down down-icon"></i>
            <i class="fa-regular fa-angle-up up-icon"></i>
          </span>
        </a>
        <ul class="sub-nav">
          <li class="nav-item">
            <a href="" class="nav-link">About Us</a>
          </li>
          <li class="nav-item">
            <a href="" class="nav-link">Contact</a>
          </li>
          <li class="nav-item">
            <a href="" class="nav-link">FAQ</a>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="nav-list">
      <li class="nav-item">
        <a href="#" class="nav-link">
          <i class="fa-regular fa-circle-question me-2"></i>
          <span>Can we help you?</span>
        </a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link"
          ><i class="fa-regular fa-user me-2"></i>
          <span>Account</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/nav.scss";
</style>
