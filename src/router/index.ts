import { createRouter, createWebHistory } from "vue-router";

import Login from "@/pages/Login.vue";
import Dashboard from "@/pages/Dashboard.vue";
import NotFound from "@/pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      redirect: "/login",
    },

    {
      path: "/login",
      component: Login,
    },

    {
      path: "/dashboard",
      component: Dashboard,
    },

    {
      path: "/:pathMatch(.*)*",
      component: NotFound,
    },
  ],
});

export default router;
