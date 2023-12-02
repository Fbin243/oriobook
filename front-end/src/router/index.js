import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Shop from "@/views/Shop.vue";
import ProductDetails from "@/views/ProductDetails.vue";
import Account from "@/views/Account.vue";
import FAQ from "@/views/FAQ.vue";
import RefundPolicy from "@/views/RefundPolicy.vue";
import Payment from "@/views/Payment.vue";
import Error from "@/views/Error";
import Login from "@/views/Login";
import AccountDetails from "@/views/AccountDetails";
import AuthorList from "@/views/AuthorList";
import Author from "@/views/AuthorDetails";
import Contact from "../views/Contact.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    path: "/account-details",
    name: "AccountDetails",
    component: AccountDetails,
  },

  {
    path: "/authors",
    name: "Authors",
    component: AuthorList,
  },

  {
    path: "/author",
    name: "Author",
    component: Author,
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
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/error",
    name: "Error",
    component: Error,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/error",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
