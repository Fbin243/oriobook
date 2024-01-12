<template>
  <div class="box-form-login">
    <div class="title-form">Login</div>
    <div class="box-content">
      <div class="form-login">
        <form method="post" class="login">
          <div class="email">
            <input
              type="email"
              class="input-text"
              placeholder="Email address*"
              name="email"
              v-model="formData.email"
            />
            <span
              v-for="error in v$.email.$errors"
              :key="error.$uid"
              style="color: red"
            >
              {{ error.$message }}
            </span>
          </div>
          <div class="password">
            <input
              type="password"
              placeholder="Password*"
              name="password"
              v-model="formData.password"
            />
            <span
              v-for="error in v$.password.$errors"
              :key="error.$uid"
              style="color: red"
            >
              {{ error.$message }}
            </span>
          </div>
          <div class="button-login">
            <button
              type="button"
              class="woocommerce-Button button"
              name="login"
              value="Login"
              @click="SaveData"
            >
              Login
            </button>
          </div>

          <div class="button-login">
            <button
              type="button"
              class="woocommerce-Button button"
              name="google"
              value="Goole"
            >
              Login with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "SignIn",

  setup() {
    const router = useRouter();

    const formData = reactive({
      email: "",
      password: "",
    });

    const rules = computed(() => {
      return {
        email: { required, minLength: minLength(12), email },
        password: { required, minLength: minLength(3) },
      };
    });

    const v$ = useVuelidate(rules, formData);

    async function SaveData() {
      const result = await v$.value.$validate();
      console.log("CHECK");
      if (result) {
        console.log("OKE");
        const response = await axios.post(
          `https://localhost:3000/account/signIn`,
          formData
        );
        console.log("OKE");

        console.log(response.data.accessToken);
        localStorage.setItem("token", response.data.accessToken);

        if (response.data == "email error") {
          toast.error("Your email is not in use yet.", {
            autoClose: 2000,
            position: "top-center",
          });
        } else if (response.data == "password error") {
          toast.error("Your password is wrong.", {
            autoClose: 2000,
            position: "top-center",
          });
        } else {
          window.location.href = "https://localhost:8080/account-details";
        }
      }
    }

    return { SaveData, formData, rules, v$ };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/login.scss";
</style>
