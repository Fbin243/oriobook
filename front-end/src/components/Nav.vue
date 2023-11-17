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
        <a href="#" class="nav-link">
          <span class="d-flex align-items-center">
            More
            <i class="fa-regular fa-angle-down drop-down-icon"></i>
          </span>
        </a>
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
