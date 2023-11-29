<template>
  <div class="grid-container">
    <!-- First Column -->
    <div class="big-card">
      <div class="card-content">
        <a href="#">
          <img
            src="../assets/img/romance.jpg"
            style="width: 80%; padding-top: 100px"
          />
          <h2>Romanace</h2></a
        >
      </div>
    </div>

    <!-- Second Column -->
    <div class="small-card">
      <div class="card-content">
        <a href="#">
          <img
            src="../assets/img/fiction.jpg"
            style="
              width: 90%;
              height: 230px;
              padding-bottom: 50px;
              padding-left: 20px;
            "
          />
          <h2 style="text-align: left; padding-left: 50px; padding-top: 0px">
            Fiction
          </h2></a
        >
      </div>
    </div>

    <div class="small-card">
      <div class="card-content">
        <a href="#">
          <div style="text-align: right">
            <img
              src="../assets/img/family.jpg"
              style="width: 55%; padding-top: 50px; padding-right: 50px"
            />
          </div>
          <h2
            style="
              text-align: left;
              padding-left: 50px;
              padding-bottom: 50px;
              margin-top: -50px;
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
        <a href="#">
          <div style="text-align: right">
            <img
              src="../assets/img/comedy.jpg"
              style="width: 55%; padding-top: 50px; padding-right: 50px"
            />
          </div>
          <h2
            style="
              text-align: left;
              padding-left: 50px;
              padding-bottom: 50px;
              margin-top: -50px;
            "
          >
            Comedy
          </h2></a
        >
      </div>
    </div>

    <div class="small-card">
      <div class="card-content">
        <a href="#">
          <div style="text-align: right">
            <img
              src="../assets/img/history.jpg"
              style="width: 55%; padding-top: 50px; padding-right: 50px"
            />
          </div>
          <h2
            style="
              text-align: left;
              padding-left: 50px;
              padding-bottom: 50px;
              margin-top: -50px;
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
