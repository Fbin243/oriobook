import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Products from "../views/Products.vue";
import Shop from "../views/Shop.vue";
import ProductDetails from "../views/ProductDetails.vue";
import Account from "../views/Account.vue";
import FAQ from "../views/FAQ.vue";
import RefundPolicy from "../views/RefundPolicy.vue";
import Payment from "../views/Payment.vue";

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

  {
    path: "/faq",
    name: "FAQ",
    component: FAQ,
  },
  {
    path: "/faq",
    name: "FAQ",
    component: FAQ,
  },
  {
    path: "/refund-policy",
    name: "RefundPolicy",
    component: RefundPolicy,
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
