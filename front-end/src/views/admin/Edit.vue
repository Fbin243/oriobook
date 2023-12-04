<template>
  <section class="row container">
    <aside class="sidebar col-2"></aside>
    <section class="edit-product col-10">
      <div class="d-flex align-items-center">
        <a
          class="edit-product-breadcrumb"
          href="http://localhost:3000/manage-product"
        >
          <div class="d-flex align-items-center">
            <i class="fa-regular fa-caret-left me-2"></i>
            <span>Products</span>
          </div>
        </a>
        <a class="btn text-uppercase ms-auto" href="#" role="button">Save</a>
      </div>
      <section class="edit-product-forms row gx-0">
        <ul class="edit-product-form col-7">
          <li class="edit-product-form-item">
            <label for="product-name">Name</label>
            <input id="product-name" type="text" />
          </li>
          <li class="edit-product-form-item">
            <label for="product-description">Description</label>
            <textarea
              name=""
              id="product-description"
              cols="30"
              rows="10"
            ></textarea>
          </li>
          <li class="edit-product-form-item row">
            <div class="col">
              <label for="product-price">Price</label>
              <input id="product-price" type="number" />
            </div>
            <div class="col">
              <label for="product-stock">Stock</label>
              <input id="product-stock" type="number" />
            </div>
          </li>
        </ul>
        <div class="edit-product-form col">
          <div class="product-category">
            <label class="product-category-label">Category</label>
            <select class="edit-product-select">
              <option value="document" selected>Document</option>
              <option value="uniform">Uniform</option>
              <option value="calculator">Calculator</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button class="product-image">Click to Add an Image</button>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  name: "Edit",
};
</script>

<style lang="scss" scoped>
@import "@/styles/admin/edit.scss";
</style>
