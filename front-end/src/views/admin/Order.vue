<template>
  <div class="admin-order-page container">
    <div class="row content">
      <Sidebar></Sidebar>
      <div class="col-9 order-section">
        <p class="title">Orders</p>
        <div class="div" style="min-height: 600px" v-if="orderData.length">
          <table class="order-table table-bordered">
            <thead>
              <tr>
                <th scope="col" class="#" width="5%">#</th>
                <th scope="col" class="customer-name">Customer name</th>
                <th scope="col" class="email" width="25%">Email</th>
                <th scope="col" class="phone-number" width="15%">
                  Phone number
                </th>
                <th scope="col" class="status" width="12%">Status</th>
                <th scope="col" class="details" width="5%">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="cart_item"
                v-for="(order, index) in orderData"
                :key="index"
              >
                <td>{{ index + 1 }}</td>
                <td class="customer-name">
                  {{ order.id_account.lastName + order.id_account.firstName }}
                </td>

                <td class="email">
                  {{ order.id_account.email }}
                </td>
                <td class="phone-number">
                  {{ order.id_account.phone }}
                </td>

                <td class="status">
                  <span
                    class="badge bg-primary text-uppercase"
                    v-if="order.status === 'Pending'"
                    >{{ order.status }}</span
                  >
                  <span
                    class="badge bg-success text-uppercase"
                    v-if="order.status === 'Successful'"
                    >{{ order.status }}</span
                  >
                  <span
                    class="badge bg-danger text-uppercase"
                    v-if="order.status === 'Cancelled'"
                    >{{ order.status }}</span
                  >
                </td>

                <td class="details">
                  <!-- <i class="fa-thin fa-ellipsis-stroke"></i> -->
                  <div class="evaluate-btn">
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
                          <table class="order-table table-bordered">
                            <thead>
                              <tr>
                                <th class="product-thumbnail-col" width="50%">
                                  Product
                                </th>
                                <th
                                  class="product-category-col"
                                  width="15%"
                                  style="text-align: center"
                                >
                                  Category
                                </th>
                                <th class="product-quantity-col" width="20%">
                                  Quantity
                                </th>
                                <th class="product-subtotal-col">Subtotal</th>
                              </tr>
                            </thead>
                            <tbody id="tbody-scroll">
                              <tr
                                class="cart_item"
                                v-for="(product, index_2) in foundObject.detail"
                                :key="index_2"
                              >
                                <td class="product-thumbnail">
                                  <div class="product-cart-info">
                                    <a
                                      href="https://wpbingosite.com/wordpress/oriobook/shop/zmats-kempe/"
                                      ><img
                                        :src="product.id_product.image"
                                        class="product-img"
                                        alt=""
                                    /></a>
                                    <div class="product-name">
                                      <p
                                        class="mb-0"
                                        href="https://wpbingosite.com/wordpress/oriobook/shop/zmats-kempe/"
                                      >
                                        {{ product.id_product.name }}
                                      </p>
                                      <p class="price mb-0">
                                        <span
                                          class="woocommerce-Price-amount amount"
                                        >
                                          {{ product.id_product.price
                                          }}<span class="currency"
                                            >$</span
                                          ></span
                                        >
                                      </p>
                                    </div>
                                  </div>
                                </td>

                                <td
                                  class="product-category"
                                  data-title="Category"
                                >
                                  <div class="quantity">
                                    <p class="type mb-2">
                                      {{ product.id_product.category }}
                                    </p>
                                  </div>
                                </td>

                                <td
                                  class="product-quantity"
                                  data-title="Quantity"
                                >
                                  <div class="quantity">
                                    <p class="number mb-2">
                                      {{ product.quantity }}
                                    </p>
                                  </div>
                                </td>

                                <td
                                  class="product-subtotal"
                                  data-title="Subtotal"
                                >
                                  <span
                                    class="woocommerce-Price-amount amount mb-2"
                                    ><bdi
                                      >${{
                                        roundNumber(
                                          product.id_product.price *
                                            product.quantity,
                                          2
                                        )
                                      }}
                                    </bdi></span
                                  >
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <p
                            id="error-approval"
                            class="text-danger"
                            v-if="formStatus === 'Pending'"
                          ></p>

                          <div
                            class="order-btn-section"
                            v-if="formStatus === 'Pending'"
                          >
                            <button
                              class="btn btn-success btn-accept"
                              @click="handleOrder(orderId, 'accept')"
                            >
                              ACCEPT
                            </button>
                            <button
                              class="btn btn-danger btn-delete"
                              @click="handleOrder(orderId, 'reject')"
                            >
                              REJECT
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      class="btn btn-submit"
                      @click="clickModal(order._id)"
                    >
                      <i class="fa-thin fa-ellipsis-stroke"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Notify -->
        <div class="notify-box" :class="{ 'd-none': orderData.length }">
          <p class="text-center" style="font-size: 20px; margin-top: 2rem">
            There are no orders!
          </p>
        </div>

        <!-- Pagination -->
        <div class="col-12 mt-2" :class="{ 'd-none': !orderData.length }">
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
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Sidebar from "@/components/account/SideBar";
import { displayLoading, removeLoading } from "@/helpers/loadingScreen";

export default {
  name: "Order",
  components: {
    Sidebar,
  },
  setup(props, { emit }) {
    const orderData = ref([]);
    const orderId = ref("");
    const foundObject = ref({});
    const formStatus = ref({});

    const totalPages = ref(null);
    let page = 1;
    const curPage = ref(page);
    let perPage = 10;

    const getOrderDetails = (_orderId) => {
      orderId.value = _orderId;
      console.log(orderId.value);
      foundObject.value = orderData.value.find((item) => item._id === _orderId);
      formStatus.value = foundObject.value.status;
      // console.log(foundObject.value.detail);
    };

    const clickModal = (_orderId) => {
      getOrderDetails(_orderId);
      $("#exampleModal").modal("show");
    };

    const roundNumber = (num, decimalPlaces = 0) => {
      let p = Math.pow(10, decimalPlaces);
      return Math.round(num * p) / p;
    };

    const handleOrder = async (_orderId, _action) => {
      let data = {
        action: _action,
      };

      console.log(_orderId, _action);

      const response = await axios.post(
        `http://localhost:3000/order/handle-manage-order/${_orderId}`,
        data
      );
      let res = response.data;
      if (res.msg === "success") {
        // console.log('handle ok');
        $("#error-approval").text("");
        await requestPage();
        getOrderDetails(orderId.value);
        $("#exampleModal").modal("hide");
      } else {
        // console.log('ko du so luong hang');
        $("#error-approval").text(
          "There is not a sufficient quantity of the product."
        );
      }
    };

    const requestPage = async () => {
      const response = await axios.get(
        `http://localhost:3000/order/manage-order?page=${page}&perPage=${perPage}`
      );
      curPage.value = page;
      orderData.value = response.data.orders;
      // orderData.value = []
      totalPages.value = response.data.totalPages;
    };
    const init = function () {
      $(() => {
        if (totalPages.value) {
          $(".js-number-link").click(async function (e) {
            e.preventDefault();
            page = parseInt($(this).text());
            await requestPage();
          });
          $(".js-prev-link").click(async function (e) {
            e.preventDefault();
            page = page > 0 ? page - 1 : page;
            await requestPage();
          });
          $(".js-next-link").click(async function (e) {
            e.preventDefault();
            page = page < totalPages.value ? page + 1 : page;
            await requestPage();
          });
        }
      });
    };

    onMounted(async () => {
      try {
        await requestPage();
        init();
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    });

    return {
      orderData,
      clickModal,
      foundObject,
      roundNumber,
      handleOrder,
      formStatus,
      orderId,
      totalPages,
      curPage,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/admin/order.scss";
</style>
