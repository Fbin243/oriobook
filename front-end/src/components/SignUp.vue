<template>
  <div class="box-form-login">
    <div class="title-form register">Register</div>
    <div class="box-content">
      <div class="form-register">
        <form method="post" class="register">
          <div class="email">
            <input
              type="email"
              id="email"
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
              id="input-text"
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
          <div class="woocommerce-privacy-policy-text"></div>
          <div class="button-register">
            <button
              type="button"
              class="woocommerce-Button button"
              name="register"
              value="Register"
              @click="SaveData"
            >
              Register
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
import "vue3-toastify/dist/index.css";
import axios from "../config/axios";

import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

export default {
  name: "SignUp",

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
      if (result) {
        // alert(`Account details changed successfully.`);
        const response = await axios.post(
          `http://localhost:3000/account/signUp/`,
          {
            ...formData,
          }
        );
        console.log(response.data.accessToken);
        localStorage.setItem("token", response.data.accessToken);
        if (response.data.status == true) {
          router.push("/account-details");
        } else {
          toast.error("Your email has been used.", {
            autoClose: 2000,
            position: "top-center",
          });
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
