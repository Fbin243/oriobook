<template>
  <section class="cart row">
    <div class="cart-slider d-flex flex-column">
      <h3
        class="cart-heading text-uppercase text-center d-flex justify-content-center"
      >
        Cart
      </h3>
      <button class="fa-regular fa-xmark cart-close-btn"></button>
      <template v-if="cart.length !== 0">
        <ul class="product-list scroll-bar-custom-2">
          <li class="product-item row" v-for="element in cart" :key="element">
            <router-link to="/" class="col-3">
              <img :src="element.image" alt="" class="product-img" />
            </router-link>
            <div class="col-9">
              <router-link to="/" class="product-title">{{
                element.name
              }}</router-link>
              <p class="product-price">{{ element.price }}$</p>
              <div class="product-quantity row gx-0">
                <button class="col" @click="minus(element._id)">
                  <i class="fa-light fa-minus"></i>
                </button>
                <input
                  type="text"
                  class="col text-center"
                  id="quantity"
                  disabled
                  :value="element.quantities"
                />
                <button
                  class="col"
                  @click="plus(element._id, element.stock)"
                  :disabled="isDisabled(element.quantities, element.stock)"
                >
                  <i class="fa-light fa-plus"></i>
                </button>
              </div>
              <button
                class="fa-regular fa-trash-can product-remove-btn"
                @click="RemoveProduct(element._id)"
              ></button>
            </div>
          </li>
        </ul>
        <p class="product-total d-flex justify-content-between">
          <span>Subtotal: </span><span>{{ price }}$</span>
        </p>
        <router-link to="/checkout" class="cart-checkout-btn text-uppercase">
          <span>Check out</span>
        </router-link>
      </template>

      <template v-if="cart.length === 0">
        <div class="empty">
          <span>No products in the cart.</span>
          <a
            class="go-shop underline-animation"
            href="https://localhost:8080/products"
          >
            Shop all products
          </a>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import axios from "../config/axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref, computed } from "vue";

export default {
  name: "Cart",

  inject: ["eventBus"],

  setup() {
    const cart = ref([]);
    let price = ref(0);

    async function Price() {
      let sum = 0;
      try {
        console.log("cart");
        const response = await axios.get(
          "https://localhost:3000/account/getCart"
        );
        cart.value = response.data;
        cart.value.forEach((item) => {
          sum += item.quantities * 1 * item.price * 1;
        });
      } catch (error) {
        console.error("Lỗi khi gọi API", error);
      }
      return sum.toFixed(2);
    }
    const isDisabled = computed(() => {
      return (quantities, stock) => {
        return quantities === stock;
      };
    });

    async function update() {
      try {
        console.log("cart");
        const response = await axios.get(
          `https://localhost:3000/account/getCart`
        );
        cart.value = response.data;
        console.log(response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API", error);
      }
      price.value = await Price();
    }

    const minus = async (id) => {
      // console.log(id);

      const response = await axios.post(
        `https://localhost:3000/account/minusToCart/${id}`
      );

      if (response.data.status == true) {
        await update();
      }
    };

    async function plus(id, stock) {
      if (stock > 0) {
        console.log(id);
        const quantity = 1;
        const response = await axios.post(
          `https://localhost:3000/account/addToCart/${id}/${quantity}`
        );

        if (response.data.status == true) {
          await update();
        }
      } else {
        toast.error("Sold out!", {
          autoClose: 1000,
        });
      }
    }

    const RemoveProduct = async (id) => {
      // console.log(id);

      const response = await axios.delete(
        `https://localhost:3000/account/removeFromCart/${id}`
      );

      if (response.data.status == true) {
        toast.success("Removed Product!", {
          autoClose: 1000,
        });

        await update();
      }
    };

    $(".cart-btn").click(async function (e) {
      e.preventDefault();

      $(".cart").addClass("enable");
      $(".cart-slider").click(function (e) {
        e.stopPropagation();
      });
      // Chưa fix cứng được app
      $("#app").scroll(function (e) {
        e.preventDefault();
      });
      $(".cart").click(function () {
        $(".cart").removeClass("enable");
      });

      price.value = await Price();
    });

    return {
      RemoveProduct,
      minus,
      plus,
      cart,
      price,
      isDisabled,
    };
  },

  methods: {
    handleCart() {
      // $(".cart-btn").click(async function (e) {
      //   e.preventDefault();
      //   $(".cart").addClass("enable");
      //   $(".cart-slider").click(function (e) {
      //     e.stopPropagation();
      //   });
      //   // Chưa fix cứng được app
      //   $("#app").scroll(function (e) {
      //     e.preventDefault();
      //   });
      //   $(".cart").click(function () {
      //     $(".cart").removeClass("enable");
      //   });

      //   const cart = ref([]);

      //   try {
      //     console.log("cart");
      //     const response = await axios.get(
      //       `https://localhost:3000/account/getCart`
      //     );
      //     cart.value = response.data;
      //     console.log(response.data);
      //   } catch (error) {
      //     console.error("Lỗi khi gọi API", error);
      //   }

      //   return {
      //     cart,
      //   };
      // });
      $(".cart").click(async () => {
        console.log("close");
        $(".cart").removeClass("enable");
        try {
          const response = await axios.get(
            `https://localhost:3000/account/getCart`
          );
          let newquantity = ref(0);
          for (let i = 0; i < response.data.length; i++) {
            newquantity.value += response.data[i].quantities;
          }
          this.eventBus.emit("reload", newquantity.value);
        } catch (error) {
          console.error("Lỗi khi gọi API", error);
          window.location.href = "https://localhost:8080/login";
        }
      });
      $(".cart-close-btn").click(async () => {
        console.log("close");
        $(".cart").removeClass("enable");
        try {
          const response = await axios.get(
            `https://localhost:3000/account/getCart`
          );
          let newquantity = ref(0);
          for (let i = 0; i < response.data.length; i++) {
            newquantity.value += response.data[i].quantities;
          }
          this.eventBus.emit("reload", newquantity.value);
        } catch (error) {
          console.error("Lỗi khi gọi API", error);
          window.location.href = "https://localhost:8080/login";
        }
      });
    },
  },

  mounted() {
    this.handleCart();
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/cart.scss";
</style>
