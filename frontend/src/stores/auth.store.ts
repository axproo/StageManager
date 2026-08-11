import { defineStore } from "pinia";
import type {
  User,
  UserRole,
  LoginPayload
} from "@stagemanager/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user") || "null") as User | null,

    token: localStorage.getItem("token"),

    loading: false,

    error: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,

    role: (state) => state.user?.role ?? null,
  },

  actions: {
    async login(payload: LoginPayload): Promise<UserRole | null> {
      this.loading = true;
      this.error = null;

      try {
        /*
         * MOCK ADMIN
         */

        if (
          payload.email === "admin@test.com" &&
          payload.password === "password"
        ) {
          this.user = {
            id: 1,

            name: "Administrateur",

            email: payload.email,

            role: "ADMIN",
          };

          this.token = "mock-admin-token";

          localStorage.setItem("token", this.token);

          localStorage.setItem("role", "ADMIN");

          localStorage.setItem("user", JSON.stringify(this.user));

          this.token = "mock-admin-token";

          localStorage.setItem("token", this.token);

          localStorage.setItem("role", "ADMIN");

          return "ADMIN";
        }

        /*
         * MOCK STAGIAIRE
         */

        if (
          payload.email === "stagiaire@test.com" &&
          payload.password === "password"
        ) {
          this.user = {
            id: 2,

            name: "Stagiaire",

            email: payload.email,

            role: "STAGIAIRE",
          };
          localStorage.setItem("user", JSON.stringify(this.user));
          this.token = "mock-stagiaire-token";

          localStorage.setItem("token", this.token);

          localStorage.setItem("role", "STAGIAIRE");

          return "STAGIAIRE";
        }

        throw new Error("Email ou mot de passe incorrect.");
      } catch (error: any) {
        this.error = error.message;

        return null;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;

      this.token = null;

      localStorage.removeItem("token");

      localStorage.removeItem("role");

      localStorage.removeItem("user");
    },
  },
});
