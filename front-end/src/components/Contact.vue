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
    <div id="map" style="width: 50%; margin: 30px; margin-top: 80px">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.9083467509338!2d106.6818462696203!3d10.762711999336565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c06f4e1dd%3A0x43900f1d4539a3d!2sUniversity%20of%20Science%20-%20VNUHCM!5e0!3m2!1sen!2s!4v1705143024036!5m2!1sen!2s"
        width="600"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        class="w-100"
      ></iframe>
    </div>
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
    // loadMapScenario() {
    //   const mapOptions = {
    //     credentials:
    //       "Agi_xIfVmXm2fvEGclgCdvhCRj_g8BbpNU092IuU6RCrO8eJ5IMaXHgDH5K13E3g",
    //     center: new Microsoft.Maps.Location(10.762767, 106.682495),
    //     zoom: 16,
    //   };
    //   const map = new Microsoft.Maps.Map(
    //     document.getElementById("map"),
    //     mapOptions
    //   );
    //   // Thêm một đánh dấu vào tọa độ mong muốn
    //   const location = new Microsoft.Maps.Location(10.762767, 106.682495);
    //   const pushpin = new Microsoft.Maps.Pushpin(location, {
    //     title: "Oriobook",
    //   });
    //   // Thêm đánh dấu vào bản đồ
    //   map.entities.push(pushpin);
    // },
  },
  // mounted() {
  //   // Load the Bing Maps script dynamically
  //   const script = document.createElement("script");
  //   script.src =
  //     "https://www.bing.com/api/maps/mapcontrol?callback=loadBingMaps";
  //   script.async = true;
  //   script.defer = true;
  //   document.head.appendChild(script);
  //   window.loadBingMaps = this.loadMapScenario; // Make the loadMapScenario method available globally
  // },
};
</script>

<style lang="scss" scoped>
@import "../styles/Contact.scss";
</style>
