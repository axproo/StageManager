import { createRouter, createWebHistory } from "vue-router";

import Login from "@/pages/Login.vue";
import Dashboard from "@/pages/Dashboard.vue";
import NotFound from "@/pages/NotFound.vue";
import Students from "@/pages/Students.vue";
import Companies from "@/pages/Companies.vue";
import Internships from "@/pages/Internships.vue";
import Settings from "@/pages/Settings.vue";

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
    path: "/students",
    component: Students,
  },

  {
    path: "/companies",
    component: Companies,
  },

  {
    path: "/internships",
    component: Internships,
  },

  {
    path: "/settings",
    component: Settings,
  },

  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
] ,
});

export default router;
