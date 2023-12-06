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
        <!-- <p
          style="
            font-family: Jost, sans-serif;
            font-size: 15px;
            color: #242424cc;
          "
        >
          There is no review yet
        </p> -->
        <div class="testimonial-box-container">
        
        <div class="testimonial-box">
            <!--top------------------------->
            <div class="box-top">
                <!--profile----->
                <div class="profile">
                    <!--img---->
                    <div class="profile-img">
                        <img src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" />
                    </div>
                    <!--name-and-username-->
                    <div class="name-user">
                        <strong>Noah Wood</strong>
                        <span>@noahwood</span>
                    </div>
                </div>
                <!--reviews------>
                <div class="reviews">
                  &#9733;
                  &#9733;
                  &#9733;
                  &#9733;
                  &#9734;<!--Empty star-->
                </div>
            </div>
            <!--Comments---------------------------------------->
            <div class="client-comment">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quaerat quis? Provident temporibus architecto asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam tenetur voluptates incidunt blanditiis sed atque cumque.</p>
            </div>
        </div>
        </div>
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
@import "../styles/reviewProduct.scss";
</style>
