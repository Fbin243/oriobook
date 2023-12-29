<template>
  <div class="my-wallet-page container">
    <div class="row content">
      <SideBar/>
      <div class="col-9">

        <div class="container px-4">
          <div class="row">
              <div class="col-lg-6 mb-4">
                  <!-- Billing card 1-->
                  <div class="card border-start-lg border-start-primary">
                      <div class="card-body">
                          <div class="small text-muted">Wallet balance</div>
                          <div class="h3">$20.00</div>
                      </div>
                  </div>
              </div>
              
              <div class="col-lg-6 mb-4">
                  <!-- Billing card 3-->
                  <div class="card border-start-lg border-start-success">
                      <div class="card-body">
                          <div class="small text-muted">Account balance</div>
                          <div class="h3 d-flex align-items-center">$100.67</div>
                          
                      </div>
                  </div>
              </div>
          </div>
          <!-- Payment methods card-->
          <div class="card card-header-actions mb-4">
              <div class="card-header">
                  Payment Methods
                  <button class="btn btn-sm btn-primary" type="button">Add Payment Method</button>
              </div>
              <div class="card-body px-0">
                  <!-- Payment method 1-->
                  <div class="d-flex align-items-center justify-content-between px-4">
                      <div class="d-flex align-items-center">
                          <i class="fab fa-cc-visa fa-2x cc-color-visa"></i>
                          <div class="ms-4">
                              <div class="small">Visa ending in 1234</div>
                              <div class="text-xs text-muted">Expires 04/2024</div>
                          </div>
                      </div>
                      <div class="ms-4 small">
                          <div class="badge bg-light text-dark me-3">Default</div>
                          <a href="#!">Edit</a>
                      </div>
                  </div>
                  <hr>
                  <!-- Payment method 2-->
                  <div class="d-flex align-items-center justify-content-between px-4">
                      <div class="d-flex align-items-center">
                          <i class="fab fa-cc-mastercard fa-2x cc-color-mastercard"></i>
                          <div class="ms-4">
                              <div class="small">Mastercard ending in 5678</div>
                              <div class="text-xs text-muted">Expires 05/2022</div>
                          </div>
                      </div>
                      <div class="ms-4 small">
                          <a class="text-muted me-3" href="#!">Make Default</a>
                          <a href="#!">Edit</a>
                      </div>
                  </div>
                  <hr>
                  <!-- Payment method 3-->
                  <div class="d-flex align-items-center justify-content-between px-4">
                      <div class="d-flex align-items-center">
                          <i class="fab fa-cc-amex fa-2x cc-color-amex"></i>
                          <div class="ms-4">
                              <div class="small">American Express ending in 9012</div>
                              <div class="text-xs text-muted">Expires 01/2026</div>
                          </div>
                      </div>
                      <div class="ms-4 small">
                          <a class="text-muted me-3" href="#!">Make Default</a>
                          <a href="#!">Edit</a>
                      </div>
                  </div>
              </div>
          </div>
          <!-- Billing history card-->
          <div class="card mb-4">
              <div class="card-header">Billing History</div>
              <div class="card-body p-0">
                  <!-- Billing history table-->
                  <div class="table-responsive table-billing-history" style="border-radius: 8px;">
                      <table class="table mb-0">
                          <thead>
                              <tr>
                                  <th class="border-gray-200" scope="col">Transaction ID</th>
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
  </div>
</template>

<script>
import {ref} from 'vue'
import SideBar from "@/components/account/SideBar.vue";

export default {
  components: {
    SideBar,
  },
  setup(){

    return{
      
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/account/account_wallet.scss";
</style>
