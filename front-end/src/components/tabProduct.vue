<template>
  <div class="container mt-5">
    <ul class="nav nav-underline justify-content-center">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="tab1"
          data-bs-toggle="tab"
          href="#content1"
          style="
            font-family: Jost, sans-serif;
            font-size: 29px;
            font-weight: 100;
          "
          >Description</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="tab2"
          data-bs-toggle="tab"
          href="#content2"
          style="
            font-family: Jost, sans-serif;
            font-size: 29px;
            font-weight: 100;
          "
          >Review</a
        >
      </li>
    </ul>

    <div class="tab-content mt-2">
      <div id="content1" class="tab-pane fade show active">
        <!-- Your content for the 'Active' link goes here -->
        <br /><br />
        <p style="font-size: 15px; color: #242424cc">
          {{ product.description }}
        </p>
      </div>
      <div id="content2" class="tab-pane fade">
        <!-- Your content for the 'Link' goes here -->
        <p style="font-family: Lora, serif; font-size: 25px; color: #242424">
          Reviews
        </p>
        <br />
        <p
          style="
            font-family: Jost, sans-serif;
            font-size: 15px;
            color: #242424cc;
          "
        >
          There is no review yet
        </p>
        <!-- <button type="button" class="btn" style="font-size: 15px;">Write a review</button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabProduct",
  props: ["product"],
};
</script>

<style lang="scss" scoped>
@import "../styles/tabProduct.scss";
</style>
