<template>
  <section class="cart row">
    <div class="cart-slider d-flex flex-column">
      <h3
        class="cart-heading text-uppercase text-center d-flex justify-content-center"
      >
        Cart
      </h3>
      <i class="fa-regular fa-xmark cart-close-btn"></i>
      <ul class="product-list">
        <li class="product-item row">
          <router-link to="/" class="col-3">
            <img
              src="@/assets/img/products/product-108.jpg"
              alt=""
              class="product-img"
            />
          </router-link>
          <div class="col-9">
            <router-link to="/" class="product-title"
              >Andromeda - 2022</router-link
            >
            <p class="product-price">175.00$</p>
            <div class="product-quantity row gx-0">
              <button class="col"><i class="fa-light fa-minus"></i></button>
              <input type="text" class="col text-center" value="5" />
              <button class="col"><i class="fa-light fa-plus"></i></button>
            </div>
            <i class="fa-regular fa-trash-can product-remove-btn"></i>
          </div>
        </li>
        <li class="product-item row">
          <router-link to="/" class="col-3">
            <img
              src="@/assets/img/products/product-108.jpg"
              alt=""
              class="product-img"
            />
          </router-link>
          <div class="col-9">
            <router-link to="/" class="product-title"
              >Andromeda - 2022</router-link
            >
            <p class="product-price">175.00$</p>
            <div class="product-quantity row gx-0">
              <button class="col"><i class="fa-light fa-minus"></i></button>
              <input type="text" class="col text-center" value="5" />
              <button class="col"><i class="fa-light fa-plus"></i></button>
            </div>
            <i class="fa-regular fa-trash-can product-remove-btn"></i>
          </div>
        </li>
        <li class="product-item row">
          <router-link to="/" class="col-3">
            <img
              src="@/assets/img/products/product-108.jpg"
              alt=""
              class="product-img"
            />
          </router-link>
          <div class="col-9">
            <router-link to="/" class="product-title"
              >Andromeda - 2022</router-link
            >
            <p class="product-price">175.00$</p>
            <div class="product-quantity row gx-0">
              <button class="col"><i class="fa-light fa-minus"></i></button>
              <input type="text" class="col text-center" value="5" />
              <button class="col"><i class="fa-light fa-plus"></i></button>
            </div>
            <i class="fa-regular fa-trash-can product-remove-btn"></i>
          </div>
        </li>
        <li class="product-item row">
          <router-link to="/" class="col-3">
            <img
              src="@/assets/img/products/product-108.jpg"
              alt=""
              class="product-img"
            />
          </router-link>
          <div class="col-9">
            <router-link to="/" class="product-title"
              >Andromeda - 2022</router-link
            >
            <p class="product-price">175.00$</p>
            <div class="product-quantity row gx-0">
              <button class="col"><i class="fa-light fa-minus"></i></button>
              <input type="text" class="col text-center" value="5" />
              <button class="col"><i class="fa-light fa-plus"></i></button>
            </div>
            <i class="fa-regular fa-trash-can product-remove-btn"></i>
          </div>
        </li>
      </ul>
      <p class="product-total d-flex justify-content-between">
        <span>Subtotal: </span><span>575.00$</span>
      </p>
      <router-link to="/checkout" class="cart-checkout-btn text-uppercase">
        <span>Check out</span>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "Cart",
  methods: {
    handleCart() {
      $(".cart-btn").click(function (e) {
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
      });
      $(".cart-close-btn").click(() => {
        $(".cart").removeClass("enable");
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
