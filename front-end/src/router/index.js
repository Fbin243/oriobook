import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Shop from "@/views/Shop.vue";
import ProductDetails from "@/views/ProductDetails.vue";
import AccountOrder from "@/views/AccountOrder.vue";
import MyWallet from "@/views/MyWallet.vue";
import FAQ from "@/views/FAQ.vue";
import RefundPolicy from "@/views/RefundPolicy.vue";
import Error from "@/views/Error";
import Login from "@/views/Login";
import AuthorList from "@/views/AuthorList";
import AuthorDetails from "@/views/AuthorDetails";
import Contact from "../views/Contact.vue";
import Aboutus from "@/views/Aboutus.vue";
import Checkout from "@/views/Checkout.vue";
import Dashboard from "@/views/admin/Dashboard";
import Manage from "@/views/admin/Manage";
import Edit from "@/views/admin/Edit";
import Order from "@/views/admin/Order";
import AccountDetails from "@/views/AccountDetails";
import { isAdmin, getTokenInfo } from "../helpers/helperFunctions";

const routes = [
  {
    path: "/",
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "aboutus",
        name: "Aboutus",
        component: Aboutus,
      },
      {
        path: "faq",
        name: "FAQ",
        component: FAQ,
      },
      {
        path: "contact",
        name: "Contact",
        component: Contact,
      },
      {
        path: "refund-policy",
        name: "RefundPolicy",
        component: RefundPolicy,
      },
      {
        path: "login",
        name: "Login",
        component: Login,
      },
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
      {
        path: "/account-details",
        name: "AccountDetails",
        component: AccountDetails,
        meta: { requiresUser: true },
      },
    ],
  },
  {
    path: "/products",
    children: [
      {
        path: "",
        name: "Shop",
        component: Shop,
      },
      {
        path: ":id",
        name: "ProductDetails",
        component: ProductDetails,
      },
    ],
  },
  {
    path: "/account-order",
    name: "AccountOrder",
    component: AccountOrder,
    meta: { requiresUser: true },
  },
  {
    path: "/account-wallet",
    name: "MyWallet",
    component: MyWallet,
    meta: { requiresUser: true },
  },
  {
    path: "/authors",
    children: [
      {
        path: "",
        name: "Authors",
        component: AuthorList,
      },
      {
        path: ":id",
        name: "AuthorDetails",
        component: AuthorDetails,
      },
    ],
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    meta: { requiresUser: true },
  },

  // ADMIN ROUTES
  {
    path: "/admin",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAdmin: true },
      },
      {
        path: "manage",
        name: "Manage",
        component: Manage,
        meta: { requiresAdmin: true },
      },
      {
        path: "edit",
        children: [
          {
            path: "",
            name: "EditForCreate",
            component: Edit,
            meta: { requiresAdmin: true },
          },
          {
            path: ":id",
            name: "EditForUpdate",
            component: Edit,
            meta: { requiresAdmin: true },
          },
        ],
      },
      {
        path: "order",
        name: "Order",
        component: Order,
        meta: { requiresAdmin: true },
      },
    ],
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

router.beforeEach(async (to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAdmin)
  let admin = await isAdmin();
  let user = await getTokenInfo();

  if (to.meta.requiresAdmin && !admin) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: "/error",
      // save the location we were at to come back later
      // query: { redirect: to.fullPath },
    };
  }

  if (to.meta.requiresUser && !user) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: "/error",
      // save the location we were at to come back later
      // query: { redirect: to.fullPath },
    };
  }
});

export default router;
