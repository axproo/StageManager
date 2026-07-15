import { createRouter, createWebHistory } from "vue-router";

import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import NotFound from "@/views/NotFound.vue";

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
