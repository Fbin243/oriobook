<template>
  <div class="col-9 order-section">
    <div class="type-filter">
      <h4 class="pending text-primary underline-animation" :class="{'active': toggle_1}" @click="pendingClick">Pending</h4>
      <h4 class="accept text-success underline-animation" :class="{'active': toggle_2}" @click="acceptClick">Accept</h4>
      <h4 class="reject text-danger underline-animation" :class="{'active': toggle_3}" @click="rejectClick">Reject</h4>
    </div>
    <div class="each-order" v-for="(order, index) in orderData" :key="index">
      <div class="title-order-section">
        <p class="order-code">Order code: {{ order._id }}</p>
        <p class="total">Total price: ${{ order.total_price }}</p>
      </div>
      <table
        class="order-table table-bordered"
      >
        <thead>
          <tr>
            <th class="product-thumbnail-col" width="60%">Product</th>
            <th class="product-quantity-col" width="20%">Quantity</th>
            <th class="product-subtotal-col" width="10%">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr class="cart_item"
          v-for="(item, i_item) in order.detail"
          :key="i_item"
          >
            <td class="product-thumbnail">
              <div class="product-cart-info">
                <a
                  href="https://wpbingosite.com/wordpress/oriobook/shop/zmats-kempe/"
                  ><img
                    :src="item.id_product.image"
                    class="product-img"
                    alt=""
                /></a>
                <div class="product-name">
                  <a
                    href="https://wpbingosite.com/wordpress/oriobook/shop/zmats-kempe/"
                    >{{item.id_product.name}}</a
                  >
                  <p class="price">
                    <span class="woocommerce-Price-amount amount">
                      {{item.id_product.price}}<span class="currency">$</span
                      ></span
                    >
                  </p>
                </div>

                <div class="evaluate-btn" :class="{'no-show': !toggle_2}">
                  <!-- Modal -->
                  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                      <section class="section">
                        <div class="star-rating-bx">
                            <h2 class="text-center">Feedback</h2>
                            <div class="star-widget">
                              <form method="GET" name="feedback" action="#" @submit="feedBack">
                                <input type="radio" name="star" id="rate-5" value="5">
                                <label for="rate-5" class="fa-solid fa-star" style="margin-right: 62px;"></label>
                                <input type="radio" name="star" id="rate-4" value="4">
                                <label for="rate-4" class="fa-solid fa-star"></label>
                                <input type="radio" name="star" id="rate-3" value="3">
                                <label for="rate-3" class="fa-solid fa-star"></label>
                                <input type="radio" name="star" id="rate-2" value="2">
                                <label for="rate-2" class="fa-solid fa-star"></label>
                                <input type="radio" name="star" id="rate-1" value="1">
                                <label for="rate-1" class="fa-solid fa-star"></label>
                                <!-- <p class="rating-desc"></p> -->
                              </form>
                              <div class="textarea">
                                <p id="error-rating"></p>
                                  <textarea cols="30" id="comment" placeholder="Describe your comment"></textarea>
                                  <p id="error-comment"></p>
                              </div>
                              <div class="btn">
                                <button type="submit" class="btn">Submit</button>
                              </div>
                            </div>
                        </div>
                    </section>
                      </div>
                    </div>
                  </div>

                  <button type="button" class="btn btn-primary btn-submit" data-bs-toggle="modal" data-bs-target="#exampleModal">Evaluate</button>
                </div>
              </div>
            </td>
  
            <td class="product-quantity" data-title="Quantity">
              <div class="quantity">
                
                <p class="number">{{item.quantity}}</p>

              </div>
            </td>
            <td class="product-subtotal" data-title="Subtotal">
              <span class="woocommerce-Price-amount amount"
                ><bdi
                  >${{ item.id_product.price * item.quantity }}</bdi
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
import { ref, onMounted } from "vue";
import axios from 'axios';

export default {
  name: "OrderAccount",
  components: {
    
  },
  props: [],
  setup(props, {emit}) {
    const number = ref(2)
    const toggle_1 = ref(true)
    const toggle_2 = ref(false)
    const toggle_3 = ref(false)
    const orderData = ref([])

    const feedBack = () => {

      if (document.getElementById('comment').value === '') {
          document.getElementById('error-comment').innerHTML = "* Please enter comment";
      } else {
          document.getElementById('error-comment').innerHTML = "";
      }

      if ($("input[type=radio]:checked").val() === 'undefined') {
          document.getElementById('error-rating').innerHTML = "* Please choose any star";
          alert('Please choose any star');
      } else {
          document.getElementById('error-rating').innerHTML = "";
      }

      var rating_Count = document.querySelector("input[name=star]:checked").value;
      var comment = document.getElementById('comment').value; 
      $("#simpleModal").modal('show');

      // alert(x);
      // console.log(comment);
      // console.log(rating_Count);
      document.getElementById('comment_text').innerHTML = comment;
      document.getElementById('star_count').innerHTML = rating_Count;
    }

    const fetchData = async (link) => {
      try {
        const response = await axios.get(`http://localhost:3000/${link}`);
        orderData.value = response.data;
        console.log(orderData.value);
      } catch (error) {
        console.error("Error calling API:", error);
      }
    };

    onMounted(() => {
      fetchData('order/pending');
    });

    const pendingClick = () => {
      number.value = 2
      toggle_1.value = true
      toggle_2.value = false
      toggle_3.value = false
      console.log('da vo');
      fetchData('order/pending')
    }

    const acceptClick = () => {
      number.value = 3
      toggle_1.value = false
      toggle_2.value = true
      toggle_3.value = false
    }

    const rejectClick = () => {
      number.value = 1
      toggle_1.value = false
      toggle_2.value = false
      toggle_3.value = true
    }

    return {
      feedBack,
      number,
      pendingClick,
      acceptClick,
      rejectClick,
      toggle_1,
      toggle_2,
      toggle_3,
      orderData,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/order/order_account.scss";
</style>
