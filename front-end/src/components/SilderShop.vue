<template>
  <h6>Categories:</h6>
  <form style="padding-left: 20px">
    <div class="form-group form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="checkbox1"
        name="checkbox1"
      />
      <label class="form-check-label" for="checkbox1">Chilldren's books</label>
    </div>

    <div class="form-group form-check" >
      <input
        type="checkbox"
        class="form-check-input"
        id="checkbox2"
        name="checkbox2"
      />
      <label class="form-check-label" for="checkbox2">Comedy</label>
      <!-- <i
        class="fas fa-chevron-down"
        id="chevronIcon"
        @click="toggleAdditionalCheckboxes('additionalCheckboxes2')"
      ></i> -->
      <div class="additional-checkboxes" id="additionalCheckboxes2">
        <!-- Two additional checkboxes go here -->
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="additionalCheckbox21"
            name="additionalCheckbox21"
          />
          <label class="form-check-label" for="additionalCheckbox21"
            >Adventures</label
          >
        </div>
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="additionalCheckbox22"
            name="additionalCheckbox22"
          />
          <label class="form-check-label" for="additionalCheckbox22"
            >Biographies</label
          >
        </div>
      </div>
    </div>
    <div class="form-group form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="checkbox3"
        name="checkbox3"
      />
      <label class="form-check-label" for="checkbox3">Family Story</label>
    </div>

    <div class="form-group form-check " style="margin-left: -0px">
      <input
        type="checkbox"
        class="form-check-input"
        id="checkbox4"
        name="checkbox4"
      />
      <label class="form-check-label" for="checkbox2">Fiction</label>
      <!-- <i
        class="fas fa-chevron-down"
        id="chevronIcon2"
        @click="toggleAdditionalCheckboxes2('additionalCheckboxes4')"
      ></i> -->
      <div class="additional-checkboxes" id="additionalCheckboxes4">
        <!-- Two additional checkboxes go here -->
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="additionalCheckbox41"
            name="additionalCheckbox21"
          />
          <label class="form-check-label" for="additionalCheckbox21"
            >Arts & Photography</label
          >
        </div>
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="additionalCheckbox42"
            name="additionalCheckbox22"
          />
          <label class="form-check-label" for="additionalCheckbox22"
            >Classics</label
          >
        </div>
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="additionalCheckbox43"
            name="additionalCheckbox22"
          />
          <label class="form-check-label" for="additionalCheckbox22"
            >Horror</label
          >
        </div>
      </div>
    </div>

    <div class="form-group form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="checkbox5"
        name="checkbox5"
      />
      <label class="form-check-label" for="checkbox5">History</label>
    </div>

    <div class="form-group form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="checkbox6"
        name="checkbox6"
      />
      <label class="form-check-label" for="checkbox6">Modern Fiction</label>
    </div>

    <div class="form-group form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="checkbox7"
        name="checkbox7"
      />
      <label class="form-check-label" for="checkbox7">Romance</label>
    </div>
  </form>
  <br />


  

  <h6>Author:</h6>
  <form style="padding-left: 20px">
    <div class="form-group form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="checkbox1"
        name="checkbox1"
      />
      <label class="form-check-label" for="checkbox1">Bo Eriksson</label>
    </div>

    <div class="form-group form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="checkbox2"
        name="checkbox2"
      />
      <label class="form-check-label" for="checkbox2">Dan Gordon</label>
    </div>

    <div class="form-group form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="checkbox3"
        name="checkbox3"
      />
      <label class="form-check-label" for="checkbox3">Gunvor Hofmo</label>
    </div>

    <div class="form-group form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="checkbox4"
        name="checkbox4"
      />
      <label class="form-check-label" for="checkbox4">Maria-Pia Go</label>
    </div>

    <div class="form-group form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="checkbox5"
        name="checkbox5"
      />
      <label class="form-check-label" for="checkbox5">Nadya Toloko</label>
    </div>

    <div class="form-group form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="checkbox6"
        name="checkbox6"
      />
      <label class="form-check-label" for="checkbox6">Per Ahlin</label>
    </div>
  </form>

  <br />
</template>

<script>
export default {
  name: "SliderShop",
  data() {
    return {
      title: "Product Slider",
    };
  },
  methods: {
    toggleAdditionalCheckboxes(id) {
      var additionalCheckboxes = document.getElementById(id);
      if (additionalCheckboxes) {
        additionalCheckboxes.classList.toggle("active");
        var chevronIcon = document.getElementById("chevronIcon");
        if (chevronIcon) {
          chevronIcon.classList.toggle("fa-chevron-up");
          chevronIcon.classList.toggle("fa-chevron-down");
        }
      }
    },

    toggleAdditionalCheckboxes2(id) {
      var additionalCheckboxes = document.getElementById(id);
      if (additionalCheckboxes) {
        additionalCheckboxes.classList.toggle("active");
        var chevronIcon = document.getElementById("chevronIcon2");
        if (chevronIcon) {
          chevronIcon.classList.toggle("fa-chevron-up");
          chevronIcon.classList.toggle("fa-chevron-down");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/SliderShop.scss";
</style>
