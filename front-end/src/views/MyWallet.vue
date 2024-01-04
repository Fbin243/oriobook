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
                  <div class="h3">Tuan Nguyen</div>
                </div>
              </div>
            </div>

            <div class="col-lg-6 mb-4">
              <!-- Billing card 3-->
              <div class="card border-start-lg border-start-success">
                <div class="card-body" style="padding-left: 12px">
                  <div class="small text-muted">Account balance</div>
                  <div class="h3 d-flex align-items-center">$100.67</div>
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
                      <th class="border-gray-200" scope="col">
                        Transaction ID
                      </th>
                      <th class="border-gray-200" scope="col">Order code</th>
                      <th class="border-gray-200" scope="col">Date</th>
                      <th class="border-gray-200" scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#39201</td>
                      <td>#657088d304ba4aee1848bb23</td>
                      <td>20:23:23 06/15/2021</td>
                      <td>$29.99</td>
                    </tr>
                    <tr>
                      <td>#38594</td>
                      <td>#657088d304ba4aee1848bb23</td>
                      <td>20:23:23 05/15/2021</td>
                      <td>$29.99</td>
                    </tr>
                    <tr>
                      <td>#38223</td>
                      <td>#657088d304ba4aee1848bb23</td>
                      <td>20:23:23 04/15/2021</td>
                      <td>$29.99</td>
                    </tr>
                    <tr>
                      <td>#38125</td>
                      <td>#657088d304ba4aee1848bb23</td>
                      <td>20:23:23 03/15/2021</td>
                      <td>$29.99</td>
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
    const clickModal = () => {
      $("#exampleModal").modal("show");
    };

    const deposit = async () => {
      try {
        // let error = false;
        // if (!$("input[name=star]:checked").val()) {
        //   document.getElementById("error-rating").innerHTML =
        //     "* Please choose any star";
        //   error = true;
        // } else {
        //   document.getElementById("error-rating").innerHTML = "";
        // }
        // if (document.getElementById("comment").value === "") {
        //   document.getElementById("error-comment").innerHTML =
        //     "* Please enter comment";
        //   error = true;
        // } else {
        //   document.getElementById("error-comment").innerHTML = "";
        // }
        // if (error) return;
        // let comment = document.getElementById("comment").value;
        // let rating = document.querySelector("input[name=star]:checked").value;
        // let data = {
        //   idOrder: idOrder.value,
        //   orderIndex: orderIndex.value,
        //   comment,
        //   rating,
        // };
        // // console.log(data);
        // const response = await axios.post(
        //   `https://localhost:3000/product/handle-review/${idProduct.value}`,
        //   data
        // );
        // let res = response.data;
        // if (res.msg === "success") {
        //   hideModal();
        //   successfulClick();
        // }
        // console.log(res.updatedOrder);
      } catch (error) {
        console.error("Error calling API:", error);
      }
    };

    const hideModal = () => {
      $("input[name=star]:checked").prop("checked", false);
      // $("#comment").text('')
      document.getElementById("comment").value = "";
      $("#exampleModal").modal("hide");
    };

    return {
      clickModal,
      deposit,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/account/account_wallet.scss";
</style>
