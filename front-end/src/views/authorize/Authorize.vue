<template></template>

<script>
export default {
  name: "Authorize",
  components: [],
  setup() {
    const urlParams = new URLSearchParams(window.location.search);
    localStorage.setItem("token", urlParams.get("token"));
    window.location = "https://localhost:8080/account-details";
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/login.scss";
</style>
