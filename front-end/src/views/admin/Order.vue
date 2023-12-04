<template>
  <div class="admin-order-page container">
    <div class="row content">
      <Sidebar></Sidebar>
      <div class="col-9 order-section">
        <table class="order-table table-bordered">
          <thead>
            <tr>
              <th scope='col' class='#' width='5%'>#</th>
              <th scope='col' class='customer-name'>Customer name</th>
              <th scope='col' class='email' width='25%'>Email</th>
              <th scope='col' class='phone-number' width='15%'>Phone number</th>
              <th scope='col' class='status' width='12%'>Status</th>
              <th scope='col' class='details' width='5%'>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr class="cart_item" v-for="index in 10" :key="index">
              <td>{{ index }}</td>
              <td class="customer-name">
                Nguyen Van A
              </td>

              <td class="email" >
                nguyenvana@gmail.com
              </td>
              <td class="phone-number" >
                08128321932
              </td>

              <td class="status" >
                <span class="badge bg-primary text-uppercase">Pending</span>
              </td>

              <td class="details" >
                <!-- <i class="fa-thin fa-ellipsis-stroke"></i> -->
                <div class="evaluate-btn">
                  <!-- Modal -->
                  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <table
                          class="order-table table-bordered"
                        >
                          <thead>
                            <tr>
                              <th class="product-thumbnail-col" width="50%">Product</th>
                              <th class="product-category-col" width="15%">Category</th>
                              <th class="product-quantity-col" width="20%">Quantity</th>
                              <th class="product-subtotal-col">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="cart_item"
                            v-for="index in 4"
                            :key="index"
                            >
                              <td class="product-thumbnail">
                                <div class="product-cart-info">
                                  <a
                                    href="https://wpbingosite.com/wordpress/oriobook/shop/zmats-kempe/"
                                    ><img
                                      src="https://wpbingosite.com/wordpress/oriobook/wp-content/uploads/2018/10/product-31.jpg"
                                      class="product-img"
                                      alt=""
                                  /></a>
                                  <div class="product-name">
                                    <a
                                      href="https://wpbingosite.com/wordpress/oriobook/shop/zmats-kempe/"
                                      >Zmats Kempe</a
                                    >
                                    <p class="price mb-0">
                                      <span class="woocommerce-Price-amount amount">
                                        250.00<span class="currency">$</span
                                        ></span
                                      >
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td class="product-category" data-title="Category">
                                <div class="quantity">
                                  
                                  <p class="type mb-2">Book</p>

                                </div>
                              </td>
                    
                              <td class="product-quantity" data-title="Quantity">
                                <div class="quantity">
                                  
                                  <p class="number mb-2">3</p>

                                </div>
                              </td>

                              <td class="product-subtotal" data-title="Subtotal">
                                <span class="woocommerce-Price-amount amount mb-2"
                                  ><bdi
                                    >750.00<span class="woocommerce-Price-currencySymbol"
                                      >$</span
                                    ></bdi
                                  ></span
                                >
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <div class="order-btn-section">
                          <button class='btn btn-success btn-accept' data-status="" data-id="{{this._id}}">
                            ACCEPT
                          </button>
                          <button class='btn btn-danger btn-delete' data-status="" data-id="{{this._id}}">
                            REJECT
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button type="button" class="btn btn-submit" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i class="fa-thin fa-ellipsis-stroke"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/account/SideBar";
export default {
  name: "Order",
  components: {
    Sidebar,
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/admin/order.scss";
</style>
