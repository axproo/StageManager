const components = {
  DashboardView: () => import("@pages/DashboardView.vue"),
  LoginView: () => import("@pages/LoginView.vue"),
  ErrorView: () => import("@pages/ErrorView.vue"),
};
export const mockRoutes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: components.LoginView,
    meta: {
      title: "Login",
      guestOnly: true,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: components.DashboardView,
    meta: {
      title: "Dashboard",
      requiresAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: components.ErrorView,
    meta: {
      title: "404 - Not Found",
    },
  },
];
