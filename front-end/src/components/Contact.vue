<template>
  <div
    class="gg"
    style="
      width: 1500px;
      margin-left: auto;
      margin-right: auto;
      position: relative;
    "
  >
    <div id="map" style="width: 50%; margin: 30px; margin-top: 80px"></div>
    <div class="container" style="margin-right: 50px">
      <h4>Need more information?</h4>
      <br />
      <div>
        <i class="fa-solid fa-location-dot"></i> 227 Nguyen Van Cu, District 5,
        Ho Chi Minh City,<br />
        <i class="fa-solid fa-phone"></i> (+84) 943018664
      </div>
      <br />
      <div>
        All customer enquiries please contact us at:
        <a href="mailto:oriobook.webdev@gmail.com" style="text-decoration: none"
          ><strong class="d-inline">oriobook.webdev@gmail.com</strong><br
        /></a>
        Please allow 24 to 48 hours for our team to respond to you.
      </div>
      <br />
      <h4>Open hours:</h4>
      Monday to Friday 8.AM to 5.PM,<br />
      Indochina Standard Time.
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
