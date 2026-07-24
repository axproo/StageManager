const components = {
  DashboardView: () => import("@pages/Dashboard.vue"),
  LoginView: () => import("@pages/Login.vue"),
  SignUpView: () => import("@pages/SignUp.vue"),
  ErrorView: () => import("@pages/Error.vue"),
  ForgotPasswordView: () => import("@pages/ForgotPassword.vue"),
  ResetPasswordView: () => import("@pages/ResetPassword.vue"),
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
      public: true,
    },
  },
  {
    path: "/signUp",
    name: "signup",
    component: components.SignUpView,
    meta: {
      title: "signUP",
      public: true,
    },
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: components.ForgotPasswordView,
    meta: {
      title: "forgotPassword",
      public: true,
    },
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: components.ResetPasswordView,
    meta: {
      title: "reset-password",
      public: true,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: components.DashboardView,
    meta: {
      title: "Dashboard",
      requiresAuth: true,
      public: false,
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
