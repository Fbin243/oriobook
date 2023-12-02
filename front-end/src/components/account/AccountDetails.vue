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
      <label for="account_display_name"
        >Display name&nbsp;<span class="required">*</span></label
      >
      <input
        type="text"
        id="account_display_name"
        value="phanlybaohanh"
        disabled
      />
      <span
        ><em
          >This will be how your name will be displayed in the account section
          and in reviews</em
        ></span
      >
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
        value="phanlybaohanh@gmail.com"
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
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

export default {
  name: "AccountDetails",
  setup() {
    const formData = reactive({
      account_first_name: "",
      account_last_name: "",
    });

    const rules = computed(() => {
      return {
        account_first_name: { required, minLength: minLength(3) },
        account_last_name: { required, minLength: minLength(3) },
      };
    });

    const v$ = useVuelidate(rules, formData);

    async function SaveData() {
      const result = await v$.value.$validate();
      if (result) {
        alert(`Account details changed successfully.`);
      }
    }

    return { SaveData, formData, rules, v$ };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/account/account_detail.scss";
</style>
