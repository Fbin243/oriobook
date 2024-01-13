<template>
  <form class="woocommerce-EditAccountForm">
    <p class="woocommerce-form-row">
      <label for="account_first_name"
        >First name&nbsp;<span class="required">*</span></label
      >
      <input
        type="text"
        id="account_first_name"
        autocomplete="given-name"
        v-model="formData.account_first_name"
      />
      <span
        v-for="error in v$.account_first_name.$errors"
        :key="error.$uid"
        style="color: red"
      >
        {{ error.$message }}
      </span>
    </p>
    <p class="woocommerce-form-row">
      <label for="account_last_name"
        >Last name&nbsp;<span class="required">*</span></label
      >
      <input
        type="text"
        id="account_last_name"
        autocomplete="family-name"
        v-model="formData.account_last_name"
      />
      <span
        v-for="error in v$.account_last_name.$errors"
        :key="error.$uid"
        style="color: red"
      >
        {{ error.$message }}
      </span>
    </p>
    <div class="clear"></div>

    <p class="woocommerce-form-row">
      <label for="account_address"
        >Address&nbsp;<span class="required">*</span></label
      >
      <input
        type="text"
        id="account_address"
        autocomplete="given-name"
        v-model="formData.account_address"
      />
      <span
        v-for="error in v$.account_address.$errors"
        :key="error.$uid"
        style="color: red"
      >
        {{ error.$message }}
      </span>
    </p>
    <p class="woocommerce-form-row">
      <label for="account_phone"
        >Phone number&nbsp;<span class="required">*</span></label
      >
      <input
        type="tel"
        id="account_phone"
        autocomplete="family-name"
        v-model="formData.account_phone"
      />
      <span
        v-for="error in v$.account_phone.$errors"
        :key="error.$uid"
        style="color: red"
      >
        {{ error.$message }}
      </span>
    </p>
    <div class="clear"></div>

    <p class="woocommerce-form-row">
      <label for="account_email"
        >Email address&nbsp;<span class="required">*</span></label
      >
      <input
        type="email"
        id="account_email"
        autocomplete="email"
        class="bg-secondary-subtle"
        v-model="formData.account_email"
        disabled
      />
    </p>

    <div class="clear"></div>

    <p>
      <button
        type="button"
        class="woocommerce-Button button"
        name="save_account_details"
        value="Save changes"
        @click="SaveData"
      >
        Save changes
      </button>
    </p>
  </form>
</template>

<script>
import { reactive, computed, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength, numeric } from "@vuelidate/validators";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import "vue3-toastify/dist/index.css";
import axios from "../../config/axios";

export default {
  name: "AccountDetails",

  setup() {
    const router = useRouter();

    const formData = reactive({
      account_first_name: "",
      account_last_name: "",
      account_address: "",
      account_phone: "",
      account_email: "",
    });

    onMounted(async () => {
      try {
        const response = await axios.get(
          `https://localhost:3000/account/getAccountDetail`
        );
        formData.account_first_name = response.data.firstName;
        formData.account_last_name = response.data.lastName;
        formData.account_address = response.data.address;
        formData.account_phone = response.data.phone;
        formData.account_email = response.data.email;
      } catch (error) {
        console.error("Lỗi khi gọi API", error);
      }
    });

    const rules = computed(() => {
      return {
        account_first_name: { required, minLength: minLength(3) },
        account_last_name: { required, minLength: minLength(3) },
        account_address: { required, minLength: minLength(5) },
        account_email: { required },
        account_phone: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(10),
          numeric,
        },
      };
    });

    const v$ = useVuelidate(rules, formData);

    async function SaveData() {
      const result = await v$.value.$validate();
      if (result) {
        // alert(`Account details changed successfully.`);
        const response = await axios.post(
          `https://localhost:3000/account/updateAccountDetail`,
          {
            ...formData,
          }
        );

        if (response.data.status == true) {
          toast.success("Wow Success!", {
            autoClose: 2000,
          });
          router.push("/account-details");
        }
      }
    }

    return { SaveData, formData, rules, v$ };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/account/account_detail.scss";
</style>
