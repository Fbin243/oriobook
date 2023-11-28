<template>
  <div class="col-9">
    <table
      class="order-table table-bordered"
    >
      <thead>
        <tr>
          <th class="product-thumbnail-col" width="60%">Product</th>
          <th class="product-quantity-col" width="20%">Quantity</th>
          <th class="product-subtotal-col" width="10%">Subtotal</th>
          <th class="product-remove-col"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="woocommerce-cart-form__cart-item cart_item">
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
              <button type="button" class="minus">
                <i class="fa-solid fa-minus"></i>
              </button>
              <p class="number">1</p>
              <button type="button" class="plus">
                <i class="fa-solid fa-plus"></i>
              </button>
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
          <td class="product-remove">
            <div class="bin-block mb-3">
              <a
                href="https://wpbingosite.com/wordpress/oriobook/cart/?remove_item=a89cf525e1d9f04d16ce31165e139a4b&amp;_wpnonce=588a55899f"
                class="remove"
                ><i class="fa-regular fa-trash-can"></i></a
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "OrderSection",
  components: {},
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/order/order_section.scss";
</style>
