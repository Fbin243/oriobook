<template>
  <div class="accountdetails-page container">
    <div class="row content">
      <SideBar />
      <div class="woocommerce-MyAccount-content col-9">
        <form class="woocommerce-EditAccountForm">
          <h3>DELETE ACCOUNT</h3>
          <p class="woocommerce-form-row">
            <label for="account_email"
              >Email address&nbsp;<span class="required">*</span></label
            >
            <input
              type="email"
              id="account_email"
              autocomplete="email"
              v-model="formData.account_email"
            />
            <span
              v-for="error in v$.account_email.$errors"
              :key="error.$uid"
              style="color: red"
            >
              {{ error.$message + "." }}<br />
            </span>
          </p>

          <p>
            <button
              type="button"
              class="woocommerce-Button button"
              name="save_account_details"
              value="Save changes"
              @click="DeleteAccount"
            >
              Delete
            </button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/account/SideBar.vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import { reactive, computed } from "vue";
import axios from "../config/axios";
import useVuelidate from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";

export default {
  components: {
    SideBar,
  },
  setup() {
    let mail = "";

    const formData = reactive({
      account_email: "",
    });

    const rules = computed(() => {
      return {
        account_email: { required, minLength: minLength(12), email },
      };
    });

    const v$ = useVuelidate(rules, formData);

    async function DeleteAccount() {
      const result = await v$.value.$validate();
      if (result) {
        try {
          const response = await axios.get(
            `${process.env.MAIN_URL}/account/getAccountDetail`
          );
          mail = response.data.email;
        } catch (error) {
          console.error("Lỗi khi gọi API", error);
        }
        if (mail === formData.account_email) {
          try {
            const response1 = await axios.post(
              `${process.env.MAIN_URL}/account/delete`,
              formData
            );

            if (response1.data.status === true) {
              localStorage.removeItem("token");
              localStorage.removeItem("sidebar");
              window.location.href = "https://localhost:8080/";
            } else {
              console.log(`you cannot delete your account`);
            }
          } catch (error) {
            console.error("Lỗi khi gọi API", error);
          }
        } else {
          toast.error("Incorrect email address for account registration ", {
            autoClose: 1000,
          });
        }
      }
    }

    return { DeleteAccount, formData, rules, v$ };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/account/account_detail.scss";
</style>
