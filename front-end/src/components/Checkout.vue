<template>
  <div
    class="container"
    style="margin-left: auto; margin-right: auto; padding-left: 30px"
  >
    <div class="row" style="padding-right: 5px">
      <div class="col-8" style="position: relative">
        <!-- Content for the 60% width div -->

        <div
          class="coupon-content"
          id="coupon-content"
          style="
            display: none;
            width: 400px;
            height: 200px;
            background-color: #ffffff;
            box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
            position: absolute;
            right: 30px;
            z-index: 50;
            text-align: center;
            justify-content: center;
          "
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 400px;
            "
          >
            <label
              for="coupon-code"
              style="padding-top: 50px; padding-bottom: 50px; font-size: 15px"
              >If you have a coupon code, please apply it below.</label
            >
            <div style="display: flex; gap: 10px">
              <input
                type="text"
                id="coupon-code"
                placeholder="Coupon code..."
                style=":width: 300px; padding-left: 10px"
              />
              <button
                @click="applyCoupon"
                class="btn"
                style="width: 100px; height: 50px"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
        <div>
          <h4 style="font-weight: 400; font-size: 23px">Billing details</h4>
          <br />
          <h6 style="font-weight: 400; font-size: 17px">First name *</h6>
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            :value="accountData.firstName"
            disabled
          />
          <br />
          <h6 style="font-weight: 400; font-size: 17px">Last name *</h6>
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            :value="accountData.lastName"
            disabled
          />
          <br />

          <h6 style="font-weight: 400; font-size: 17px">Address *</h6>
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            :value="accountData.address"
            disabled
          />
          <br />

          <h6 style="font-weight: 400; font-size: 17px">Phone *</h6>
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            :value="accountData.phone"
            disabled
          />
          <br />
          <h6 style="font-weight: 400; font-size: 17px">Email *</h6>
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            :value="accountData.email"
            disabled
          />
          <br />
          <h6 style="font-weight: 400; font-size: 17px">
            Order notes (optional)
          </h6>
          <textarea
            class="form-control"
            v-model="note"
            aria-label="With textarea"
            placeholder="Note about your delivery (eg. free,..)"
            style="padding-top: 15px; outline: none"
          ></textarea>
        </div>
      </div>
      <div class="col-4">
        <div
          style="
            padding-left: 30px;
            padding-right: 250px;
            padding-right: 30px;
            padding-top: 30px;
            padding-bottom: 30px;
            border: 1px solid black;
          "
        >
          <h4
            style="
              font-family: Jost, sans-serif;
              font-weight: 400;
              font-size: 23px;
            "
          >
            Product
          </h4>
          <div style="user-select: none">
            __________________________________________
          </div>

          <div class="product-section">
            <div
              v-for="(item, index) in accountData.cart"
              :key="index"
              style="position: relative; margin-top: 40px"
            >
              <img :src="item.id_product?.image" style="width: 30%" />
              <div style="position: absolute; top: 0; left: 160px">
                {{ item.id_product?.name }}<br />
                <p style="font-weight: 500" class="mb-0 mt-2">
                  ${{ item.id_product?.price }}
                </p>
                <div style="font-weight: 500">
                  Quantity: {{ item.quantity }}
                </div>
              </div>
            </div>
          </div>
          <div style="user-select: none; color: rgb(119, 119, 119)">
            __________________________________________
          </div>
          <br />
          <div style="position: relative; width: 270px">
            <div>Subtotal</div>
            <div style="position: absolute; font-weight: 700; top: 0; right: 0">
              ${{ accountData.total_price }}
            </div>
            <div>Current balance</div>
            <div
              style="
                position: absolute;
                font-weight: 700;
                top: 27px;
                right: -8px;
              "
            >
              ${{ accountData.balance }}
            </div>
          </div>
          <div style="user-select: none; color: rgb(119, 119, 119)">
            __________________________________________
          </div>
          <br />
          <div>
            <p id="error-balance" style="color: red"></p>
            <p id="place-success" style="color: green"></p>
            <button
              class="btn"
              style="width: 375px; height: 50px"
              @click="placeOrder()"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueRouter from "vue-router";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "checkout",
  setup() {
    const router = useRouter();
    const accountData = ref({});
    const note = ref("");

    const toggleCoupon = () => {
      var content = document.getElementById("coupon-content");
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    };

    const applyCoupon = () => {
      // Add your coupon application logic here
      console.log("Coupon applied!");
    };

    const toggleContent = (contentId) => {
      var content = document.getElementById(contentId);
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    };

    const fetchData = async (link) => {
      try {
        const response = await axios.get(
          `https://localhost:3000/product/checkout`
        );
        accountData.value = response.data;
        console.log(accountData.value);
      } catch (error) {
        console.error("Error calling API:", error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    const placeOrder = async () => {
      let dataSend = {
        total: accountData.value.total_price,
        note: note.value,
      };

      const response = await axios.post(
        `https://localhost:3000/order/place`,
        dataSend
      );
      let res = response.data;

      if (res.result === "fail") {
        document.getElementById("error-balance").innerHTML =
          "* " + res.msg + ". Please add more balance";
      } else {
        document.getElementById("error-balance").innerHTML = "";
        document.getElementById("place-success").innerHTML =
          "* Place order successfully";

        setTimeout(() => {
          router.push({ name: "Home" });
        }, 2000);
      }
    };

    // You can return data or methods that you want to expose to the template
    return {
      toggleCoupon,
      applyCoupon,
      toggleContent,
      accountData,
      placeOrder,
      note,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/checkout.scss";
</style>
