import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mitt from "mitt";
import VueCookies from "vue-cookies";

const app = createApp(App);
const eventBus = mitt();
app.use(VueCookies);
app.provide("eventBus", eventBus);
app.use(router).mount("#app");
