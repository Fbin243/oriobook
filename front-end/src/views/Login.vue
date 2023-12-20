<template>
  <section class="login container">
    <div class="row">
      <div class="col-6">
        <img src="@/assets/img/login.jpeg" alt="Login image" />
      </div>
      <div class="col-6">
        <div class="container-form">
          <h2 class="text-title-heading">My Account</h2>
          <SignIn />
          <SignUp />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SignIn from "@/components/SignIn.vue";
import SignUp from "@/components/SignUp.vue";

export default {
  components: {
    SignIn,
    SignUp,
  },

  name: "Login",
};
</script>

<style lang="scss" scoped>
@import "@/styles/login.scss";
</style>
