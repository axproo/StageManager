const components = {
  DashboardView: () => import("@pages/DashboardView.vue"),
  LoginView: () => import("@pages/LoginView.vue"),
  SignUpView: () => import("@pages/SignUpView.vue"),
  ErrorView: () => import("@pages/ErrorView.vue"),
  ForgotPasswordView: () => import("@pages/ForgotPasswordView.vue"),
  ResetPasswordView: () => import("@pages/ResetPasswordView.vue"),
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
    path: "/signUp",
    name: "signup",
    component: components.SignUpView,
    meta: {
      title: "signUP",
    },
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: components.ForgotPasswordView,
    meta: {
      title: "forgotPassword",
    },
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: components.ResetPasswordView,
    meta: {
      title: "reset-password",
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
