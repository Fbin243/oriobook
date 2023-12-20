<template>
  <div
    class="grid-container"
    style="width: 1500px; margin-left: auto; margin-right: auto"
  >
    <!-- First Column -->
    <div class="big-card">
      <div class="card-content">
        <a href="/products?category=Romance&author=">
          <img
            src="../assets/img/romance.jpg"
            style="width: 70%; padding-top: 100px"
          />
          <h2
            style="
              padding-top: 50px;
              text-align: left;
              color: #242424;
              font-family: Jost, sans-serif;
              font-size: 22px;
              font-weight: 400;
            "
          >
            Romance
          </h2></a
        >
      </div>
    </div>

    <!-- Second Column -->
    <div class="small-card">
      <div class="card-content">
        <a href="/products?category=Fiction&author=">
          <img
            src="../assets/img/fiction.jpg"
            style="
              width: 90%;
              height: 230px;
              padding-bottom: 50px;
              padding-left: 20px;
            "
          />
          <h2
            style="
              text-align: left;
              padding-left: 50px;
              padding-bottom: 30px;
              color: #242424;
              font-family: Jost, sans-serif;
              font-size: 22px;
              font-weight: 400;
            "
          >
            Fiction
          </h2></a
        >
      </div>
    </div>

    <div class="small-card">
      <div class="card-content">
        <a href="/products?category=Family&author=">
          <div style="text-align: right">
            <img
              src="../assets/img/family.jpg"
              style="width: 50%; padding-top: 20px; padding-right: 50px"
            />
          </div>
          <h2
            style="
              text-align: left;
              padding-left: 50px;
              padding-bottom: 0px;
              margin-top: -30px;
              color: #242424;
              font-family: Jost, sans-serif;
              font-size: 22px;
              font-weight: 400;
            "
          >
            Family
          </h2></a
        >
      </div>
    </div>

    <!-- Third Column -->

    <div class="small-card">
      <div class="card-content">
        <a href="/products?category=Comedy&author=">
          <div style="text-align: right">
            <img
              src="../assets/img/comedy.jpg"
              style="width: 50%; padding-top: 20px; padding-right: 50px"
            />
          </div>
          <h2
            style="
              text-align: left;
              padding-left: 50px;
              padding-bottom: 00px;
              margin-top: -5px;
              color: #242424;
              font-family: Jost, sans-serif;
              font-size: 22px;
              font-weight: 400;
            "
          >
            Comedy
          </h2></a
        >
      </div>
    </div>

    <div class="small-card">
      <div class="card-content">
        <a href="/products?category=History&author=">
          <div style="text-align: right">
            <img
              src="../assets/img/history.jpg"
              style="
                width: 50%;
                padding-top: 20px;
                padding-right: 50px;
                padding-bottom: 10px;
              "
            />
          </div>
          <h2
            style="
              text-align: left;
              padding-left: 50px;
              padding-bottom: 50px;
              margin-top: -30px;
              color: #242424;
              font-family: Jost, sans-serif;
              font-size: 22px;
              font-weight: 400;
            "
          >
            History
          </h2></a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",
};
</script>

<style lang="scss" scoped>
@import "../styles/Category.scss";
</style>
