<template>
  <div class="col-9 order-section">
    <div class="each-order" v-for="index in 2" :key="index">
      <p class="order-code">Order code:</p>
      <table
        class="order-table table-bordered"
      >
        <thead>
          <tr>
            <th class="product-thumbnail-col" width="60%">Product</th>
            <th class="product-quantity-col" width="20%">Quantity</th>
            <th class="product-subtotal-col" width="10%">Total</th>
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
                    class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                    alt=""
                /></a>
                <div class="product-name">
                  <a
                    href="https://wpbingosite.com/wordpress/oriobook/shop/zmats-kempe/"
                    >Zmats Kempe</a
                  >
                  <p class="price">
                    <span class="woocommerce-Price-amount amount">
                      250.00<span class="currency">$</span
                      ></span
                    >
                  </p>
                </div>
              </div>
            </td>
  
            <td class="product-quantity" data-title="Quantity">
              <div class="quantity">
                
                <p class="number">1</p>

              </div>
            </td>
            <td class="product-subtotal" data-title="Subtotal">
              <span class="woocommerce-Price-amount amount"
                ><bdi
                  >250.00<span class="woocommerce-Price-currencySymbol"
                    >$</span
                  ></bdi
                ></span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "OrderSection",
  components: {
    
  },
  props: [],
  setup(props, {emit}) {

    return {
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/order/order_account.scss";
</style>
