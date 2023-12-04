<template>
 <div id="testimonialCarousel" class="carousel slide" data-bs-ride="carousel " style="margin-top: 100px">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <div class="testimonial">
        <div class="stars">&#9733; &#9733; &#9733; &#9733; &#9733;</div><br>
        <p style="color: #242424; font-family: Jost, sans-serif; font-size: 25px; font-weight: 400;">
          Great service! The team was very professional and responsive.
        </p>
        <br /><br />
        <p style="font-size: 20px">John Doe</p>
      </div>
    </div>
    <div class="carousel-item">
      <div class="testimonial">
        <div class="stars">&#9733; &#9733; &#9733; &#9733; &#9734;</div>
        <p style="color: #242424; font-family: Jost, sans-serif; font-size: 25px; font-weight: 400;">Quality. It exceeded my expectations.</p>
        <br /><br />
        <p style="font-size: 20px">Smith</p>
      </div>
    </div>
    <div class="carousel-item">
      <div class="testimonial">
        <div class="stars">&#9733; &#9733;  &#9734;  &#9734; &#9734;</div>
        <p style="color: #242424; font-family: Jost, sans-serif; font-size: 25px; font-weight: 400;">
          I am done coding this web, but still, I like my job (maybe),
          stu-dying babie...
        </p>
        <br /><br />
        <p style="font-size: 20px">Albert Nafta</p>
      </div>
    </div>
    <div class="carousel-item">
      <div class="testimonial">
        <div class="stars">&#9733; &#9733; &#9733; &#9733; &#9734;</div>
        <p style="color: #242424; font-family: Jost, sans-serif; font-size: 25px; font-weight: 400;">
          I hate doing this, but I have to, and I think I should give it 5
          stars, bruh
        </p>
        <br /><br />
        <p>Atfan</p>
      </div>
    </div>
    <!-- Add more testimonials as needed -->
  </div>

  <br /><br />
  <ol class="carousel-indicators" style="background-color: white">
    <li data-bs-target="#testimonialCarousel" data-bs-slide-to="0" class="active"></li>
    <li data-bs-target="#testimonialCarousel" data-bs-slide-to="1"></li>
    <li data-bs-target="#testimonialCarousel" data-bs-slide-to="2"></li>
    <li data-bs-target="#testimonialCarousel" data-bs-slide-to="3"></li>
    <!-- Add more indicators as needed -->
  </ol>
</div>

</template>

<script>

export default {
  
  name: "Testimonial",
};
</script>

<style lang="scss" scoped>
@import "../styles/Testimonial.scss";
</style>

