import { createApp } from "vue";
import { createPinia } from "pinia";
import "./styles/global.css";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import vue3GoogleLogin from "vue3-google-login";
import "flag-icons/css/flag-icons.min.css";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const pinia = createPinia();
const app = createApp(App);
app.use(Vue3Toastify, {
  autoClose: 3000,
});
app.use(vue3GoogleLogin, {
  clientId:
    "47052680639-7gpj29gkkvbr94oaueiqfkala6c28h1c.apps.googleusercontent.com",
});
app.use(pinia);
app.use(i18n);

app.use(router).mount("#app");
