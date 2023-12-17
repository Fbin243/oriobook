import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Shop from "@/views/Shop.vue";
import ProductDetails from "@/views/ProductDetails.vue";
import AccountOrder from "@/views/AccountOrder.vue";
import FAQ from "@/views/FAQ.vue";
import RefundPolicy from "@/views/RefundPolicy.vue";
import Error from "@/views/Error";
import Login from "@/views/Login";
import AccountDetails from "@/views/AccountDetails";
import AuthorList from "@/views/AuthorList";
import Author from "@/views/AuthorDetails";
import Contact from "../views/Contact.vue";
import Aboutus from "@/views/Aboutus.vue";
import Checkout from "@/views/Checkout.vue";
import Dashboard from "@/views/admin/Dashboard";
import Manage from "@/views/admin/Manage";
import Edit from "@/views/admin/Edit";
import Order from "@/views/admin/Order";

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
  },
  {
    path: "/account-details",
    name: "AccountDetails",
    component: AccountDetails,
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
        component: Author,
      },
    ],
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },

  // ADMIN ROUTES
  {
    path: "/admin",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "manage",
        name: "Manage",
        component: Manage,
      },
      {
        path: "edit",
        children: [
          {
            path: "",
            name: "EditForCreate",
            component: Edit,
          },
          {
            path: ":id",
            name: "EditForUpdate",
            component: Edit,
          },
        ],
      },
      {
        path: "order",
        name: "Order",
        component: Order,
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

export default router;
