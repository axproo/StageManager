import type { NavigationGuard } from "vue-router";

export const globalGuards: NavigationGuard = async (to) => {
  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  /*
    ======================
        PUBLIC ROUTES
    ======================
    */

  if (to.meta.public) {
    /*
        Si déjà connecté,
        éviter de retourner au login
        */

    if (token && to.name === "login") {
      if (role === "ADMIN") {
        return "/admin/dashboard";
      }

      if (role === "STAGIAIRE") {
        return "/stagiaire/dashboard";
      }
    }

    return true;
  }

  /*
    ======================
        AUTH REQUIRED
    ======================
    */

  if (to.meta.requiresAuth && !token) {
    return "/login";
  }

  /*
    ======================
        ROLE CHECK
    ======================
    */

  if (to.meta.role && to.meta.role !== role) {
    if (role === "ADMIN") {
      return "/admin/dashboard";
    }

    if (role === "STAGIAIRE") {
      return "/stagiaire/dashboard";
    }

    return "/login";
  }

  return true;
};
