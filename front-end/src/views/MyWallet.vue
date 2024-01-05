<template>
  <div class="my-wallet-page container">
    <div class="row content">
      <SideBar />
      <div class="col-9">
        <div class="container px-4">
          <div class="row">
            <div class="col-lg-6 mb-4">
              <!-- Billing card 1-->
              <div class="card border-start-lg border-start-primary">
                <div class="card-body" style="padding-left: 12px">
                  <div class="small text-muted">Name</div>
                  <div class="h3">{{ accountData.firstName }} {{ accountData.lastName }}</div>
                </div>
              </div>
            </div>

            <div class="col-lg-6 mb-4">
              <!-- Billing card 3-->
              <div class="card border-start-lg border-start-success">
                <div class="card-body" style="padding-left: 12px">
                  <div class="small text-muted">Account balance</div>
                  <div class="h3 d-flex align-items-center">${{accountData.balance}}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- Payment methods card-->
          <div class="card card-header-actions mb-4">
            <div
              class="card-header d-flex align-items-center"
              style="padding-left: 12px"
            >
              <p class="mb-0">Features</p>
              <button
                class="btn btn-primary ms-3"
                type="button"
                @click="clickModal()"
              >
                DEPOSIT
              </button>
            </div>
          </div>
          <!-- Billing history card-->
          <div class="card mb-4">
            <div class="card-header" style="padding-left: 12px">
              Billing History
            </div>
            <div class="card-body p-0">
              <!-- Billing history table-->
              <div
                class="table-responsive table-billing-history"
                style="border-radius: 8px"
              >
                <table class="table mb-0">
                  <thead>
                    <tr>
                      <th class="border-gray-200" scope="col">Transaction ID</th>
                      <th class="border-gray-200" scope="col">Date</th>
                      <th class="border-gray-200" scope="col">Change</th>
                      <th class="border-gray-200" scope="col">Amount</th>
                      <th class="border-gray-200 text-lg-center" scope="col" width="10%">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in accountData.history" :key="index">
                      <td>#{{item.transID}}</td>
                      <td>{{item.timeFormat}}</td>
                      <td>{{formatChangeBal(item.changeBalance)}}</td>
                      <td>${{item.atTimeBalance}}</td>
                      <td><span class="badge bg-success">{{item.action}}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <section class="section">
            <div class="star-rating-bx">
              <h2 class="text-center">Enter the amount</h2>
              <div class="star-widget">
                <form @submit.prevent="deposit()">
                  <div class="textarea">
                    <input
                      type="number"
                      id="amount"
                      class="d-block"
                      name="amount"
                      step="0.01"
                      pattern="[0-9]+([\.,][0-9]+)?"
                      placeholder="Enter your deposit"
                    />
                    <p id="error-comment"></p>
                  </div>
                  <div class="btn">
                    <button type="submit" class="btn">Confirm</button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import SideBar from "@/components/account/SideBar.vue";

export default {
  components: {
    SideBar,
  },
  setup() {
    const accountData = ref([])
    const clickModal = () => {
      $("#exampleModal").modal("show");
    };

    const deposit = async () => {
      try {
      //  Add more balance

      } catch (error) {
        console.error("Error calling API:", error);
      }
    };

    const hideModal = () => {
      document.getElementById("amount").value = "";
      $("#exampleModal").modal("hide");
    };

    const getMyWallet = async () => {
      const response = await axios.get(
        `https://localhost:3000/account/my-wallet`
      );

      accountData.value = response.data;

      console.log(response.data);

      // curPage.value = page;
      // orderData.value = response.data.pendingOrder;
      // totalPages.value = response.data.totalPages;
    };

    const formatChangeBal = (change) => {
      return `- $${Math.abs(parseFloat(change))}`
    }

    onMounted(async () => {
      try {
        await getMyWallet();
        // init();
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    });

    return {
      clickModal,
      deposit,
      accountData,
      formatChangeBal,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/account/account_wallet.scss";
</style>
