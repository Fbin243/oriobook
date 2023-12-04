<template>
  <div class="gg" style="width: 1500px;margin-left: auto;margin-right: auto;position: relative;">
    <div id="map" style="width: 50%; margin: 30px;margin-top: 80px;"></div>
    <div class="container" style="margin-right: 50px;">
      <h4>Need more information?</h4>
      <br />
      <div>
        <i class="fa-solid fa-location-dot"></i> 3 Nguyen Van Cu, District 5, HoChiMinh City,<br />
        3166 (03) 9238 8831
      </div>
      <br />
      <div>
        For all customer enquiries please contact us at: hello@hazelandfolk.com<br />
        Please allow 24 to 48 hours for our team to respond to you.
      </div>
      <br />
      <h4>Open hours:</h4>
      Monday to Friday 8am to 5pm,<br />
      Australian Eastern Standard Time.<br /><br />
      <h4 style="font-family: jost, sans-serif;font-size: 24px;">Contact us:</h4><br>
      <form action="#" method="post">
        <div class="form-group">
          <label for="name" style="font-family: jost, sans-serif;font-size: 15px;">Name:</label>
          <input type="text" class="form-control" id="name" name="name" required />
        </div><br>

        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" class="form-control" id="email" name="email" required />
        </div>
        <br>
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea class="form-control" id="message" name="message" rows="4" required></textarea>
        </div>
        <br>
        <button type="submit" class="btn btn-dark btn-hover-orange">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",
  methods: {
    loadMapScenario() {
      const mapOptions = {
        credentials:
          "Agi_xIfVmXm2fvEGclgCdvhCRj_g8BbpNU092IuU6RCrO8eJ5IMaXHgDH5K13E3g",
        center: new Microsoft.Maps.Location(10.7638, 106.6823),
        zoom: 16,
      };

      const map = new Microsoft.Maps.Map(
        document.getElementById("map"),
        mapOptions
      );

      // You can add additional map functionality or markers here
    },
  },
  mounted() {
    // Load the Bing Maps script dynamically
    const script = document.createElement("script");
    script.src =
      "https://www.bing.com/api/maps/mapcontrol?callback=loadBingMaps";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    window.loadBingMaps = this.loadMapScenario; // Make the loadMapScenario method available globally
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/Contact.scss";
</style>
