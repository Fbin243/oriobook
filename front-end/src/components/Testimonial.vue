<template>
  <div id="testimonialCarousel" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="testimonial">
          <div class="stars">&#9733; &#9733; &#9733; &#9733; &#9733;</div>
          <p style="font-size: 30px">
            Great service! The team was very professional and responsive.
          </p>
          <br /><br />
          <p style="font-size: 20px">John Doe</p>
        </div>
      </div>
      <div class="carousel-item">
        <div class="testimonial">
          <div class="stars">&#9733; &#9733; &#9733; &#9733; &#9734;</div>
          <p style="font-size: 30px">Quality. It exceeded my expectations.</p>
          <br /><br />
          <p style="font-size: 20px">Smith</p>
        </div>
      </div>
      <div class="carousel-item">
        <div class="testimonial">
          <div class="stars">&#9733; &#9733; &#9733; &#9733; &#9734;</div>
          <p style="font-size: 30px">
            I am done coding this web, but still, i like my job (maybe),
            stu-dying babie...
          </p>
          <br /><br />
          <p style="font-size: 20px">Albert Nafta</p>
        </div>
      </div>
      <div class="carousel-item">
        <div class="testimonial">
          <div class="stars">&#9733; &#9733; &#9733; &#9733; &#9734;</div>
          <p style="font-size: 30px">
            I hate doing this but i have to and i think i should give it 5
            stars, bruh
          </p>
          <br /><br />
          <p>Atfan</p>
        </div>
      </div>
      <!-- Add more testimonials as needed -->
    </div>

    <br /><br /><br />
    <ol class="carousel-indicators" style="background-color: white">
      <li
        data-target="#testimonialCarousel"
        data-slide-to="0"
        style="background-color: black"
        class="active"
      ></li>
      <li
        data-target="#testimonialCarousel"
        data-slide-to="1"
        style="background-color: black"
      ></li>
      <li
        data-target="#testimonialCarousel"
        data-slide-to="2"
        style="background-color: black"
      ></li>
      <li
        data-target="#testimonialCarousel"
        data-slide-to="3"
        style="background-color: black"
      ></li>
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
