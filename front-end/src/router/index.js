import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Products from "../views/Products.vue";
import Shop from "../views/Shop.vue"
import ProductDetails from "../views/ProductDetails.vue"
import Account from "../views/Account.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },

  {
    path: "/shop",
    name: "Shop",
    component: Shop,
  },

  {
    path: "/product-details",
    name: "ProductDetails",
    component: ProductDetails,
  },

  {
    path: "/account",
    name: "Account",
    component: Account,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
