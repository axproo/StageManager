import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import { globalGuards } from "./guards";

declare module "vue-router" {
  interface RouteMeta {
    public?: boolean;

    requiresAuth?: boolean;

    role?: "ADMIN" | "STAGIAIRE";

    title?: string;
  }
}

const routes: RouteRecordRaw[] = [
  /*
  ==========================
        PUBLIC
  ==========================
  */

{
  path: "/",
  component: () => import("@/layouts/PublicLayout.vue"),
  children: [
    { path: "", name: "home", component: () => import("@/pages/public/HomePage.vue") },
    { path: "demande-stage", name: "internship-request", component: () => import("@/pages/public/InternshipRequest.vue") },
  ],
},

  {
    path: "/demande-stage",

    name: "internship-request",

    component: () => import("../pages/public/InternshipRequest.vue"),

    meta: {
      public: true,
      title: "Demande stage",
    },
  },

  /*
  ==========================
          AUTH
  ==========================
  */

  {
    path: "/login",

    name: "login",

    component: () => import("../pages/auth/LoginPage.vue"),

    meta: {
      public: true,
    },
  },

  {
    path: "/logout",

    name: "logout",

    component: () => import("../pages/auth/LogoutPage.vue"),

    meta: {
      public: true,
    },
  },

  /*
  ==========================
          ADMIN
  ==========================
  */

  {
    path: "/admin",

    component: () => import("../layouts/AdminLayout.vue"),

    meta: {
      requiresAuth: true,
      role: "ADMIN",
    },

    children: [
      {
        path: "dashboard",

        name: "admin-dashboard",

        component: () => import("../pages/admin/AdminDashboard.vue"),
      },

      {
        path: "requests",

        name: "admin-requests",

        component: () => import("../pages/admin/InternshipRequests.vue"),
        meta: {
          title: "Demandes",
        },
      },

      {
        path: "accepted",

        name: "admin-accepted",

        component: () => import("../pages/admin/AcceptedRequests.vue"),
      },

      {
        path: "rejected",

        name: "admin-rejected",

        component: () => import("../pages/admin/RejectedRequests.vue"),
      },
    ],
  },

  /*
  ==========================
        STAGIAIRE
  ==========================
  */

  {
    path: "/stagiaire",

    component: () => import("../layouts/StagiaireLayout.vue"),

    meta: {
      requiresAuth: true,

      role: "STAGIAIRE",
    },

    children: [
      {
        path: "dashboard",

        name: "stagiaire-dashboard",

        component: () => import("../pages/stagiaire/StagiaireDashboard.vue"),

        meta: {
          title: "Dashboard Stagiaire",
        },
      },
    ],
  },

  /*
  ==========================
          404
  ==========================
  */

  {
    path: "/:pathMatch(.*)*",

    component: () => import("../pages/errors/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),

  routes,
});

router.beforeEach(globalGuards);

export default router;
