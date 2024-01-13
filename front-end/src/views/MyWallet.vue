<template>
  <div class="my-wallet-page container">
    <div class="row content">
      <SideBar />
      <div class="col-9">
        <p class="title">My wallet</p>
        <div class="row">
          <div class="col-6 mb-4">
            <!-- Billing card 1-->
            <div
              class="card border-start-lg border-start-primary"
              style="height: 100%"
            >
              <div class="card-body" style="padding-left: 12px">
                <div class="small text-muted">Name</div>
                <div class="h3">
                  {{ accountData.firstName }} {{ accountData.lastName }}
                </div>
              </div>
            </div>
          </div>

          <div class="col-6 mb-4">
            <!-- Billing card 2-->
            <div class="card border-start-lg border-start-success">
              <div class="card-body" style="padding-left: 12px">
                <div class="small text-muted">Account balance</div>
                <div class="h3 d-flex align-items-center">
                  ${{ parseFloat(accountData.balance).toFixed(2) }}
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="row">
          </div> -->
          <!-- Billing history card-->
          <div class="col-12 mb-4">
            <div class="card" style="min-height: 630px">
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
                        <th class="border-gray-200" scope="col" width="25%">
                          Transaction ID
                        </th>
                        <th class="border-gray-200" scope="col">Date</th>
                        <th class="border-gray-200" scope="col" width="15%">Change</th>
                        <th class="border-gray-200" scope="col" width="15%">Amount</th>
                        <th
                          class="border-gray-200 text-lg-center"
                          scope="col"
                          width="10%"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in historyData" :key="index">
                        <td>#{{ item.transID }}</td>
                        <td class="d-flex">
                          <p class="mb-0 text-start" style="width: 80px;">{{ splitDate(item.timeFormat, 1)}} </p> 

                          <p class="mb-0 text-end">{{ splitDate(item.timeFormat, 2) }}</p>
                        </td>
                        <td
                          :class="colorChangeBal(item.action, item.changeBalance)"
                        >
                          {{ formatChangeBal(item.action, item.changeBalance) }}
                        </td>
                        <td>${{ parseFloat(item.atTimeBalance).toFixed(2) }}</td>
                        <td>
                          <span
                            class="badge"
                            :class="{
                              'bg-danger': item.action === 'Paid',
                              'bg-success': item.action === 'Received',
                            }"
                            >{{ item.action }}</span
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <!-- :class="{ 'd-none': !accountData.length }" -->
          <div class="col-12 mt-2" :class="{ 'd-none': !historyData.length }">
            <nav aria-label="Page navigation example">
              <ul class="pagination d-flex justify-content-end">
                <li class="page-item">
                  <a
                    class="page-link js-prev-link"
                    href="#"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                  </a>
                </li>
                <li
                  v-for="(page, index) in totalPages"
                  class="page-item"
                  :key="index"
                >
                  <a
                    class="page-link js-number-link"
                    :class="{ active: page == curPage }"
                    href="#"
                    >{{ page }}</a
                  >
                </li>
                <li class="page-item">
                  <a class="page-link js-next-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
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
    const accountData = ref([]);
    const historyData = ref([]);

    const totalPages = ref(null);
    let page = 1;
    const curPage = ref(page);
    let perPage = 10;

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
        `https://localhost:3000/account/my-wallet?page=${page}&perPage=${perPage}`
      );

      // console.log(response.data);

      curPage.value = page;
      accountData.value = response.data.accountData;
      historyData.value = response.data.history;
      totalPages.value = response.data.totalPages;
    };

    const init = function () {
      $(() => {
        if (totalPages.value) {
          $(".js-number-link").click(async function (e) {
            e.preventDefault();
            page = parseInt($(this).text());
            await getMyWallet();
          });
          $(".js-prev-link").click(async function (e) {
            e.preventDefault();
            page = page > 1 ? page - 1 : page;
            await getMyWallet();
          });
          $(".js-next-link").click(async function (e) {
            e.preventDefault();
            page = page < totalPages.value ? page + 1 : page;
            await getMyWallet();
          });
        }
      });
    };

    const formatChangeBal = (action, change) => {
      if(action === "Pending") return "-";
      return `${change[0]} $${Math.abs(parseFloat(change))}`;
    };

    const colorChangeBal = (action, change) => {
      if (change[0] === "+") return 'text-success';
      return 'text-danger';
    };

    const splitDate = (date, type) => {
      let split = date.split(' ');
      if(type == 1){
        return split[0];
      }
      return split[1];
    }

    onMounted(async () => {
      try {
        await getMyWallet();
        init();
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    });

    return {
      clickModal,
      deposit,
      formatChangeBal,
      colorChangeBal,

      accountData,
      historyData,

      totalPages,
      curPage,

      splitDate,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/account/account_wallet.scss";
</style>
